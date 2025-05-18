import { set, get, del, keys } from "./idb-keyval.js";
export function loadFiles(urls, status, isModule = false) {
    // 动态加载外部文件(JS/CSS)
    if (status === 1) {
        urls = urls.map(url => url + "?t=" + Date.now());
    }
    let totalFiles = urls.length;
    let loadedFiles = 0;
    function loadNextFile(index) {
        if (index < totalFiles) {
            let url = urls[index];
            let fileExtension = url.split(".").pop().split("?")[0].toLowerCase();
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
                    console.error(`脚本加载失败: ${url}，错误信息: `, error);
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
                    console.error(`CSS 加载失败: ${url}，错误信息: `, error);
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
    // 如果是单图模式，不需要判断大小并切割
    let screenshotMode = localStorage.getItem("screenshotMode");
    if (screenshotMode === "单图模式") {
        let imgData = canvas.toDataURL("image/png");
        return [imgData];
    }
    // 多图模式：检查图片是否大于5MB
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
        // 如果图片大于5MB，切割为两部分
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
    let keepKeys = ["auth", "autorun", "date", "screenshotMode"];
    for (let key in localStorage) {
        if (!keepKeys.includes(key)) {
            localStorage.removeItem(key);
        }
    }
    console.log("localStorage 已清除完毕: ", localStorage);
}
export function waitForElementOrCookie(selector, callback, interval = 100, maxAttempts = 100) {
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
export async function appendToRecord(newValue, appendMode) {
    // 获取记录并根据条件追加数据到idb-keyval的record[]: 0为更新附加到最后一条; 1为push一条新数据
    let records = await get("record");
    if (!records) {
        records = [];
    }
    if (appendMode === 0 && records.length > 0) {
        records[records.length - 1] += newValue;
    } else if (appendMode === 1) {
        records.push(newValue);
    }
    await set("record", records);
    console.log("记录已更新: ", records);
}
export async function downloadRecordAsTSV(personName, fileName) {
    // 从 idb-keyval 获取 record[],下载为tsv格式
    let records = await get("record");
    if (!records || records.length === 0) {
        alert("没有找到可导出的数据！");
        return;
    }
    let tsvContent = "";
    records.forEach(record => {
        let updatedRecord = record.replace(/xxpersonname/g, personName);
        tsvContent += `${updatedRecord}\n`;
    });
    let blob = new Blob([tsvContent], { type: "text/tab-separated-values" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.tsv`;
    link.click();
    console.log("TSV 文件已生成并开始下载");
}
// End-226-2025.05.18.202536
