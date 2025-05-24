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
export function loadFiles(urls) {
    // 动态加载外部文件(JS/CSS)
    let totalFiles = urls.length;
    let loadedFiles = 0;
    function loadNextFile(index) {
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
                script.onload = function () {
                    console.log(`脚本加载完成: ${url}`);
                    loadedFiles++;
                    if (loadedFiles === totalFiles) {
                        onFilesLoaded();
                    }
                    loadNextFile(index + 1);
                };
                script.onerror = function (error) {
                    console.error(`脚本加载失败: ${url}, 错误信息: `, error);
                    loadNextFile(index + 1);
                };
                console.log(`开始加载脚本: ${url}`);
                document.head.append(script);
            } else if (fileExtension === "css") {
                let link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = url;
                link.onload = function () {
                    console.log(`CSS 加载完成: ${url}`);
                    loadedFiles++;
                    if (loadedFiles === totalFiles) {
                        onFilesLoaded();
                    }
                    loadNextFile(index + 1);
                };
                link.onerror = function (error) {
                    console.error(`CSS 加载失败: ${url}, 错误信息: `, error);
                    loadNextFile(index + 1);
                };
                console.log(`开始加载 CSS: ${url}`);
                document.head.append(link);
            } else {
                console.error(`无法识别的文件类型: ${url}`);
                loadNextFile(index + 1);
            }
        }
    }
    function onFilesLoaded() {
        console.log("所有文件加载完成！");
    }
    loadNextFile(0);
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
    // 清除localStorage, 保留列表里的键值
    let keepKeys = ["auth", "autorun", "date", "screenshotMode", "name", "usernames"];
    for (let key in localStorage) {
        if (!keepKeys.includes(key)) {
            localStorage.removeItem(key);
        }
    }
    console.log("localStorage 已清除完毕: ", localStorage);
}
export async function waitfor(selectors, delayTime, doCallback) {
    // 等待元素存在后延时执行
    return new Promise((resolve, reject) => {
        let observer = new MutationObserver((mutationsList, observer) => {
            let elementsExist = selectors.every(selector => document.querySelector(selector) !== null);
            if (elementsExist) {
                observer.disconnect();
                setTimeout(async () => {
                    try {
                        let elements = selectors.map(selector => document.querySelector(selector));
                        await doCallback(elements);
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                }, delayTime);
            }
        });
        let config = { childList: true, subtree: true };
        observer.observe(document.body, config);
    });
}
export async function clearAll() {
    // 清除所有idb-keyval数据
    let allKeys = await keys();
    for (let key of allKeys) {
        await del(key);
    }
    console.log("所有数据已清除");
}
export async function appendToRecord(username, ch_id, proid, value) {
    // 获取记录并根据条件追加数据到idb-keyval的record对象
    try {
        let records = await get("record");
        if (!records) {
            records = {};  // 初始化为空对象，而不是数组
        }

        // 确保存在 username
        if (!records[username]) {
            records[username] = {};  // 如果没有此用户名，初始化一个对象
        }

        // 确保存在 ch_id
        if (!records[username][ch_id]) {
            records[username][ch_id] = {};  // 如果没有此 ch_id，初始化一个对象
        }

        // 更新 proid 的值
        records[username][ch_id][proid] = value;

        // 保存更新后的 records
        await set("record", records);
        console.log("来自workflow-main.js 的输出: appendToRecord记录已更新: ", records);
    } catch (error) {
        console.error("无法更新记录，发生错误: ", error);
    }
}
export function parseJson(jsonString) {
    try {
        return JSON.parse(jsonString.trim());
    } catch (error) {
        console.error("Failed to parse JSON: ", error);
        return null;
    }
}
// export async function downloadRecordAsFile(personName, fileName, fileType = 'xlsx') {
//     // 使用 idb-keyval 获取记录对象，根据类型下载 xlsx 或 tsv 文件
//     let records = await get("record");
//     if (!records || Object.keys(records).length === 0) {
//         alert("没有找到可导出的数据！");
//         return;
//     }

//     // 定义表头，原始值和改后值作为标题行
//     let headers = ["日期", "姓名", "会员名", "栏目id", "产品id", "栏目名", "产品链接", "原始值", "改后值", "处理状态"];
//     let data = [];

//     // 遍历 record 对象
//     Object.keys(records).forEach(username => {
//         let userRecord = records[username];  // 获取当前用户记录
//         Object.keys(userRecord).forEach(ch_id => {
//             let productRecord = userRecord[ch_id];  // 获取当前 ch_id 的产品记录
//             Object.keys(productRecord).forEach(proid => {
//                 // 获取 proid 对应的值
//                 let proidValue = productRecord[proid];

//                 // 如果 proidValue 为空或没有有效数据，则跳过
//                 if (!proidValue || proidValue.trim() === "") {
//                     return;
//                 }

//                 // 在 proid 中替换 "xxpersonname" 为 personName
//                 let updatedProidValue = proidValue.replace(/xxpersonname/g, personName);

//                 // 分割 proidValue，如果 split 后字段为空，则填充默认值
//                 let recordFields = updatedProidValue.split("\t").map(field => field.trim() || "无数据");

//                 // 输出 proid 对应的值和处理后的字段
//                 console.log("proid 对应的值:", proidValue);
//                 console.log("更新后的 proid 值:", updatedProidValue);
//                 console.log("分割后的字段:", recordFields);

//                 // 如果没有有效的字段，跳过
//                 if (recordFields.length === 0 || recordFields.every(field => field === "无数据")) {
//                     return;
//                 }

//                 // 将拆分后的 proid 字段添加到数据行中
//                 data.push(recordFields);
//             });
//         });
//     });

//     // 根据文件类型选择生成不同的文件
//     if (fileType === 'xlsx') {
//         // 生成XLSX格式
//         let ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
//         let colWidths = [70, 50, 50, 170, 170, 170, 170, 170, 170];  // 设置每列的宽度
//         ws["!cols"] = colWidths.map(width => ({ wpx: width }));
//         let wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "记录数据");
//         XLSX.writeFile(wb, `${fileName}.xlsx`);
//         console.log("XLSX 文件已生成并开始下载");
//     } else if (fileType === 'tsv') {
//         // 生成TSV格式
//         let tsvContent = [headers.join("\t"), ...data.map(row => row.join("\t"))].join("\n");
//         let blob = new Blob([tsvContent], { type: 'text/tab-separated-values' });
//         let link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = `${fileName}.tsv`;
//         link.click();
//         console.log("TSV 文件已生成并开始下载");
//     } else {
//         alert("不支持的文件类型！");
//     }
// }
export async function downloadRecordAsFile(personName, fileName, fileType = 'xlsx') {
    // 使用 idb-keyval 获取记录对象，根据类型下载 xlsx 或 tsv 文件
    let records = await get("record");
    if (!records || Object.keys(records).length === 0) {
        alert("没有找到可导出的数据！");
        return;
    }

    // 定义表头，原始值和改后值作为标题行
    let headers = ["日期", "姓名", "会员名", "栏目id", "产品id", "栏目名", "产品链接", "原始值", "改后值", "处理状态"];
    let data = [];

    // 遍历 record 对象
    Object.keys(records).forEach(username => {
        let userRecord = records[username];  // 获取当前用户记录
        Object.keys(userRecord).forEach(ch_id => {
            let productRecord = userRecord[ch_id];  // 获取当前 ch_id 的产品记录

            // 获取 proid 的键名并按降序排序
            let sortedProids = Object.keys(productRecord).sort((a, b) => b.localeCompare(a));

            sortedProids.forEach(proid => {
                // 获取 proid 对应的值
                let proidValue = productRecord[proid];

                // 如果 proidValue 为空或没有有效数据，则跳过
                if (!proidValue || proidValue.trim() === "") {
                    return;
                }

                // 在 proid 中替换 "xxpersonname" 为 personName
                let updatedProidValue = proidValue.replace(/xxpersonname/g, personName);

                // 分割 proidValue，如果 split 后字段为空，则填充默认值
                let recordFields = updatedProidValue.split("\t").map(field => field.trim() || "无数据");

                // 输出 proid 对应的值和处理后的字段
                console.log("proid 对应的值:", proidValue);
                console.log("更新后的 proid 值:", updatedProidValue);
                console.log("分割后的字段:", recordFields);

                // 如果没有有效的字段，跳过
                if (recordFields.length === 0 || recordFields.every(field => field === "无数据")) {
                    return;
                }

                // 将拆分后的 proid 字段添加到数据行中
                data.push(recordFields);
            });
        });
    });

    // 根据文件类型选择生成不同的文件
    if (fileType === 'xlsx') {
        // 生成XLSX格式
        let ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
        let colWidths = [70, 50, 50, 170, 170, 170, 170, 170, 170];  // 设置每列的宽度
        ws["!cols"] = colWidths.map(width => ({ wpx: width }));
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "记录数据");
        XLSX.writeFile(wb, `${fileName}.xlsx`);
        console.log("XLSX 文件已生成并开始下载");
    } else if (fileType === 'tsv') {
        // 生成TSV格式
        let tsvContent = [headers.join("\t"), ...data.map(row => row.join("\t"))].join("\n");
        let blob = new Blob([tsvContent], { type: 'text/tab-separated-values' });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.tsv`;
        link.click();
        console.log("TSV 文件已生成并开始下载");
    } else {
        alert("不支持的文件类型！");
    }
}
// End-320-2025.05.24.164900
