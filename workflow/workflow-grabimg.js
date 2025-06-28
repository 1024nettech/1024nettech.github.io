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
});
// End-37-2025.06.28.173112
