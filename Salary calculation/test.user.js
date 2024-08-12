// ==UserScript==
// @name         Check JS
// @namespace    https://www.1024net.tech/
// @namespace    https://www.lovemake.love/
// @version      2024.06.30.080000
// @description  I try to take over the world!
// @author       Kay
// @match        http://*.qipeiyigou.com/mshop/*
// @match        http://*.qipeiyigou.com/mshop/product/item/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=qipeiyigou.com
// @grant        GM_xmlhttpRequest
// @downloadURL https://update.greasyfork.org/scripts/471335/Check%20JS.user.js
// @updateURL https://update.greasyfork.org/scripts/471335/Check%20JS.meta.js
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    /*————————————————————函数定义区 Start————————————————————*/
    function showkeyword() {
        $(".title h3").append("<br><p><span id='keywordx'></span><!--<button id='refreshx'>刷新</button>--></p>");
        let timer0 = setInterval(() => {
            let keyword = $("meta[name=keywords]").attr("content");
            if (keyword) {
                clearInterval(timer0);
                $("#keywordx").text(keyword);
            }
        }, checktime);
    }
    function check() {
        if (url.indexOf("/product/item/") != -1) {
            if ($(".product-content a").length) { id = 1; alert("存在超链接！"); }
            let a = $(".product-content img").length;
            for (let i = 0; i < a; i++) {
                let b = $(".product-content img:eq(" + i + ")").attr("src");
                if (b.indexOf("aimg8.dlssyht.cn") == -1) { id = 2; break; }
            }
            if (id == 0) { window.close(); }
            else if (id == 2) { alert("存在外链图片！"); }
        }
        else {
            $(".list img").click();
        }
    }
    function get_cat() {
        let channel_id = [19366256, 19366257]
        let a = channel_id.length;
        let b = url.split("/item/")[1].split("?")[0];
        for (let i = 0; i < a; i++) {
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://admin.qipeiyigou.com/own_product_edit.php?id=" + b + "&channel_id=" + channel_id[i],
                headers: {
                    "Content-Type": "text/html;charset=gbk"
                },
                onload: function (response) {
                    let c = response.responseText;
                    console.log(c);
                    if (c.indexOf(b) != -1) {
                        alert(c.split('"big_id":')[1].split(',"sub_sub_sub_id"')[0]);
                    }
                    else {
                        alert("不存在");
                    }
                }
            });
        }
    }
    /*————————————————————函数定义区 End————————————————————*/
    /*————————————————————主体代码区 Start————————————————————*/
    const url = location.href;
    let checktime = 500;//关键词获取频率
    let id = 0;//产品说明超链接、外链图片状态
    if (url.indexOf("product/item/") != -1) {
        showkeyword();
        //get_cat();
    }
    $(document).keyup(function (event) {
        switch (event.keyCode) {
            case 27:
                check();
                break;
        }
    });
    /*————————————————————主体代码区 End————————————————————*/
})();
/*2024.06.30.080000 - Line : 86*/
