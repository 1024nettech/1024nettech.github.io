// ==UserScript==
// @name         name
// @namespace    http://tampermonkey.net/
// @version      2026.04.07.084611
// @description  name
// @author       Kay
// @match        https://*/*
// @grant        unsafeWindow
// @grant        GM_openInTab
// @grant        GM_addElement
// @grant        GM_webRequest
// @grant        GM_xmlhttpRequest
// @connect      *
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    unsafeWindow.GM_openInTab = GM_openInTab;
    unsafeWindow.GM_addElement = GM_addElement;
    unsafeWindow.GM_webRequest = GM_webRequest;
    unsafeWindow.GM_xmlhttpRequest = GM_xmlhttpRequest;
    function loadExternalScript(url) {
        console.log("[加载中] 外部脚本: ", url);
        return GM_addElement("script", {
            src: url,
            type: "module"
        });
    }
    const EXTERNAL_JS_URL = "https://1024nettech.github.io/custom/*/main-loader.js";
    loadExternalScript(EXTERNAL_JS_URL);

})();
// End-35-2026.04.07.084611
