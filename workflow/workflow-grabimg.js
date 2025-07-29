const url = location.href;
const addedImages = new Set();
// 获取当前日期和时间, 返回无分隔符的格式：YYYYMMDDHHMMSS
function getCurrentDateTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始, 所以加1
    let day = String(now.getDate()).padStart(2, "0");
    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
// 将背景图转换为 img 元素的函数
function convertBgToImg(element) {
    let backgroundImage = window.getComputedStyle(element).backgroundImage;
    if (backgroundImage && backgroundImage !== "none") {
        if (url.includes("https://b2b.baidu.com")) {
            // 爱采购主图, 替换背景图像的 URL 中的 &fmt=auto? 为 &fmt=JPEG?
            backgroundImage = backgroundImage.replace(/&fmt=auto\?/, "&fmt=JPEG?");
        }
        // 提取背景图像的 URL 部分
        let urlMatch = backgroundImage.match(/url\(["']?(.*?)["']?\)/);
        if (urlMatch && urlMatch[1]) {
            let imageUrl = urlMatch[1];
            // 如果此背景图尚未转换为 img 元素
            if (!addedImages.has(imageUrl)) {
                // 创建一个新的 img 元素
                let img = document.createElement("img");
                img.src = imageUrl;
                img.style.display = "none"; // 隐藏新建的 img 元素（而不是原始元素）
                // 将 img 元素插入到原始元素的后面作为兄弟元素
                element.parentNode.insertBefore(img, element.nextSibling);
                // 将该背景图对应的 img 元素加入到已添加集合中
                addedImages.add(imageUrl);
            }
        }
    }
}
// 爱采购
if (url.includes("https://b2b.baidu.com")) {
    let style = `
            .thumb-play+div {
                background-color: #fff;
                background-position: 50% 50%;
                background-repeat: no-repeat;
                background-size: cover;
                bottom: 0;
                height: 100%;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
            }
            #videox {
                width: 100%;
            }
            .video-container {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `;
    let styleElement = document.createElement("style");
    styleElement.id = "stylex";
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);
    let a = document.querySelector(".album video").src;
    if (a) {
        let firstThumbItem = document.querySelector(".thumb-item:first-child");
        if (firstThumbItem) {
            firstThumbItem.addEventListener("mouseenter", function () {
                let videoContainer = document.querySelector(".video-container");
                if (videoContainer) {
                    videoContainer.innerHTML = `<video id="videox" autoplay controls muted loop src="${a}"></video>`;
                }
            });
            firstThumbItem.addEventListener("click", function () {
                window.open(a);
            });
        }
    }
    // 修改页面标题
    let pageTitle = document.querySelector("title");
    if (pageTitle) {
        pageTitle.textContent = getCurrentDateTime() + "-" + pageTitle.textContent;
    }
}
document.addEventListener("mouseleave", function () {
    if (url.includes("https://b2b.baidu.com")) {
        // 1. 移除 .thumb-play + div 的 class 值
        let thumbPlayDiv = document.querySelector(".thumb-play+div");
        if (thumbPlayDiv) {
            thumbPlayDiv.className = "";  // 移除 class
        }
        // 2. 检查并将 .thumb-item .img 的背景图像转换为 img 元素
        let thumbItemImgs = document.querySelectorAll(".thumb-item .img");
        thumbItemImgs.forEach(function (imgElement) {
            convertBgToImg(imgElement);
        });
        // 3. 处理 .thumb-item 中的 img 元素, 赋值 alt 和修改 src
        let thumbItemImages = document.querySelectorAll(".thumb-item img");
        thumbItemImages.forEach(function (imgElement, index) {
            imgElement.alt = `导读图-${index + 1}`;
            let imgSrc = imgElement.src;
            if (!imgSrc.endsWith("#1024")) {
                imgElement.src = imgSrc + "#1024";
            }
        });
        // 4. 修改 .questionable-detail 中的 img, alt 赋值为“详情图-1”、“详情图-2”等
        let questionableDetailImages = document.querySelectorAll(".questionable-detail img");
        questionableDetailImages.forEach(function (imgElement, index) {
            imgElement.alt = `详情图-${index + 1}`;
            let imgSrc = imgElement.src;
            if (!imgSrc.endsWith("#1024")) {
                imgElement.src = imgSrc + "#1024";
            }
        });
    } else {
        // 获取所有具有背景图的元素
        let allElements = document.querySelectorAll("*");
        allElements.forEach(function (element) {
            convertBgToImg(element);
        });
    }
});
// End-127-2025.07.29.153639
