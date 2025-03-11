function addTimestampToUrl(url) {
    return url + '?v=' + new Date().getTime();
}
function loadScripts(urls) {
    const totalScripts = urls.length;
    function loadNextScript(index) {
        if (index < totalScripts) {
            const script = document.createElement('script');
            script.src = addTimestampToUrl(urls[index]);
            script.onload = function () {
                console.log(`脚本加载完成：${urls[index]}`);
                loadNextScript(index + 1);  // 加载下一个脚本
            };
            script.onerror = function (error) {
                console.error('脚本加载失败：', error);
            };
            console.log(`开始加载脚本：${urls[index]}`);
            document.head.prepend(script);
        }
    }
    loadNextScript(0);  // 开始加载第一个脚本
}
const scriptUrls = [
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0-beta.2/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
];
const url = location.href;
if (url.indexOf("https://detail.1688.com/offer/") != -1) {
    loadScripts(scriptUrls);
    /*——————————————————————————————————————————————————1688图片重命名——————————————————————————————————————————————————*/
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
    /*——————————————————————————————————————————————————1688图片重命名——————————————————————————————————————————————————*/
    /*——————————————————————————————————————————————————1688详情截图——————————————————————————————————————————————————*/
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
    /*——————————————————————————————————————————————————1688详情截图——————————————————————————————————————————————————*/
}
else if (url.indexOf("qipeiyigou.com/mshop/") != -1 && localStorage.getItem("check_auth") == "1") {
    /*——————————————————————————————————————————————————店铺检查专用——————————————————————————————————————————————————*/
    // 添加样式
    const addStyles = () => {
        const style = `
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
    const showKeyword = () => {
        const keyword = $("meta[name=keywords]").attr("content");
        const author = $("meta[name=author]").attr("content");
        if (keyword.includes(author)) {
            $('#keywordx').text("关键词为空");
        } else {
            $('#keywordx').text(keyword);
        }
    };
    // 检查商品信息
    const checkProduct = () => {
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
        const images = $('.main img');
        for (let i = 0; i < images.length; i++) {
            const src = images.eq(i).attr('src');
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
    const fetchShopInfo = () => {
        const shopId = unsafeWindow.__NUXT__.data["/api/siteData?undefined"]["dev"]["rawdata"]["basic_info"]["shop_info"]["id"];
        GM_xmlhttpRequest({
            type: "GET",
            url: `http://admin.qipeiyigou.com/shops/shops_add.php?shops_id=${shopId}`,
            headers: {
                "Content-Type": "text/html;charset=gbk",
            },
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
                    headers: {
                        "Content-Type": "text/html;charset=gbk",
                    },
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
    const fetchCategoryInfo = () => {
        const proId = url.split("/item/")[1].split("?")[0];
        const channelId = unsafeWindow.__NUXT__.data["/api/product/item/" + proId + "?undefined"]["data"]["channelId"];
        const channelNameMap = [
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
        for (const [id, name] of channelNameMap) {
            if (channelId == Number(id)) {
                channelName = name;
                break;
            }
        }
        GM_xmlhttpRequest({
            type: "GET",
            url: `http://testpage.qipeiyigou.com/dom/sc_product.php?ch_id=${channelId}&id=${proId}`,
            headers: {
                "Content-Type": "text/html;charset=gbk",
            },
            onload: function (response) {
                if (response.responseText.includes(title)) {
                    // 获取产品性质和专属车型
                    let productProperties = "";
                    let exclusiveModels = "";
                    const properties = response.responseText.split("产品性质")[1].split("tr")[0].split("checked=");
                    for (const prop of properties) {
                        if (prop.includes("checked")) {
                            productProperties += prop.match(/[\u4e00-\u9fa5]+/) + "-";
                        }
                    }
                    productProperties = productProperties.slice(0, -1);
                    exclusiveModels = response.responseText.split("专属车型")[1].split('"checked"')[1].split("</label>")[0].match(/[\u4e00-\u9fa5]+/);
                    $('#span3').text(`产品性质：${productProperties}`);
                    $('#span4').text(`专属车型：${exclusiveModels}`);
                    // 获取系统分类id
                    const bigId = response.responseText.split('"big_id"')[2].split('"')[1];
                    const subId = response.responseText.split('"sub_id"')[2].split('"')[1];
                    // 获取系统分类名
                    GM_xmlhttpRequest({
                        type: "GET",
                        url: `http://admin.qipeiyigou.com/Ajax/VT/AjaxGetInfo.php?ch_id=${channelId}&req_method=5&one_cid=${bigId}&two_cid=${subId}`,
                        headers: {
                            "Content-Type": "text/html;charset=gbk",
                        },
                        onload: function (response) {
                            const dalei = response.responseText.split(`"${bigId}"` + ',"classname":')[1].split(",")[0].split('"')[1];
                            const xiaolei = response.responseText.split(`"${subId}"` + ',"classname":')[1].split(",")[0].split('"')[1];
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
    const title = '"' + $(".title:first").text() + '"';
    if (url.includes("mshop/?")) {
        $('body').append('<div id="shop-info"><span id="shop-cat">商铺类别</span><span id="shop-cert"><a target="_blank">认证资料</a></span></div>');
        $(document).on('mouseenter', 'body', function () {
            if (!$('.header-nav #shop-info').length) {
                const $shopInfo = $('#shop-info');
                const $headerNav = $('.header-nav');
                $headerNav.append($shopInfo.detach());
                $('#shop-info').css('display', 'inline-block');
            }
        });
        fetchShopInfo();
    } else if (url.includes("product/item/")) {
        const a = `
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
                const $checkTip = $('#tipx');
                const $proDes = $('.main .v-x-scroll');
                $proDes.append($checkTip.detach());
                const top = $('.content-wrap').offset().top + 'px';
                const left = (($('body').width() - 1200) / 2 + 1210) + 'px';
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
    /*——————————————————————————————————————————————————店铺检查专用——————————————————————————————————————————————————*/
}
