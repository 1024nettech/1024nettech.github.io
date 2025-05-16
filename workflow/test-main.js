alert(0);




console.log(unsafeWindow.GM_xmlhttpRequest);
 unsafeWindow.GM_xmlhttpRequest({
            method: "GET",
            url: "https://qq.com",
            onload: function (response) {
                console.log("请求成功，响应内容main:", response.responseText);
            },
            onerror: function (error) {
                console.error("请求失败:", error);
            }
        });

window.addEventListener('load', function () {
    // 访问 unsafeWindow 中的 GM_xmlhttpRequest
    if (unsafeWindow.GM_xmlhttpRequest) {
        unsafeWindow.GM_xmlhttpRequest({
            method: "GET",
            url: "https://qq.com",
            onload: function (response) {
                console.log("请求成功，响应内容main:", response.responseText);
            },
            onerror: function (error) {
                console.error("请求失败:", error);
            }
        });
    }
});
