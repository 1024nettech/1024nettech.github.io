// test-main.js
// 使用 unsafeWindow 调用 GM_xmlhttp
unsafeWindow.GM_xmlhttp("https://qq.com", "", function(response) {
    console.log("请求成功，响应内容:", response.responseText);
});
