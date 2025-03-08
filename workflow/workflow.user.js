// ==UserScript==
// @name         workflow
// @namespace    https://www.1024net.tech/
// @namespace    https://www.lovemake.love/
// @version      2025.03.08.080000
// @description  I try to take over the world!
// @author       Kay
// @match        *://*/*
// @icon         https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1633159205592221.png
// @grant        GM_xmlhttpRequest
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    const check_auth = 0;
    function addTimestampToUrl(url) {
        return url + '?v=' + new Date().getTime();
    }
    var script = document.createElement('script');
    script.src = addTimestampToUrl('https://1024nettech.github.io/workflow/workflow.js');
    script.onload = function () {
        console.log('脚本已加载并执行完毕！');
        // 在这里调用脚本中定义的函数或其他操作
    };
    document.head.prepend(script);
})();
/*2025.03.08.080000 - Line : 30*/
