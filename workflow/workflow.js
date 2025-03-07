function addTimestampToUrl(url) {
    return url + '?v=' + new Date().getTime();
}
function loadScripts(urls, callback) {
    let loadedCount = 0;
    const totalScripts = urls.length;
    function handleLoad() {
        loadedCount++;
        if (loadedCount === totalScripts && typeof callback === 'function') {
            callback();
        }
    }
    function handleError(error) {
        console.error('脚本加载失败：', error);
    }
    function loadNextScript(index) {
        if (index < urls.length) {
            const script = document.createElement('script');
            script.src = addTimestampToUrl(urls[index]);
            script.onload = handleLoad;
            script.onerror = handleError;  // 添加错误处理
            document.head.prependChild(script);
        } else {
            handleLoad();
        }
    }
    loadNextScript(0);
}
const scriptUrls = [
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0-beta.2/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
];
loadScripts(scriptUrls, function () {
    console.log('所有脚本已加载并执行完毕！');
    // 在这里可以安全地调用所有加载的脚本中定义的函数或其他操作
    const url = location.href;
    if (url.indexOf("https://detail.1688.com/offer/") != -1) {
        alert('脚本已加载，当前是1688商品详情页');
    }
});
