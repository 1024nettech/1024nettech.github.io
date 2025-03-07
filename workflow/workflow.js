function addTimestampToUrl(url) {
    return url + '?v=' + new Date().getTime();
}
function loadScripts(urls) {
    const totalScripts = urls.length;
    function loadNextScript(index) {
        if (index < totalScripts) {
            const script = document.createElement('script');
            script.src = addTimestampToUrl(urls[index]);
            script.onload = function () {
                console.log(`脚本加载完成：${urls[index]}`);
                loadNextScript(index + 1);  // 加载下一个脚本
            };
            script.onerror = function (error) {
                console.error('脚本加载失败：', error);
            };
            console.log(`开始加载脚本：${urls[index]}`);
            document.head.prepend(script);  // 支持 prepend 方法
        }
    }
    loadNextScript(0);  // 开始加载第一个脚本
}
const scriptUrls = [
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0-beta.2/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
];
loadScripts(scriptUrls);
const url = location.href;
if (url.indexOf("https://detail.1688.com/offer/") != -1) {
    /*1688详情截图*/
    let flag = 0;
    let time = generateTimestamp();
    function generateTimestamp() {
        const now = new Date();
        const year = now.getFullYear().toString().padStart(4, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return year + month + day + hours + minutes + seconds;
    }
    function sliceImage(canvas) {
        // 将 canvas 转为 PNG 格式的 Base64 图片数据
        const imgData = canvas.toDataURL("image/png");
        // 将 Base64 图片数据转换为 Blob 对象以便检查大小
        const byteCharacters = atob(imgData.split(',')[1]);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset++) {
            byteArrays.push(byteCharacters.charCodeAt(offset));
        }
        const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });
        // 检查图片的大小是否超过 5MB
        if (blob.size > 5 * 1024 * 1024) {
            const height = canvas.height;
            const midHeight = Math.floor(height / 2);
            // 切割图片：将图片从中间二等分
            const firstPartCanvas = document.createElement('canvas');
            const secondPartCanvas = document.createElement('canvas');
            // 设置画布大小
            firstPartCanvas.width = canvas.width;
            firstPartCanvas.height = midHeight;
            secondPartCanvas.width = canvas.width;
            secondPartCanvas.height = height - midHeight;
            // 获取上下部分的 2D 上下文
            const firstPartCtx = firstPartCanvas.getContext('2d');
            const secondPartCtx = secondPartCanvas.getContext('2d');
            // 将原始图片绘制到新的画布上
            firstPartCtx.drawImage(canvas, 0, 0, canvas.width, midHeight, 0, 0, canvas.width, midHeight);
            secondPartCtx.drawImage(canvas, 0, midHeight, canvas.width, height - midHeight, 0, 0, canvas.width, height - midHeight);
            // 递归切割每个部分
            const firstPartSlices = sliceImage(firstPartCanvas);
            const secondPartSlices = sliceImage(secondPartCanvas);
            // 返回所有切割后的部分
            return [...firstPartSlices, ...secondPartSlices];
        } else {
            // 如果图片小于 5MB，直接返回当前图像
            return [imgData];
        }
    }
    // 主函数：使用 html2canvas 截图并开始切割
    function takeScreenshots() {
        if (flag == 0) {
            flag = 1;
            $("body").attr("id", "bodyx");
            $(".content-detail").attr("id", "screenshot-area");
            let html = `
            <button id="processing-message">处理中...</button>
            <style>
                #processing-message {
                    width: 100px;
                    height: 30px;
                    position: fixed;
                    top: 50px;
                    right: 50px;
                    color: white;
                    background-color: #0099ff;
                    border: 0;
                    border-radius: 5px;
                }
            </style>
            `;
            $("body").append(html);
            location.href += "#bodyx";
            // 获取页面标题
            const pageTitle = document.title;
            html2canvas(document.querySelector("#screenshot-area"), {
                useCORS: true,
                logging: true
            }).then(canvas => {
                // 调用切割函数
                const imageArray = sliceImage(canvas);
                // 按顺序下载每个切片文件
                let downloadedCount = 0;
                const totalImages = imageArray.length;
                // 按顺序下载每个切片文件
                imageArray.forEach((imgData, index) => {
                    // 创建一个下载链接
                    const link = document.createElement('a');
                    link.href = imgData;
                    link.download = `${time}-${index + 1}-${pageTitle}.png`;
                    // 触发点击事件来下载文件
                    link.click();
                    // 增加下载计数器
                    downloadedCount++;
                    if (downloadedCount === totalImages) {
                        // 所有文件下载完成后显示完成提示
                        $('#processing-message').text("已完成！");
                    }
                });
            });
        }
        else {
            alert("已下载！如需重新下载请刷新页面……");
        }
    }
    $(document).on("keyup", function (event) {
        switch (event.key) {
            case "F2":
                takeScreenshots();
                break;
        }
    });
    /*1688详情截图*/
}
