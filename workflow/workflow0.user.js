// ==UserScript==
// @name         workflow
// @namespace    https://www.1024net.tech/
// @version      2025.05.12.080000
// @description  I try to take over the world!
// @author       Kay
// @match        *://*/*
// @icon         https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1633159205592221.png
// @grant        GM_xmlhttpRequest
// @noframes
// @run-at       body-start
// @updateURL    https://1024nettech.github.io/workflow/workflow.user.js
// @downloadURL  https://1024nettech.github.io/workflow/workflow.user.js
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    const auth = "0015";//权限对应数字:组长检查店铺、1688截图、改库存件标签、改库存件标签请求频率、
    //——————————————————————————————————————————————————函数定义区 Start——————————————————————————————————————————————————
    function update() {
        let version_url = `https://1024nettech.github.io/workflow/version.json?${new Date().getTime()}`;
        GM_xmlhttpRequest({
            type: "GET",
            url: version_url,
            onload: function (response) {
                try {
                    // 解析响应的 JSON 数据
                    let versionData = JSON.parse(response.responseText.trim());
                    // 提取 workflow.user.js 的版本号
                    let userJsVersion = versionData["workflow.user.js"];
                    // 检查当前版本与返回的版本是否一致
                    if (userJsVersion == GM_info.script.version) {
                        console.log(`workflow.user.js已是最新版本: ${GM_info.script.version}\n${version_url}`);
                    } else {
                        $("body").html('<a href="https://1024nettech.github.io/workflow/workflow.user.js" target="_blank">点击更新</a>');
                    }
                } catch (error) {
                    console.error('解析版本信息时出错:', error);
                }
            }
        });
    }
    function getAuth(position) {
        //获取操作权限
        return auth.charAt(position - 1);
    }
    function getCurrentDate() {
        //获取当日日期:YYYY/MM/DD
        let today = new Date();
        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so adding 1
        let day = String(today.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }
    function openProductsEdit() {
        //Esc打开产品栏目管理列表
        if (Number(auto_running)) {
            if (url.includes("sc_product_list.php") != -1 && url.includes("&ls_cur=112") != -1) {
                $('a').filter(function () {
                    return $(this).text().trim() == '编辑';
                }).each(function (index) {
                    let newHref = $(this).attr('href') + '#' + (index + 1);
                    window.open(newHref, '_blank');
                });
                if ($(".page-next").length) {
                    location.href = $(".page-next").attr("href");
                } else {
                    window.close();
                }
            }
        }
    };
    function getCheckedLabels() {
        // 获取所有选中产品性质的父元素文本:产品发布页
        let labelsText = Array.from(document.querySelectorAll('input[name="properties[]"]:checked'))
            .map(checkbox => checkbox.closest('label').textContent.trim())
            .join(', ');
        console.log(labelsText);
        return labelsText;
    }
    function generateOriginRecord() {
        //获取修改产品性质前的原始记录:产品发布页
        let today = getCurrentDate();
        let person = "xxpersonname";
        let username = $(".welcome").text().trim().replace("欢迎您：", "");
        // 使用 URLSearchParams 提取查询参数
        let urlParams = new URLSearchParams(new URL(url).search);
        // 获取 'ch_id' 和 'id' 的值
        let ch_id = urlParams.get('ch_id');
        let id = urlParams.get('id');
        let ch_name = $(".myColumnTit").text();
        let origin_labels = getCheckedLabels();
        let product_link = "http://testpage.qipeiyigou.com/qipeiyigouwang/products/" + id + ".html";
        let origin_record = `${today}\t${person}\t${username}\t${ch_id}\t${id}\t${ch_name}\t${product_link}\t${origin_labels}\t`;
        let stored_record = localStorage.getItem("record");
        localStorage.setItem("record", stored_record + origin_record);
    }
    function generateNewRecord(status) {
        //获取修改产品性质后的最新记录:产品发布页
        let new_labels = getCheckedLabels() + "\t" + status + "|@@|";
        let stored_record = localStorage.getItem("record");
        localStorage.setItem("record", stored_record + new_labels);
    }
    function open_products() {
        //店铺内打开或关闭产品
        if (!location.href.includes("mshop/product/item")) {
            $(".list .image").each(function () {
                window.open($(this).attr("href"));
            });
        } else if (location.href.includes("mshop/product/item")) {
            window.close();
        }
    }
    function loadScripts(urls) {
        //加载CDN外部脚本
        const totalScripts = urls.length;
        function loadNextScript(index) {
            if (index < totalScripts) {
                const script = document.createElement('script');
                script.src = urls[index];
                script.onload = function () {
                    console.log(`脚本加载完成：${urls[index]}`);
                    loadNextScript(index + 1);
                };
                script.onerror = function (error) {
                    console.error('脚本加载失败：', error);
                };
                console.log(`开始加载脚本：${urls[index]}`);
                document.head.append(script);
            }
        }
        loadNextScript(0);
    }
    //——————————————————————————————————————————————————函数定义区 End——————————————————————————————————————————————————
    //——————————————————————————————————————————————————主体代码区 Start——————————————————————————————————————————————————
    update();
    const url = location.href;
    if (url.includes("https://detail.1688.com/offer/") && getAuth(2) == "1") {
        let scriptUrls = [
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0-beta.2/jquery.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
        ];
        loadScripts(scriptUrls);
        /*——————————————————————————————————————————————————1688图片重命名 Start——————————————————————————————————————————————————*/
        function img_rename() {
            // 主图修改：修改 .detail-gallery-img 的图片 alt 和 src 后缀
            document.querySelectorAll('.detail-gallery-img:not(.video-icon + .detail-gallery-img)').forEach((img, index) => {
                img.alt = `主图-${index + 1}`;
                // 只在 src 中不包含 #1024down 时修改
                if (!img.src.includes('#1024down')) {
                    img.src = img.src + '#1024down-' + img.alt; // 追加到 src 的末尾，并把 alt 值加到 #1024down 后面
                }
            });
            // 规格图修改：修改 .sku-item-image 的 div 背景图片并添加隐藏 img 子元素
            $('.prop-img,.single-sku-img-pop').addClass('sku-item-image');
            document.querySelectorAll('.sku-item-image').forEach((skuItem, index) => {
                // 检查是否已经存在 img 子元素且 src 中已包含 #1024down
                const existingImg = skuItem.querySelector('img');
                if (!existingImg || !existingImg.src.includes('#1024down')) {
                    const bgUrl = window.getComputedStyle(skuItem).backgroundImage.slice(5, -2);
                    const img = document.createElement('img');
                    img.alt = `规格图-${index + 1}`;
                    img.src = bgUrl + '#1024down-' + img.alt; // 追加到 src 的末尾，并把 alt 值加到 #1024down 后面
                    img.style.display = 'none';
                    skuItem.appendChild(img);
                }
            });
            // 详情图修改：修改 .content-detail 内部图片的 alt 和 src 后缀
            document.querySelectorAll('.content-detail img').forEach((img, index) => {
                img.alt = `详情图-${index + 1}`;
                // 如果 img 有 data-lazyload-src 属性，则将其值赋给 src
                if (img.hasAttribute('data-lazyload-src')) {
                    img.src = img.getAttribute('data-lazyload-src');
                }
                // 只在 src 中不包含 #1024down 时修改
                if (!img.src.includes('#1024down')) {
                    img.src = img.src + '#1024down-' + img.alt; // 追加到 src 的末尾，并把 alt 值加到 #1024down 后面
                }
            });
        }
        // 当鼠标离开 body 时触发 img_rename()
        document.body.addEventListener('mouseleave', function () {
            img_rename();
        });
        /*——————————————————————————————————————————————————1688图片重命名 End——————————————————————————————————————————————————*/
        /*——————————————————————————————————————————————————1688详情截图 Start——————————————————————————————————————————————————*/
        let screenshotMode = 'multiple'; // 默认模式是多图（会检查5MB大小）
        let html = `
        <button id="modex">多图模式</button>
        <button id="processing-message">已准备...</button>
        <style>
            #modex,
            #processing-message {
                width: 100px;
                height: 30px;
                position: fixed;
                top: 50px;
                right: 50px;
                color: white;
                background-color: #0099ff;
                border: 0;
                border-radius: 5px;
                font-size: 14px;
            }
            #modex {
                top: 50px;
            }
            #processing-message {
                top: 85px;
            }
        </style>
        `;
        $("body").append(html);
        let storedmode = localStorage.getItem("mode");
        if (storedmode != null) {
            $("#modex").text(storedmode);
            if (storedmode == "单图模式") {
                screenshotMode = "single";
            }
            else {
                screenshotMode = "multiple";
            }
        }
        $("#modex").click(function () {
            if ($(this).text() == "多图模式") {
                $(this).text("单图模式");
                screenshotMode = "single";
                localStorage.setItem("mode", "单图模式");
            }
            else {
                $(this).text("多图模式");
                screenshotMode = "multiple";
                localStorage.setItem("mode", "多图模式");
            }
        });
        let flag = 0;
        let time = generateTimestamp();
        function generateTimestamp() {
            const now = new Date();
            const year = now.getFullYear().toString().padStart(4, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            return year + month + day + hours + minutes + seconds;
        }
        function sliceImage(canvas) {
            // 如果是单图模式，不需要判断大小并切割
            if (screenshotMode === 'single') {
                const imgData = canvas.toDataURL("image/png");
                return [imgData];
            }
            // 多图模式：检查图片是否大于5MB
            const imgData = canvas.toDataURL("image/png");
            const byteCharacters = atob(imgData.split(',')[1]);
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset++) {
                byteArrays.push(byteCharacters.charCodeAt(offset));
            }
            const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });
            if (blob.size > 5 * 1024 * 1024) {
                const height = canvas.height;
                const midHeight = Math.floor(height / 2);
                // 如果图片大于5MB，切割为两部分
                const firstPartCanvas = document.createElement('canvas');
                const secondPartCanvas = document.createElement('canvas');
                firstPartCanvas.width = canvas.width;
                firstPartCanvas.height = midHeight;
                secondPartCanvas.width = canvas.width;
                secondPartCanvas.height = height - midHeight;
                const firstPartCtx = firstPartCanvas.getContext('2d');
                const secondPartCtx = secondPartCanvas.getContext('2d');
                firstPartCtx.drawImage(canvas, 0, 0, canvas.width, midHeight, 0, 0, canvas.width, midHeight);
                secondPartCtx.drawImage(canvas, 0, midHeight, canvas.width, height - midHeight, 0, 0, canvas.width, height - midHeight);
                const firstPartSlices = sliceImage(firstPartCanvas);
                const secondPartSlices = sliceImage(secondPartCanvas);
                return [...firstPartSlices, ...secondPartSlices];
            } else {
                return [imgData];
            }
        }
        function takeScreenshots() {
            if (flag == 0) {
                flag = 1;
                $("body").attr("id", "bodyx");
                $(".content-detail").attr("id", "screenshot-area");
                $('#processing-message').text("处理中……");
                location.href = location.href.split("#bodyx")[0] + "#bodyx";
                const pageTitle = document.title;
                html2canvas(document.querySelector("#screenshot-area"), {
                    useCORS: true,
                    logging: true
                }).then(canvas => {
                    const imageArray = sliceImage(canvas);
                    let downloadedCount = 0;
                    const totalImages = imageArray.length;
                    imageArray.forEach((imgData, index) => {
                        const link = document.createElement('a');
                        link.href = imgData;
                        link.download = `${time}-${index + 1}-${pageTitle}.png`;
                        link.click();
                        downloadedCount++;
                        if (downloadedCount === totalImages) {
                            $('#processing-message').text("已完成！");
                        }
                    });
                });
            }
            else {
                alert("已下载！如需重新下载请刷新页面……");
            }
        }
        $(document).on("keyup", function (event) {
            switch (event.key) {
                case "F2":
                    takeScreenshots();
                    break;
            }
        });
        /*——————————————————————————————————————————————————1688详情截图 End——————————————————————————————————————————————————*/
    }
    else if (url.includes("http://testpage.qipeiyigou.com/")) {
        let auto_running = localStorage.getItem("auto_running");
        let today = getCurrentDate();
        let stored_date = localStorage.getItem("date");
        if (today != stored_date) {
            localStorage.clear();
            localStorage.setItem("date", today);
            localStorage.setItem("record", "日期\t姓名\t会员名\t栏目id\t产品id\t栏目名\t产品链接\t原始值\t改后值\t处理状态|@@|");
        }
        //————————————————————————————————————————————————————————————————————————————————获取所有产品栏目id后打开有产品的产品管理页
        if (Number(auto_running)) {
            // 定义一个空数组来存放所有的 ch_id
            let chIds = [];
            // 发起 Ajax 请求来获取 ch_id 数据
            $.ajax({
                url: 'http://testpage.qipeiyigou.com/dom/shops/shop_pro_manage.php?username=qipeiyigouwang&ls_cur=112',
                method: 'GET',
                success: function (response) {
                    // 使用正则表达式来匹配 ch_id
                    let regex = /ch_id=(\d+)/g;
                    let match;
                    // 使用循环不断提取 ch_id 并加入数组
                    while ((match = regex.exec(response)) !== null) {
                        chIds.push(match[1]);  // match[1] 是捕获的第一个 ch_id 值
                    }
                    // 输出所有提取到的 ch_id
                    console.log("提取到的 ch_id 数组为：", chIds);
                    // 在获取到 chIds 之后调用 open_close
                    open_product_list();  // Now that chIds is populated, call open_close
                },
                error: function (xhr, status, error) {
                    console.error("请求失败: " + error);
                }
            });
            function open_product_list() {
                if (url == "http://testpage.qipeiyigou.com/" || url == "http://testpage.qipeiyigou.com/dom/sc_user_center.php?username=qipeiyigouwang") {
                    // 创建一个 Promise 数组
                    let promises = chIds.map(function (id) {
                        return new Promise(function (resolve, reject) {
                            let productUrl = `http://testpage.qipeiyigou.com/dom/sc_product_list.php?username=qipeiyigouwang&ch_id=${id}&ls_cur=112`;
                            // 发起 Ajax 请求
                            $.ajax({
                                url: productUrl,
                                method: 'GET',
                                success: function (response) {
                                    // 检查响应是否包含 "暂无数据"
                                    if (response.indexOf('暂无数据') == -1) {
                                        // 如果没有 "暂无数据"，则打开新窗口
                                        window.open(productUrl, '_blank');
                                    }
                                    resolve();  // 请求完成，执行 resolve
                                },
                                error: function (xhr, status, error) {
                                    console.error('Ajax request failed:', error);
                                    resolve();  // 即使请求失败，也要执行 resolve
                                }
                            });
                        });
                    });
                    // 等待所有 AJAX 请求都完成
                    Promise.all(promises).then(function () {
                        console.log('所有请求已完成，窗口已打开');
                    });
                }
            }
        }
        //组长检查店铺
        if (url.includes("qipeiyigou.com/mshop/") && getAuth(1) == "1") {
            /*——————————————————————————————————————————————————店铺检查专用 Start——————————————————————————————————————————————————*/
            // 添加样式
            let addStyles = () => {
                let style = `
            <style>
                .description a,
                .main .content a,
                .description *[style*="pointer"],
                .main .content *[style*="pointer"],
                .description img:not([src*="aimg8.dlssyht.cn"]),
                .main .content img:not([src*="aimg8.dlssyht.cn"]) {
                    color: white !important;
                    padding-left: 5px !important;
                    background-color: blue !important;
                    border-left: 5px solid red !important;
                }
                .online-kefu {
                    top: calc(50% + 100px) !important;
                }
                #shop-info {
                    display: inline-block;
                    position: absolute;
                    font-size: 16px;
                    height: 42px;
                    line-height: 42px;
                    top: 0;
                    right: 100px;
                    display: none;
                    color: white !important;
                }
                #shop-cat,
                #shop-cert {
                    margin: 9px;
                }
                #shop-cert a {
                    color: white !important;
                }
                #keywordx {
                    color: red;
                    display: inline-block;
                    margin-top: 10px;
                }
                #divx {
                    position: fixed;
                }
                #tipx {
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: white;
                    height: 51px;
                    line-height: 51px;
                    background-color: green;
                    font-size: 20px;
                    width: 700px;
                    margin: 0;
                    text-align: center;
                    border-radius: 0 4px 0 0;
                    display: none;
                }
            </style>
            `;
                $('body').append(style);
            };
            // 显示关键词
            let showKeyword = () => {
                let keyword = $("meta[name=keywords]").attr("content");
                let author = $("meta[name=author]").attr("content");
                if (keyword.includes(author)) {
                    $('#keywordx').text("关键词为空");
                } else {
                    $('#keywordx').text(keyword);
                }
            };
            // 检查商品信息
            let checkProduct = () => {
                let id = 0;
                let tip = "";
                $('#tipx').text("正在检查中……");
                if ($('.main a').length) {
                    id = 1;
                    tip += "存在超链接！";
                }
                if ($('.main *[style*=pointer]').length) {
                    id = 2;
                    tip += "存在非超链接小手！";
                }
                let images = $('.main img');
                for (let i = 0; i < images.length; i++) {
                    let src = images.eq(i).attr('src');
                    if (!src.includes("aimg8.dlssyht.cn")) {
                        id = 3;
                        tip += "存在外链图片！";
                        break;
                    }
                }
                if (id === 0) {
                    tip = "正常！";
                } else {
                    $('#tipx').css('background-color', 'red');
                    alert(tip);
                }
                $('#tipx').text(`检查结果：${tip}`);
            };
            // 获取商铺信息
            let fetchShopInfo = () => {
                let shopId = unsafeWindow.__NUXT__.data["/api/siteData?undefined"]["dev"]["rawdata"]["basic_info"]["shop_info"]["id"];
                GM_xmlhttpRequest({
                    type: "GET",
                    url: `http://admin.qipeiyigou.com/shops/shops_add.php?shops_id=${shopId}`,
                    onload: function (response) {
                        let bigId = response.responseText.match(/big_id.*?>/)[0].match(/(\d+)/)[0];
                        let subId = response.responseText.match(/sub_id".*>/)[0].match(/(\d+)/)[0];
                        let certifiedInfo = "无";
                        if (response.responseText.includes("certified_info")) {
                            certifiedInfo = response.responseText.match(/https:\/\/aimg8.dlssyht.cn\/certified_info.*target/)[0].split("?")[0];
                        }
                        if (certifiedInfo === "无") {
                            $('#shop-cert a').text("无认证资料");
                        } else {
                            $('#shop-cert a').attr('href', certifiedInfo);
                        }
                        // 获取商铺类别
                        GM_xmlhttpRequest({
                            type: "GET",
                            url: `http://testpage.qipeiyigou.com/dom/shops/ajax_get_class.php?big_id=${bigId}&sub_id=${subId}`,
                            onload: function (response) {
                                $('#shop-cat').attr('title', '查询完毕……');
                                let f = response.responseText.split("selected")[1].split("<")[0].replace(">|-", "");
                                let g = response.responseText.split("selected")[2].split("<")[0].replace(">", "");
                                $('#shop-cat').attr('title', `${f}-${g}`);
                            }
                        });
                    }
                });
            };
            // 获取分类信息
            let fetchCategoryInfo = () => {
                let proId = url.split("/item/")[1].split("?")[0];
                let channelId = unsafeWindow.__NUXT__.data["/api/product/item/" + proId + "?undefined"]["data"]["channelId"];
                let channelNameMap = [
                    ["15770577", "发动机系统"],
                    ["16435676", "美容养护"],
                    ["16435678", "电子电器"],
                    ["15770578", "车身及驾驶室"],
                    ["15770579", "汽修工具"],
                    ["19365569", "底盘系统"],
                    ["19366355", "液压系统"],
                    ["19366356", "通用配件"],
                    ["19366357", "新能源"],
                    ["19366358", "车辆饰品"]
                ];
                let channelName = "";
                for (let [id, name] of channelNameMap) {
                    if (channelId == Number(id)) {
                        channelName = name;
                        break;
                    }
                }
                GM_xmlhttpRequest({
                    type: "GET",
                    url: `http://testpage.qipeiyigou.com/dom/sc_product.php?ch_id=${channelId}&id=${proId}`,
                    onload: function (response) {
                        if (response.responseText.includes(title)) {
                            // 获取产品性质和专属车型
                            let productProperties = "";
                            let exclusiveModels = "";
                            let properties = response.responseText.split("产品性质")[1].split("tr")[0].split("checked=");
                            for (let prop of properties) {
                                if (prop.includes("checked")) {
                                    productProperties += prop.match(/[\u4e00-\u9fa5]+/) + "-";
                                }
                            }
                            productProperties = productProperties.slice(0, -1);
                            exclusiveModels = response.responseText.split("专属车型")[1].split('"checked"')[1].split("</label>")[0].match(/[\u4e00-\u9fa5]+/);
                            $('#span3').text(`产品性质：${productProperties}`);
                            $('#span4').text(`专属车型：${exclusiveModels}`);
                            // 获取系统分类id
                            let bigId = response.responseText.split('"big_id"')[2].split('"')[1];
                            let subId = response.responseText.split('"sub_id"')[2].split('"')[1];
                            // 获取系统分类名
                            GM_xmlhttpRequest({
                                type: "GET",
                                url: `http://admin.qipeiyigou.com/Ajax/VT/AjaxGetInfo.php?ch_id=${channelId}&req_method=5&one_cid=${bigId}&two_cid=${subId}`,
                                onload: function (response) {
                                    let dalei = response.responseText.split(`"${bigId}"` + ',"classname":')[1].split(",")[0].split('"')[1];
                                    let xiaolei = response.responseText.split(`"${subId}"` + ',"classname":')[1].split(",")[0].split('"')[1];
                                    $('#span2').text(`系统分类：${channelName}-${dalei}-${xiaolei}`);
                                    $('#span1').text("查询完毕……");
                                }
                            });
                        }
                    }
                });
            };
            // 主体代码
            addStyles();
            let title = '"' + $(".title:first").text() + '"';
            if (url.includes("mshop/?")) {
                $('body').append('<div id="shop-info"><span id="shop-cat">商铺类别</span><span id="shop-cert"><a target="_blank">认证资料</a></span></div>');
                $(document).on('mouseenter', 'body', function () {
                    if (!$('.header-nav #shop-info').length) {
                        let $shopInfo = $('#shop-info');
                        let $headerNav = $('.header-nav');
                        $headerNav.append($shopInfo.detach());
                        $('#shop-info').css('display', 'inline-block');
                    }
                });
                fetchShopInfo();
            } else if (url.includes("product/item/")) {
                let a = `
                    <div id="divx">
                        <span id="span1">查询中……</span><br>
                        <span id="span2">系统分类：</span><br>
                        <span id="span3">产品性质：</span><br>
                        <span id="span4">专属车型：</span><br>
                    </div>
                    <p id="tipx">正在检查中……</p>
                    `;
                $('body').append(a);
                $(document).on('mouseenter', 'body', function () {
                    if (!$('.main .v-x-scroll #tipx').length) {
                        let $checkTip = $('#tipx');
                        let $proDes = $('.main .v-x-scroll');
                        $proDes.append($checkTip.detach());
                        let top = $('.content-wrap').offset().top + 'px';
                        let left = (($('body').width() - 1200) / 2 + 1210) + 'px';
                        $('#divx').css('top', top);
                        $('#divx').css('left', left);
                        $('#tipx').css('display', 'inline-block');
                    }
                });
                $('.title h3').append('<br><p id="keywordx"></p>');
                $('.nav-link').click(() => {
                    $('#divx, #tipx').remove();
                });
                showKeyword();
                checkProduct();
                fetchCategoryInfo();
            }
            /*——————————————————————————————————————————————————店铺检查专用 End——————————————————————————————————————————————————*/
            $(document).on("keyup", function (event) {
                switch (event.key) {
                    case "F2":
                        open_products();
                        break;
                }
            });
        }
        else {
            //————————————————————————————————————————————————————————————————————————————————首页添加导出组件
            if (url == "http://testpage.qipeiyigou.com/") {
                let html = `
                <img src="https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1746954291684901.png" id="toggleImg" />
                <input type="text" id="nameInput" placeholder="请输入姓名" />
                <button id="exportx">导出数据为 TSV</button>
                <style>
                    #toggleImg,
                    #nameInput,
                    #exportx {
                        position: fixed;
                        z-index: 10000;
                        font-size: 16px;
                    }
                    #toggleImg {
                        top: 59px;
                        right: 280px;
                        height: 43px;
                    }
                    #nameInput {
                        top: 59px;
                        right: 155px;
                        width: 100px;
                        height: 37px;
                    }
                    #exportx {
                        top: 59px;
                        right: 20px;
                        height: 43px;
                        padding: 10px 20px;
                    }
                </style>
                `;
                $("body").append(html);
                if (Number(auto_running)) {
                    $("#toggleImg").attr('src', 'https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1746954291684901.png');
                }
                else {
                    $("#toggleImg").attr('src', 'https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1746954290554632.png');
                }
                $("#toggleImg").click(function () {
                    if (Number(auto_running)) {
                        $(this).attr('src', 'https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1746954290554632.png');
                        auto_running = 0;
                    } else {
                        $(this).attr('src', 'https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1746954291684901.png');
                        auto_running = 1;
                    }
                    localStorage.setItem("auto_running", auto_running);
                });
                $("#exportx").click(function () {
                    // 获取输入框中的姓名
                    let personName = $("#nameInput").val().trim();
                    // 如果姓名为空，弹出提示
                    if (!personName) {
                        alert('姓名不能为空！');
                        return;
                    }
                    // 获取存储的表格数据
                    let record = localStorage.getItem('record');
                    if (!record) {
                        alert('没有找到可导出的数据！');
                        return;
                    }
                    let parsedRecord = record.split("|@@|");  // 解析存储的字符串数据为数组
                    if (parsedRecord && parsedRecord.length > 0) {
                        // 将记录转换为 TSV 格式，并替换每条记录中的 xxpersonname 为输入框中的姓名
                        let tsvContent = '';
                        parsedRecord.forEach(function (row) {
                            let updatedRow = row.replace(/xxpersonname/g, personName);  // 替换为输入的姓名
                            tsvContent += updatedRow + '\n';  // 每行以制表符分隔，每行末尾添加换行符
                        });
                        // 创建一个 Blob 对象
                        let blob = new Blob([tsvContent], { type: 'text/tab-separated-values' });
                        // 获取当前日期
                        let today = getCurrentDate().replaceAll("/", "");
                        // 组合文件名为 姓名-yyyymmdd
                        let fileName = `${personName}-${today}.tsv`;
                        // 创建下载链接并触发下载
                        let link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = fileName;  // 使用姓名和日期作为文件名
                        link.click();  // 模拟点击下载
                    } else {
                        alert('没有找到可导出的数据！');
                    }
                });
            }
            //————————————————————————————————————————————————————————————————————————————————退出后自动跳转登录页面
            else if (url == "http://testpage.qipeiyigou.com/vip_qipeiyigouwang.html") {
                location.href = "http://testpage.qipeiyigou.com/dom/denglu.php?username=qipeiyigouwang";
            }
            //————————————————————————————————————————————————————————————————————————————————登录页面自动填充密码
            else if (url == "http://testpage.qipeiyigou.com/dom/denglu.php?username=qipeiyigouwang") {
                $(document).ready(function () {
                    $("#commonPassword").val("111111");
                });
            }
            //————————————————————————————————————————————————————————————————————————————————产品编辑页取消勾选并提交
            else if (url.includes("sc_product.php")) {
                if (Number(auto_running)) {
                    $(document).ready(function () {
                        let time = Number(url.split("#")[1]) * Number(getAuth(4));
                        let a = time;
                        let countdownFinished = false;
                        function updateTitle() {
                            if (a > 0) {
                                $("title").text(a);
                                a--;
                            } else {
                                $("title").text(0);
                                countdownFinished = true;
                                clearInterval(interval_0);
                            }
                        }
                        let interval_0 = setInterval(updateTitle, 1000);
                        let proname = $("#proname").val();
                        let checked_box_num = $("input[type=checkbox]:checked").length;
                        if (proname.includes("库存件")) {
                            generateOriginRecord();
                            generateNewRecord("未处理");
                            window.close();
                        }
                        else {
                            if (checked_box_num == 1) {
                                if ($("input[type=checkbox]:checked").val() == "4") {
                                    let interval_1 = setInterval(function () {
                                        if ($("#sub_id option:selected").length && $("#shop_pro_class_big_id option:selected").length && countdownFinished) {
                                            clearInterval(interval_1);
                                            $("title").text("完成");
                                            generateOriginRecord();
                                            $("input[type=checkbox][value=4]").prop("checked", false);
                                            $("input[type=checkbox][value=2]").prop("checked", true);
                                            generateNewRecord("已处理");
                                            $("#submit_msg a").click();
                                        }
                                    }, 500);
                                }
                                else {
                                    generateOriginRecord();
                                    generateNewRecord("未处理");
                                    window.close();
                                }
                            }
                            else {
                                if ($("input[type=checkbox][value=4]:checked").length) {
                                    let interval_2 = setInterval(function () {
                                        if ($("#sub_id option:selected").length && $("#shop_pro_class_big_id option:selected").length && countdownFinished) {
                                            clearInterval(interval_2);
                                            $("title").text("完成");
                                            generateOriginRecord();
                                            $("input[type=checkbox][value=4]").prop("checked", false);
                                            generateNewRecord("已处理");
                                            $("#submit_msg a").click();
                                        }
                                    }, 500);
                                }
                                else {
                                    generateOriginRecord();
                                    generateNewRecord("未处理");
                                    window.close();
                                }
                            }
                        }
                    });
                }
            }
            //————————————————————————————————————————————————————————————————————————————————自动关闭提交后的产品列表页
            else if (url.includes("sc_product_list.php") && !url.includes("&ls_cur=112") && url.includes("&t=")) {
                if (Number(auto_running)) {
                    window.close();
                }
            }
            $(document).on("keyup", function (event) {
                switch (event.key) {
                    case "Escape":
                        openProductsEdit();
                        break;
                }
            });
        }
    }
    //——————————————————————————————————————————————————主体代码区 End——————————————————————————————————————————————————
})();
/*2025.05.12.080000 - Line : 827*/
