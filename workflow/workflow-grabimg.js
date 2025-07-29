const url = location.href;

// 检查是否已经加载 jQuery，如果没有加载，动态加载 jQuery
if (typeof jQuery == "undefined") {
    let script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0-beta.2/jquery.min.js";
    document.head.appendChild(script);
    script.onload = function () {
        console.log("jQuery 已加载");
        runJQueryCode();  // 加载完 jQuery 后运行主要代码
    };
} else {
    runJQueryCode();  // 如果已经有 jQuery, 直接运行代码
}

// 获取当前日期和时间, 返回无分隔符的格式：YYYYMMDDHHMMSS
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始, 所以加1
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function runJQueryCode() {
    const addedImages = new Set();

    // 将背景图转换为 img 元素的函数
    function convertBgToImg(element) {
        let backgroundImage = $(element).css("background-image");
        if (backgroundImage && backgroundImage !== "none") {
            if (url.includes("https://b2b.baidu.com")) {
                // 爱采购主图, 替换背景图像的 URL 中的 &fmt=auto? 为 &fmt=JPEG?
                backgroundImage = backgroundImage.replace(/&fmt=auto\?/, "&fmt=JPEG?");
            }
            // 提取背景图像的 URL 部分
            const urlMatch = backgroundImage.match(/url\(["']?(.*?)["']?\)/);
            if (urlMatch && urlMatch[1]) {
                const imageUrl = urlMatch[1];
                // 如果此背景图尚未转换为 img 元素
                if (!addedImages.has(imageUrl)) {
                    // 创建一个新的 img 元素
                    const img = $("<img>", {
                        src: imageUrl,
                        style: "display: none;"  // 隐藏新建的 img 元素（而不是原始元素）
                    });
                    // 将 img 元素插入到原始元素的后面作为兄弟元素
                    $(element).after(img);
                    // 将该背景图对应的 img 元素加入到已添加集合中
                    addedImages.add(imageUrl);
                }
            }
        }
    }

    // 设置定时器, 每 1000ms 执行一次
    const intervalId = setInterval(function () {
        // 1. 移除 .thumb-play + div 的 class 值
        $(".thumb-play+div").removeClass();

        // 2. 检查并将 .thumb-item .img 的背景图像转换为 img 元素
        $(".thumb-item .img").each(function () {
            convertBgToImg(this);  // 使用同样的函数来处理
        });

        // 3. 处理 .thumb-item 中的 img 元素, 赋值 alt 和修改 src
        $(".thumb-item img").each(function (index) {
            $(this).attr("alt", `导读图-${index + 1}`);
            // 检查并修改 src 地址, 如果末尾没有 #1024, 则添加
            let imgSrc = $(this).attr("src");
            if (!imgSrc.endsWith("#1024")) {
                $(this).attr("src", imgSrc + "#1024");
            }
        });

        // 4. 修改 .questionable-detail 中的 img, alt 赋值为“详情图-1”、“详情图-2”等
        $(".questionable-detail img").each(function (index) {
            $(this).attr("alt", `详情图-${index + 1}`);
            // 检查并修改 src 地址, 如果末尾没有 #1024, 则添加
            let imgSrc = $(this).attr("src");
            if (!imgSrc.endsWith("#1024")) {
                $(this).attr("src", imgSrc + "#1024");
            }
        });
    }, 1000); // 每 1000ms 执行一次
}
