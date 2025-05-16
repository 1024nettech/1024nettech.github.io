alert(0);





 unsafeWindow.GM_xmlhttpRequest({
            method: "GET",
            url: "https://api.example.com",
            onload: function (response) {
                console.log("请求成功，响应内容main:", response.responseText);
            },
            onerror: function (error) {
                console.error("请求失败:", error);
            }
        });
console.log(unsafeWindow.GM_xmlhttpRequest);
window.addEventListener('load', function () {
    // 访问 unsafeWindow 中的 GM_xmlhttpRequest
    if (unsafeWindow.GM_xmlhttpRequest) {
        unsafeWindow.GM_xmlhttpRequest({
            method: "GET",
            url: "https://api.example.com",
            onload: function (response) {
                console.log("请求成功，响应内容main:", response.responseText);
            },
            onerror: function (error) {
                console.error("请求失败:", error);
            }
        });
    }
});
