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

            // 创建新的 img 元素
            const img = document.createElement('img');
            img.src = bgImage;

            // 将 img 元素添加到 body 中
            document.body.appendChild(img);

            // 隐藏 img 元素
            img.style.display = 'none';
        }
    });
});
// End-26-2025.06.26.172214