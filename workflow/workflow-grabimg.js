// 用于存储已添加的图片元素的集合（全局变量）
const addedImages = new Set();

// 监听鼠标离开事件
document.body.addEventListener('mouseleave', function () {
    // 获取所有具有背景图的元素
    const elementsWithBg = document.querySelectorAll('*');

    elementsWithBg.forEach(function (element) {
        // 获取每个元素的背景图像
        const backgroundImage = window.getComputedStyle(element).backgroundImage;

        // 如果该元素有背景图像且背景图不为空
        if (backgroundImage && backgroundImage !== 'none') {
            // 提取背景图像的 URL 部分
            const urlMatch = backgroundImage.match(/url\(["']?(.*?)["']?\)/);
            if (urlMatch && urlMatch[1]) {
                const imageUrl = urlMatch[1];

                // 如果此背景图尚未转换为 img 元素
                if (!addedImages.has(imageUrl)) {
                    // 创建一个新的 img 元素
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.style.display = 'none';  // 隐藏新建的 img 元素（而不是原始元素）

                    // 将 img 元素插入到原始元素的后面作为兄弟元素
                    element.parentNode.insertBefore(img, element.nextSibling);

                    // 将该背景图对应的 img 元素加入到已添加集合中
                    addedImages.add(imageUrl);
                }
            }
        }
    });

    if (window.location.href.includes("https://b2b.baidu.com")) {
        let aa = new Set();
        // 1. 检查并将 .thumb-item .img 的背景图像转换为 img 元素
        document.querySelectorAll('.thumb-item .img').forEach(function (imgElement) {
            const backgroundImage = window.getComputedStyle(imgElement).backgroundImage;

            if (backgroundImage && backgroundImage !== 'none') {
                // 提取背景图像的 URL 部分
                const urlMatch = backgroundImage.match(/url\(["']?(.*?)["']?\)/);

                if (urlMatch && urlMatch[1]) {
                    const imageUrl = urlMatch[1];

                    // 检查该背景图像是否已经被添加过
                    if (!aa.has(imageUrl)) {
                        // 创建一个新的 img 元素
                        const img = document.createElement('img');
                        img.src = imageUrl;
                        img.style.display = 'none';  // 隐藏新建的 img 元素

                        // 插入到当前元素之后
                        imgElement.parentNode.insertBefore(img, imgElement.nextSibling);

                        // 将该背景图的 URL 添加到已添加集合中
                        aa.add(imageUrl);
                    }
                }
            }
        });

        // 2. 如果 .album video 元素存在
        if (document.querySelectorAll('.album video').length > 0) {
            // 从 .thumb-item 的第二个元素中的 img 开始，alt 赋值为“主图-1”、“主图-2”等
            document.querySelectorAll('.thumb-item img').forEach(function (imgElement, index) {
                if (index >= 1) {  // 从第二个元素开始
                    imgElement.alt = `主图-${index}`;
                    // 检查并修改 src 地址，如果末尾没有 #1024，则添加
                    let imgSrc = imgElement.src;
                    if (!imgSrc.endsWith('#1024')) {
                        imgElement.src = imgSrc + '#1024';
                    }
                }
            });
        } else {
            // 3. 如果 .album video 元素不存在
            // 从 .thumb-item 的第一个元素中的 img 开始，alt 赋值为“主图-1”、“主图-2”等
            document.querySelectorAll('.thumb-item img').forEach(function (imgElement, index) {
                if (index === 0) {  // 从第一个元素开始
                    imgElement.alt = `主图-${index + 1}`;
                    // 检查并修改 src 地址，如果末尾没有 #1024，则添加
                    let imgSrc = imgElement.src;
                    if (!imgSrc.endsWith('#1024')) {
                        imgElement.src = imgSrc + '#1024';
                    }
                }
            });
        }

        // 4. 修改 .questionable-detail 中的 img，alt 赋值为“详情图-1”、“详情图-2”等
        document.querySelectorAll('.questionable-detail img').forEach(function (imgElement, index) {
            imgElement.alt = `详情图-${index + 1}`;
            // 检查并修改 src 地址，如果末尾没有 #1024，则添加
            let imgSrc = imgElement.src;
            if (!imgSrc.endsWith('#1024')) {
                imgElement.src = imgSrc + '#1024';
            }
        });
    }
});
// End-106-2025.07.28.212957
