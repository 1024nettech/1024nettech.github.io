import { set, get, del, keys } from "./idb-keyval.js";
const url = location.href;
export function sendRequest(url, cookie, method, doSuccess, formData = null) {
    // 发送请求, formData为{k:v}键值对
    let options = {
        method: method,
        url: url,
        headers: {
            "Cookie": cookie
        },
        onload: function (response) {
            if (response.status === 200) {
                doSuccess(response);
            } else {
                console.error("请求失败, 状态码: " + response.status);
            }
        },
        onerror: function (error) {
            console.error("请求发生错误: ", error);
        }
    };
    if (method.toUpperCase() === "POST" && formData) {
        options.headers["Content-Type"] = "application/x-www-form-urlencoded";
        let urlEncodedData = new URLSearchParams(formData).toString();
        options.data = urlEncodedData;
    }
    window.GM_xmlhttpRequest(options);
}
export async function loadFiles(urls) {
    // 动态加载外部文件(JS/CSS)
    let totalFiles = urls.length;
    let loadedFiles = 0;
    async function loadNextFile(index) {
        if (index < totalFiles) {
            let url = urls[index];
            let fileExtension = url.split(".").pop().split("?")[0].toLowerCase();
            if (url.includes("?time=1")) {
                let a = "?time=" + Date.now();
                url = url.replace("?time=1", a);
            }
            let isModule = url.includes("&module=1");
            if (fileExtension === "js") {
                let script = document.createElement("script");
                script.src = url;
                script.type = isModule ? "module" : "text/javascript";
                script.onload = async function () {
                    console.log(`脚本加载完成: ${url}`);
                    loadedFiles++;
                    if (loadedFiles === totalFiles) {
                        onFilesLoaded();
                    }
                    await loadNextFile(index + 1);
                };
                script.onerror = async function (error) {
                    console.error(`脚本加载失败: ${url}, 错误信息: `, error);
                    await loadNextFile(index + 1);
                };
                console.log(`开始加载脚本: ${url}`);
                document.head.append(script);
            } else if (fileExtension === "css") {
                let link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = url;
                link.onload = async function () {
                    console.log(`CSS 加载完成: ${url}`);
                    loadedFiles++;
                    if (loadedFiles === totalFiles) {
                        onFilesLoaded();
                    }
                    await loadNextFile(index + 1);
                };
                link.onerror = async function (error) {
                    console.error(`CSS 加载失败: ${url}, 错误信息: `, error);
                    await loadNextFile(index + 1);
                };
                console.log(`开始加载 CSS: ${url}`);
                document.head.append(link);
            } else {
                console.error(`无法识别的文件类型: ${url}`);
                await loadNextFile(index + 1);
            }
        }
    }
    function onFilesLoaded() {
        console.log("所有文件加载完成！");
    }
    await loadNextFile(0);
}
export function generateTimestamp(format) {
    // 获取时间戳
    let now = new Date();
    let year = now.getFullYear().toString().padStart(4, "0");
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");
    if (format === 0) {
        return `${year}/${month}/${day}`;
    }
    else if (format === 1) {
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }
}
export function sliceImage(canvas) {
    // html2canvas截图
    // 如果是单图模式, 不需要判断大小并切割
    let screenshotMode = localStorage.getItem("screenshotMode");
    if (screenshotMode === "单图模式") {
        let imgData = canvas.toDataURL("image/png");
        return [imgData];
    }
    // 多图模式: 检查图片是否大于5MB
    let imgData = canvas.toDataURL("image/png");
    let byteCharacters = atob(imgData.split(",")[1]);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset++) {
        byteArrays.push(byteCharacters.charCodeAt(offset));
    }
    let blob = new Blob([new Uint8Array(byteArrays)], { type: "image/png" });
    if (blob.size > 5 * 1024 * 1024) {
        let height = canvas.height;
        let midHeight = Math.floor(height / 2);
        // 如果图片大于5MB, 切割为两部分
        let firstPartCanvas = document.createElement("canvas");
        let secondPartCanvas = document.createElement("canvas");
        firstPartCanvas.width = canvas.width;
        firstPartCanvas.height = midHeight;
        secondPartCanvas.width = canvas.width;
        secondPartCanvas.height = height - midHeight;
        let firstPartCtx = firstPartCanvas.getContext("2d");
        let secondPartCtx = secondPartCanvas.getContext("2d");
        firstPartCtx.drawImage(canvas, 0, 0, canvas.width, midHeight, 0, 0, canvas.width, midHeight);
        secondPartCtx.drawImage(canvas, 0, midHeight, canvas.width, height - midHeight, 0, 0, canvas.width, height - midHeight);
        let firstPartSlices = sliceImage(firstPartCanvas);
        let secondPartSlices = sliceImage(secondPartCanvas);
        return [...firstPartSlices, ...secondPartSlices];
    } else {
        return [imgData];
    }
}
export function takeScreenshots(selector) {
    // html2canvas截图
    $(selector).attr("id", "screenshot-area");
    $("#processing-message").text("处理中……");
    let pageTitle = document.title;
    let time = generateTimestamp(1);
    html2canvas(document.querySelector("#screenshot-area"), {
        useCORS: true,
        logging: true
    }).then(canvas => {
        let imageArray = sliceImage(canvas);
        let downloadedCount = 0;
        let totalImages = imageArray.length;
        imageArray.forEach((imgData, index) => {
            let link = document.createElement("a");
            link.href = imgData;
            link.download = `${time}-${index + 1}-${pageTitle}.png`;
            link.click();
            downloadedCount++;
            if (downloadedCount === totalImages) {
                $("#processing-message").text("已完成！");
            }
        });
    });
}
export function moveElement(selector1, selector2) {
    // 将selector1移动到selector2
    let element = $(selector1).detach();
    $(selector2).append(element);
    $(selector1).css("display", "");
}
export function clearExceptAuth() {
    // 清除localStorage,保留列表里的键值
    let keepKeys = ["auth", "autorun", "date", "screenshotMode", "name", "usernames"];
    for (let key in localStorage) {
        if (!keepKeys.includes(key)) {
            localStorage.removeItem(key);
        }
    }
    console.log("localStorage 已清除完毕: ", localStorage);
}
export function waitForElementOrCookie(selector, callback, interval = 100, maxAttempts = 1000) {
    // 等待元素或cookie存在后执行
    let attempts = 0;
    let intervalId = setInterval(function () {
        attempts++;
        if (selector === "cookie") {
            if (cookie !== "") {
                callback();
                clearInterval(intervalId);
            }
        } else {
            if ($(selector).length > 0) {
                callback();
                clearInterval(intervalId);
            }
        }
        if (attempts >= maxAttempts) {
            clearInterval(intervalId);
            if (selector === "cookie") {
                console.warn(`Cookie not set after ${maxAttempts} attempts.`);
            } else {
                console.warn(`Element ${selector} not found after ${maxAttempts} attempts.`);
            }
        }
    }, interval);
}
export async function clearAll() {
    // 清除所有idb-keyval数据
    let allKeys = await keys();
    for (let key of allKeys) {
        await del(key);
    }
    console.log("所有数据已清除");
}
export async function setAndLog(key, value) {
    // idb-keyval存储数据
    await set(key, value);
    console.log(`${key} 已设置为: `, value);
}
export async function appendToRecord(newValue, maxRetries = 1000, retryInterval = 1000) {
    // 获取记录并根据条件追加数据到idb-keyval的record{}
    let lockKey = "recordLock";
    let retries = 0;
    while (retries < maxRetries) {
        let isLocked = localStorage.getItem(lockKey);
        if (isLocked !== "true") {
            try {
                localStorage.setItem(lockKey, "true");
                let records = await get("record");
                if (!records) {
                    records = {};
                }
                let urlParams = new URLSearchParams(window.location.search);
                let ch_id = urlParams.get("ch_id");
                let _id = urlParams.get("id");
                if (!ch_id || !_id) {
                    console.error("URL 中缺少 ch_id 或 id 参数");
                    return;
                }
                let recordKey = `${ch_id}_${_id}`;
                records[recordKey] = newValue;
                await set("record", records);
                console.log("来自workflow-main.js 的输出: appendToRecord记录已更新: ", records);
                return;
            } finally {
                localStorage.removeItem(lockKey);
            }
        } else {
            console.log(`来自workflow-main.js的输出: 记录已被锁定, 等待重试 (重试 ${retries + 1} / ${maxRetries})……`);
            retries++;
            await new Promise(resolve => setTimeout(resolve, retryInterval));
        }
    }
    console.error("无法获取锁, 已达到最大重试次数, 请稍后再试……");
}
export async function downloadRecordAsTSV(personName, fileName) {
    // idb-keyval获取record 对象,下载为tsv文件
    let records = await get("record");
    if (!records || Object.keys(records).length === 0) {
        alert("没有找到可导出的数据！");
        return;
    }
    let tsvContent = "日期\t姓名\t会员名\t栏目id\t产品id\t栏目名\t产品链接\t原始值\t改后值\t处理状态\n";
    Object.keys(records).forEach(key => {
        let recordValue = records[key];
        let updatedRecord = recordValue.replace(/xxpersonname/g, personName).replace("欢迎您：", "").trim();
        tsvContent += `${updatedRecord}\n`;
    });
    let blob = new Blob([tsvContent], { type: "text/tab-separated-values" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.tsv`;
    link.click();
    console.log("TSV 文件已生成并开始下载");
}
// export async function downloadRecordAsXLSX(personName, fileName) {
//     // 使用 idb-keyval 获取记录对象, 下载为 xlsx 文件
//     let records = await get("record");
//     if (!records || Object.keys(records).length === 0) {
//         alert("没有找到可导出的数据！");
//         return;
//     }
//     let headers = ["日期", "姓名", "会员名", "栏目id", "产品id", "栏目名", "产品链接", "原始值", "改后值", "处理状态"];
//     let data = [];
//     Object.keys(records).forEach(key => {
//         let recordValue = records[key];
//         let updatedRecord = recordValue.replace(/xxpersonname/g, personName).replace("欢迎您：", "").trim();
//         let recordFields = updatedRecord.split("\t");
//         data.push(recordFields);
//     });
//     data.unshift(headers);
//     let ws = XLSX.utils.aoa_to_sheet(data);
//     let colWidths = [70, 40, 120, 50, 50, 90, 550, 170, 170, 60];
//     ws["!cols"] = colWidths.map(width => ({ wpx: width }));
//     let wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "记录数据");
//     XLSX.writeFile(wb, `${fileName}.xlsx`);
//     console.log("XLSX 文件已生成并开始下载");
// }

export async function downloadRecordAsXLSX(personName, fileName) {
    // 直接遍历所有 keys
    const stored_keys = await keys();  // 假设keys()是返回所有存储键的函数

    // 如果没有记录，提示并返回
    if (stored_keys.length === 0) {
        alert("没有找到可导出的数据！");
        return;
    }

    let headers = ["日期", "姓名", "会员名", "栏目id", "产品id", "栏目名", "产品链接", "原始值", "改后值", "处理状态"];
    let data = [];

    // 遍历所有的 keys
    for (let key of stored_keys) {
        let record = await get(key);  // 获取每个 key 对应的记录
        console.log(record);

        // 检查 record 是否存在且包含有效的数据
        if (record && Object.keys(record).length > 0) {
            // 假设 record 是一个对象，检查是否有我们需要的字段
            for (let subKey in record) {
                let recordContent = record[subKey]; // 获取该 subKey 对应的值

                if (recordContent && typeof recordContent === 'string' && recordContent.trim() !== "") {
                    // 假设记录结构为 "username[ch_id][id]"，提取并处理记录
                    let updatedRecord = recordContent
                        .replace(/xxpersonname/g, personName)  // 替换 "xxpersonname" 为 personName
                        .replace("欢迎您：", "")  // 去掉 "欢迎您："
                        .trim();

                    let recordFields = updatedRecord.split("\t");  // 分割字段

                    // 构建一行数据
                    data.push(recordFields);
                }
            }
        }
    }

    // 如果没有数据需要导出，提示并返回
    if (data.length === 0) {
        alert("没有有效的数据可以导出！");
        return;
    }

    // 将表头添加到数据的开头
    data.unshift(headers);

    // 使用 XLSX.js 库生成工作表和工作簿
    let ws = XLSX.utils.aoa_to_sheet(data);
    let colWidths = [70, 40, 120, 50, 50, 90, 550, 170, 170, 60];  // 设置列宽
    ws["!cols"] = colWidths.map(width => ({ wpx: width }));

    // 创建工作簿并添加工作表
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "记录数据");

    // 下载生成的 XLSX 文件
    XLSX.writeFile(wb, `${fileName}.xlsx`);
    console.log("XLSX 文件已生成并开始下载");
}


export function parseJson(jsonString) {
    try {
        return JSON.parse(jsonString.trim());
    } catch (error) {
        console.error("Failed to parse JSON: ", error);
        return null;
    }
}
// End-310-2025.05.23.163035
