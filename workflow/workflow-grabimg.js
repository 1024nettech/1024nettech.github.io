// 用于存储已添加的图片元素的集合（全局变量）
const addedImages = new Set();

document.body.addEventListener('mouseleave', function () {
    // 获取所有具有背景图的元素
    const elementsWithBg = document.querySelectorAll('[style*="background-image"]');

    elementsWithBg.forEach(function (element) {
        // 获取背景图的 URL
        let bgImage = getComputedStyle(element).backgroundImage;

        // 如果背景图不为空且为有效的URL
        if (bgImage && bgImage !== 'none') {
            // 去除 "url(" 和 ")"，只保留 URL
            bgImage = bgImage.slice(4, -1).replace(/["']/g, '');

            // 检查是否已经添加过此背景图的 img 元素
            if (!addedImages.has(bgImage)) {
                // 创建新的 img 元素
                const img = document.createElement('img');
                img.src = bgImage;

                // 将 img 元素添加到 body 中
                document.body.appendChild(img);

                // 隐藏 img 元素
                img.style.display = 'none';

                // 将该背景图对应的 img 元素加入到已添加集合中
                addedImages.add(bgImage);
            }
        }
    });
});
// End-35-2025.06.26.173610
