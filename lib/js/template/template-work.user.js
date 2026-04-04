// ==UserScript==
// @name         work
// @namespace    https://www.1024net.tech/
// @version      2025.11.01.090457
// @description  I try to take over the world!
// @author       Kay
// @noframes
// @match        *://*/*
// @connect      *
// @run-at       document-start
// @grant        GM_info
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @icon         https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1633159205592221.png
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    unsafeWindow.GM_info = GM_info;
    unsafeWindow.GM_xmlhttpRequest = GM_xmlhttpRequest;
    let script = document.createElement("script");
    script.src = "https://1024nettech.github.io/work/js/modules/work-loader.js?time=" + Date.now();
    script.type = "module";
    script.async = true;
    if (document.head) {
        document.head.appendChild(script);
        console.log("来自主脚本输出: head 已经存在, 脚本已添加……");
    } else {
        let observer = new MutationObserver(function (mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (document.head) {
                    document.head.appendChild(script);
                    console.log("来自observer输出: head 已经存在, 脚本已添加……");
                    observer.disconnect();
                    break;
                }
            }
        });
        observer.observe(document, { childList: true, subtree: true });
    }
})();
// End-44-2026.04.04.185544
