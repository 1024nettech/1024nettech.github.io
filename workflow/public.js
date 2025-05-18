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

export async function appendToRecord(newValue, appendMode, maxRetries = 5, retryInterval = 1000) {
    // 获取锁的键
    const lockKey = "recordLock";
    let retries = 0;

    while (retries < maxRetries) {
        const isLocked = localStorage.getItem(lockKey);
        
        if (isLocked !== "true") {
            try {
                // 锁定记录
                localStorage.setItem(lockKey, "true");

                // 获取当前记录对象
                let records = await get("record");
                if (!records) {
                    records = {};  // 如果没有记录对象，则初始化为空对象
                }

                // 从当前URL中提取 ch_id 和 id
                const urlParams = new URLSearchParams(window.location.search);
                const ch_id = urlParams.get('ch_id');
                const _id = urlParams.get('id');

                if (!ch_id || !_id) {
                    console.error("URL 中缺少 ch_id 或 id 参数");
                    return;
                }

                const recordKey = `${ch_id}_${_id}`;  // 将 ch_id 和 id 拼接为键名

                // 根据 appendMode 来决定如何处理记录
                if (appendMode === 0 && records[recordKey]) {
                    // 如果是附加模式并且已有该键的记录，则追加数据到该键
                    records[recordKey] += newValue;
                } else if (appendMode === 1) {
                    // 如果是推送模式，则将新的数据作为该键的值
                    records[recordKey] = newValue;
                }

                // 更新 idb-keyval 中的记录
                await set("record", records);

                console.log("记录已更新: ", records);
                return;  // 操作成功，退出
            } finally {
                // 操作完成后解除锁
                localStorage.removeItem(lockKey);
            }
        } else {
            // 锁定状态，等待并重试
            console.log(`记录已被锁定，等待重试 (重试 ${retries + 1} / ${maxRetries})...`);
            retries++;
            await new Promise(resolve => setTimeout(resolve, retryInterval));
        }
    }

    // 达到最大重试次数，给出提示
    console.error("无法获取锁，已达到最大重试次数。请稍后再试。");
}















export async function downloadRecordAsTSV(personName, fileName) {
    // 从 idb-keyval 获取 record 对象
    let records = await get("record");
    if (!records || Object.keys(records).length === 0) {
        alert("没有找到可导出的数据！");
        return;
    }

    // 创建 TSV 文件的内容
    let tsvContent = "日期\t姓名\t会员名\t栏目id\t产品id\t栏目名\t产品链接\t原始值\t改后值\t处理状态\t记录内容\n";  // 第一行是表头，ch_id_id 和 记录内容

    // 遍历 record 对象，构建 TSV 内容
    Object.keys(records).forEach(key => {
        let recordValue = records[key];
        // 替换 xxpersonname 为 personName
        let updatedRecord = recordValue.replace(/xxpersonname/g, personName);
        // 将 ch_id_id 和记录内容写入 TSV 内容
        tsvContent += `${key}\t${updatedRecord}\n`;
    });

    // 创建 Blob 对象并启动下载
    let blob = new Blob([tsvContent], { type: "text/tab-separated-values" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.tsv`;
    link.click();

    console.log("TSV 文件已生成并开始下载");
}



// End-226-2025.05.18.202536
