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
            document.head.prepend(script);
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
    /*——————————————————————————————————————————————————1688图片重命名——————————————————————————————————————————————————*/
    function img_rename() {
        // 主图修改：修改 .detail-gallery-img 的图片 alt 和 src 后缀
        document.querySelectorAll('.detail-gallery-img:not(.video-icon + .detail-gallery-img)').forEach((img, index) => {
            img.alt = `主图-${index + 1}`;
            // 只在 src 中不包含 #1024down 时修改
            if (!img.src.includes('#1024down')) {
                img.src = img.src + '#1024down-' + img.alt; // 追加到 src 的末尾，并把 alt 值加到 #1024down 后面
            }
        });
        // 规格图修改：修改 .sku-item-image 的 div 背景图片并添加隐藏 img 子元素
        document.querySelectorAll('.sku-item-image').forEach((skuItem, index) => {
            // 检查是否已经存在 img 子元素且 src 中已包含 #1024down
            const existingImg = skuItem.querySelector('img');
            if (!existingImg || !existingImg.src.includes('#1024down')) {
                const bgUrl = window.getComputedStyle(skuItem).backgroundImage.slice(5, -2);
                const img = document.createElement('img');
                img.alt = `规格图-${index + 1}`;
                img.src = bgUrl + '#1024down-' + img.alt; // 追加到 src 的末尾，并把 alt 值加到 #1024down 后面
                img.style.display = 'none';
                skuItem.appendChild(img);
            }
        });
        // 详情图修改：修改 .content-detail 内部图片的 alt 和 src 后缀
        document.querySelectorAll('.content-detail img').forEach((img, index) => {
            img.alt = `详情图-${index + 1}`;
            // 只在 src 中不包含 #1024down 时修改
            if (!img.src.includes('#1024down')) {
                img.src = img.src + '#1024down-' + img.alt; // 追加到 src 的末尾，并把 alt 值加到 #1024down 后面
            }
        });
    }
    // 当鼠标离开 body 时触发 img_rename()
    document.body.addEventListener('mouseleave', function () {
        img_rename();
    });
    /*——————————————————————————————————————————————————1688图片重命名——————————————————————————————————————————————————*/
    /*——————————————————————————————————————————————————1688详情截图——————————————————————————————————————————————————*/
    let screenshotMode = 'multiple'; // 默认模式是多图（会检查5MB大小）
    let html = `
    <button id="modex">多图模式</button>
    <button id="processing-message">已准备...</button>
    <style>
        #modex,
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
            font-size: 14px;
        }

        #modex {
            top: 50px;
        }

        #processing-message {
            top: 85px;
        }
    </style>
    `;
    $("body").append(html);
    let storedmode = localStorage.getItem("mode");
    if (storedmode != null) {
        $("#modex").text(storedmode);
        if (storedmode == "单图模式") {
            screenshotMode = "single";
        }
        else {
            screenshotMode = "multiple";
        }
    }
    $("#modex").click(function () {
        if ($(this).text() == "多图模式") {
            $(this).text("单图模式");
            screenshotMode = "single";
            localStorage.setItem("mode", "单图模式");
        }
        else {
            $(this).text("多图模式");
            screenshotMode = "multiple";
            localStorage.setItem("mode", "多图模式");
        }
    });
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
        // 如果是单图模式，不需要判断大小并切割
        if (screenshotMode === 'single') {
            const imgData = canvas.toDataURL("image/png");
            return [imgData];
        }
        // 多图模式：检查图片是否大于5MB
        const imgData = canvas.toDataURL("image/png");
        const byteCharacters = atob(imgData.split(',')[1]);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset++) {
            byteArrays.push(byteCharacters.charCodeAt(offset));
        }
        const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });
        if (blob.size > 5 * 1024 * 1024) {
            const height = canvas.height;
            const midHeight = Math.floor(height / 2);
            // 如果图片大于5MB，切割为两部分
            const firstPartCanvas = document.createElement('canvas');
            const secondPartCanvas = document.createElement('canvas');
            firstPartCanvas.width = canvas.width;
            firstPartCanvas.height = midHeight;
            secondPartCanvas.width = canvas.width;
            secondPartCanvas.height = height - midHeight;
            const firstPartCtx = firstPartCanvas.getContext('2d');
            const secondPartCtx = secondPartCanvas.getContext('2d');
            firstPartCtx.drawImage(canvas, 0, 0, canvas.width, midHeight, 0, 0, canvas.width, midHeight);
            secondPartCtx.drawImage(canvas, 0, midHeight, canvas.width, height - midHeight, 0, 0, canvas.width, height - midHeight);
            const firstPartSlices = sliceImage(firstPartCanvas);
            const secondPartSlices = sliceImage(secondPartCanvas);
            return [...firstPartSlices, ...secondPartSlices];
        } else {
            return [imgData];
        }
    }
    function takeScreenshots() {
        if (flag == 0) {
            flag = 1;
            $("body").attr("id", "bodyx");
            $(".content-detail").attr("id", "screenshot-area");
            $('#processing-message').text("处理中……");
            location.href = location.href.split("#bodyx")[0] + "#bodyx";
            const pageTitle = document.title;
            html2canvas(document.querySelector("#screenshot-area"), {
                useCORS: true,
                logging: true
            }).then(canvas => {
                const imageArray = sliceImage(canvas);
                let downloadedCount = 0;
                const totalImages = imageArray.length;
                imageArray.forEach((imgData, index) => {
                    const link = document.createElement('a');
                    link.href = imgData;
                    link.download = `${time}-${index + 1}-${pageTitle}.png`;
                    link.click();
                    downloadedCount++;
                    if (downloadedCount === totalImages) {
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
    /*——————————————————————————————————————————————————1688详情截图——————————————————————————————————————————————————*/
}
