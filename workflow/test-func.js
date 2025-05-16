// test-func.js
export const greet = () => {
    console.log("Hello from test-func.js!");
};

export let value = {a:42};

export function GM_xmlhttp(url, cookie, doCallback) {
    GM_xmlhttpRequest({
        method: "GET", // 你可以根据需要修改请求类型
        url: url,
        headers: {
            "Cookie": cookie
        },
        onload: function(response) {
            // 请求成功时调用do()回调函数，传递响应数据
            doCallback(response);
        },
        onerror: function(error) {
            // 请求失败时处理错误
            console.error("请求失败:", error);
        }
    });
}
GM_xmlhttp("https://qq.com", "", function(response) {
    console.log("请求成0功，响应内容func:", response.responseText);
});
