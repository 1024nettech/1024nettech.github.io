import * as admin from "./admin.js"
import * as publics from "./public.js"
import * as qipei from "./qipei.js"
import * as ali from "./ali.js"
async function main() {
    const url = location.href;
    const auth = localStorage.getItem("auth"); // 000: 第一位为admin权限,第二位为组长查店铺权限,第三位为截图权限
    const cookie = localStorage.getItem("cookie");
    let autorun = Number(localStorage.getItem("autorun"));
    const stored_day = localStorage.getItem("date");
    const today = publics.generateTimestamp(0);
    if (stored_day !== today) {
        localStorage.setItem("date", today);
        console.log(`${today}新的一天开始了: 开始清除所有数据……`);
        publics.clearExceptAuth();
        await publics.clearAll();
        console.log(`${today}新的一天开始了: 所有数据已清除……\n清除后的数据为……`);
        console.log(localStorage);
    }
    if (url.includes("qipeiyigou.com")) {
        let channelNameMap = await qipei.fetchChIdsAndTitles("http://testpage.qipeiyigou.com/dom/shops/shop_pro_manage.php");
        // admin权限
        if (auth[0] === "1") {
            if (url.includes("design-mode")) {
                // 商铺设计图片模块获取src, 复制到剪贴板
                $(document).on("keyup", function (event) {
                    switch (event.key) {
                        case "F2":
                            admin.get_img_src();
                            break;
                    }
                });
            }
            else {
                // 管理后台功能
                $(document).on("mouseenter", "div[id^='evMo_']", function () {
                    let $this = $(this);
                    $this.attr("title", `宽度: ${$this.css("width")}\n高度: ${$this.css("height")}\n左: ${$this.css("left")}\n上: ${$this.css("top")}`);
                });
                $(document).on("keyup", function (event) {
                    switch (event.key) {
                        case "F2":
                            admin.setPosition();
                            break;
                    }
                });
            }
        }
        // 组长查店铺权限
        if (auth[1] === "1") {
            let urls = ["https://1024nettech.github.io/workflow/workflow-admin.css"];
            publics.loadFiles(urls, 1, 0);
            if (url.includes("mshop/?")) {
                // 店铺首页
                let html = `
                    <div id="shop-info" style="display: none;">
                        <span id="shop-cat">商铺类别</span>
                        <span id="shop-cert">
                            <a target="_blank">认证资料</a>
                        </span>
                    </div>
                    `;
                $("body").append(html);
                let shopId = window.__NUXT__.data["/api/siteData?undefined"]["dev"]["rawdata"]["basic_info"]["shop_info"]["id"];
                publics.sendRequest(`http://admin.qipeiyigou.com/shops/shops_add.php?shops_id=${shopId}`, cookie, "GET", function (response) {
                    let bigId = response.responseText.match(/big_id.*?>/)[0].match(/(\d+)/)[0];
                    let subId = response.responseText.match(/sub_id".*>/)[0].match(/(\d+)/)[0];
                    let certifiedInfo = "无";
                    if (response.responseText.includes("certified_info")) {
                        certifiedInfo = response.responseText.match(/https:\/\/aimg8.dlssyht.cn\/certified_info.*target/)[0].split("?")[0];
                    }
                    if (certifiedInfo === "无") {
                        $("#shop-cert a").text("无认证资料");
                    } else {
                        $("#shop-cert a").attr("href", certifiedInfo);
                    }
                    publics.sendRequest(`http://testpage.qipeiyigou.com/dom/shops/ajax_get_class.php?big_id=${bigId}&sub_id=${subId}`, document.cookie, "GET", function (response) {
                        $("#shop-cat").attr("title", "查询完毕……");
                        let big_shop_class = response.responseText.split("selected")[1].split("<")[0].replace(">|-", "");
                        let sub_shop_class = response.responseText.split("selected")[2].split("<")[0].replace(">", "");
                        $("#shop-cat").attr("title", `${big_shop_class}-${sub_shop_class}`);
                    });
                });
                $(document).on("mouseenter", "body", function () {
                    if (!$(".header-nav #shop-info").length) {
                        publics.moveElement("#shop-info", ".header-nav");
                    }
                });
            }
            else if (url.includes("mshop/product/item")) {
                // 店铺产品详情页
                let html = `
                    <div id="divx">
                        <span id="span1">查询中……</span><br>
                        <span id="span2">系统分类: </span><br>
                        <span id="span3">产品性质: </span><br>
                        <span id="span4">专属车型: </span><br>
                    </div>
                    <p id="tipx" style="display: none;">正在检查中……</p>
                    `;
                $("body").append(html);
                $(".title h3").append(`<br><p id="keywordx"></p>`);
                $(".nav-link").click(() => {
                    $("#divx, #tipx").remove();
                });
                qipei.showKeyword();
                qipei.checkProduct();
                let author = "-" + $(`meta[name="author"]`).attr("content");
                let proname = $("title").text().split(author)[0];
                let proId = url.split("/item/")[1].split("?")[0];
                let channelId = window.__NUXT__.data[`/api/product/item/${proId}?undefined`]["data"]["channelId"];
                let channelName = channelNameMap[channelId];
                let req_url = `http://testpage.qipeiyigou.com/dom/sc_product.php?ch_id=${channelId}&id=${proId}`;
                publics.sendRequest(req_url, document.cookie, "GET", function (response) {
                    let productName = "";
                    let regex = /<input[^>]+name="proname"[^>]+value="([^"]+)"/;
                    let match = response.responseText.match(regex);
                    if (match && match[1]) {
                        productName = match[1];
                        console.log("提取的产品名称: " + productName);
                    } else {
                        console.log("未找到产品名称");
                    }
                    if (proname === productName) {
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
                        exclusiveModels = response.responseText.split("专属车型")[1].split(`"checked"`)[1].split("</label>")[0].match(/[\u4e00-\u9fa5]+/);
                        $("#span3").text(`产品性质: ${productProperties}`);
                        $("#span4").text(`专属车型: ${exclusiveModels}`);
                        // 获取系统分类id
                        let bigId = response.responseText.split(`"big_id"`)[2].split(`"`)[1];
                        let subId = response.responseText.split(`"sub_id"`)[2].split(`"`)[1];
                        // 获取系统分类名
                        req_url = `http://admin.qipeiyigou.com/Ajax/VT/AjaxGetInfo.php?ch_id=${channelId}&req_method=5&one_cid=${bigId}&two_cid=${subId}`;
                        publics.sendRequest(req_url, cookie, "GET", function (response) {
                            let one_class = response.responseText.split(`"${bigId}","classname":`)[1].split(",")[0].split(`"`)[1];
                            let two_class = response.responseText.split(`"${subId}","classname":`)[1].split(",")[0].split(`"`)[1];
                            $("#span2").text(`系统分类: ${channelName}-${one_class}-${two_class}`);
                            $("#span1").text("查询完毕……");
                        });
                    }
                });
                $(document).on("mouseenter", "body", function () {
                    if (!$(".main .v-x-scroll #tipx").length) {
                        publics.moveElement("#tipx", ".main .v-x-scroll");
                        let top = $(".content-wrap").offset().top + "px";
                        let left = (($("body").width() - 1200) / 2 + 1210) + "px";
                        $("#divx").css("top", top);
                        $("#divx").css("left", left);
                    }
                });
            }
            $(document).on("keyup", function (event) {
                switch (event.key) {
                    case "F2":
                        qipei.open_close_shop_products();
                        break;
                }
            });
        }
        // 公共权限
        $("a:contains(退出)").mousedown(() => {
            if (autorun) {
                let usernames = localStorage.getItem("usernames").split(" ");
                usernames.shift();
                localStorage.setItem("usernames", usernames.join(" "));
                localStorage.setItem("rightpassword", "");
            }
        });
        //登录页自动填充密码
        if (url.includes("denglu.php")) {
            function queryUserId(username, cookie, doSuccess) {
                let url = "http://admin.qipeiyigou.com/member_list.php";
                let formData = {
                    "search_identity_id": 0,
                    "search_type": 0,
                    "member_name": username,
                    "start_time": "",
                    "end_time": "",
                    "is_serach": 1
                };
                publics.sendRequest(url, cookie, "POST", function (response) {
                    let userIdMatch = response.responseText.match(/编号：(\d+)/);
                    let userId = userIdMatch ? userIdMatch[1] : null;
                    console.log("成功获取到 UserID: ", userId);
                    if (userId) {
                        queryPassword(userId, cookie, doSuccess);
                    } else {
                        console.error("响应中没有找到 UserID");
                        $("#commonPassword").attr("placeholder", "请检查用户名是否正确……");
                    }
                }, formData);
            }
            function queryPassword(userId, cookie, doSuccess) {
                let url = `http://admin.qipeiyigou.com/member_manage_detail.php?id=${userId}`;
                publics.sendRequest(url, cookie, "GET", function (response) {
                    let passwordMatch = response.responseText.match(/value="([^"]+)"/);
                    let password = passwordMatch ? passwordMatch[1] : null;
                    console.log("成功获取到密码: ", password);
                    if (password) {
                        doSuccess(password);
                    } else {
                        console.error("响应中没有找到密码");
                    }
                });
            }
            let rightpassword = localStorage.getItem("rightpassword");
            if (!rightpassword) { $("#commonPassword").val("111111"); }
            else { $("#commonPassword").val(rightpassword); }
            setTimeout(() => { $("#commonPassword").focus(); }, 100);
            setTimeout(() => { $("#commonYzm").focus(); }, 200);
            $(".web-user-pass i").click(() => {
                let username = $("#commonName").val().trim();
                $("#commonPassword").val("");
                $("#commonPassword").attr("placeholder", "查询中……");
                if (rightpassword) {
                    $("#commonPassword").val(rightpassword);
                    setTimeout(() => { $("#commonYzm").focus(); }, 200);
                    $(".web-login .item-list i").css("background-image", "url(https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1747535858129383.png)");
                }
                else {
                    queryUserId(username, cookie, function (password) {
                        console.log("最终获取到的密码: ", password);
                        $("#commonName").val(username);
                        $("#commonPassword").val(password);
                        localStorage.setItem("rightpassword", password);
                        setTimeout(() => { $("#commonYzm").focus(); }, 200);
                        $(".web-login .item-list i").css("background-image", "url(https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1747535858129383.png)");
                    });
                }
            });
        }
        // 获取所有产品栏目id后打开有产品的产品管理页
        if (autorun) {
            await qipei.open_channel_product_list(Object.keys(channelNameMap));
        }
        // 首页和登录页面添加导出组件
        if (url === "http://testpage.qipeiyigou.com/" || url.includes("denglu.php")) {
            qipei.export_tsc();
        }
        // 退出后自动跳转登录页
        else if (url === "http://testpage.qipeiyigou.com/vip_qipeiyigouwang.html") {
            location.href = "http://testpage.qipeiyigou.com/dom/denglu.php?username=qipeiyigouwang";
        }
        // 栏目产品管理列表页Esc打开编辑产品
        else if (url.includes("sc_product_list.php")) {
            $(document).on("keyup", function (event) {
                switch (event.key) {
                    case "Escape":
                        qipei.openProductsEdit();
                        break;
                }
            });
        }
        // 产品编辑页自动取消勾选并提交
        else if (url.includes("sc_product.php")) {
            if (autorun) {
                window.alert = function () { };
                let proname = $("#proname").val();
                let checked_box_num = $("input[type=checkbox]:checked").length;
                if (proname.includes("库存件")) {
                    await qipei.handleProductAction(0, "未处理");
                }
                else {
                    if (checked_box_num === 1) {
                        if ($("input[type=checkbox][value=4]:checked").length) {
                            await qipei.handleProductAction(1, "已处理");
                        }
                        else {
                            await qipei.handleProductAction(0, "未处理");
                        }
                    }
                    else {
                        if ($("input[type=checkbox][value=4]:checked").length) {
                            await qipei.handleProductAction(0, "已处理");
                        }
                        else {
                            await qipei.handleProductAction(0, "未处理");
                        }
                    }
                }
            }
        }
    }
    else if (url.includes("https://detail.1688.com/offer/") && auth[2] === "1") {
        let html = `
        <button id="modex">多图模式</button>
        <button id="processing-message">已准备...</button>
        `;
        $("body").append(html);
        let storedmode = localStorage.getItem("screenshotMode");
        if (storedmode) {
            $("#modex").text(storedmode);
        }
        // 点击切换模式
        $("#modex").click(() => {
            if ($("#modex").text() === "多图模式") {
                $("#modex").text("单图模式");
                localStorage.setItem("screenshotMode", "单图模式");
            } else {
                $("#modex").text("多图模式");
                localStorage.setItem("screenshotMode", "多图模式");
            }
        });
        $(document).on("mouseleave", "body", function () {
            ali.img_rename();
        });
        $(document).on("keyup", function (event) {
            switch (event.key) {
                case "F2":
                    publics.takeScreenshots(".content-detail");
                    break;
            }
        });
    }
}
let interval = setInterval(function () {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        clearInterval(interval);
        main();
        console.log("来自workflow-main.js输出: DOM 已加载完成, main()函数已执行");
    } else {
        console.log("来自workflow-main.js输出: DOM 还未加载");
    }
}, 10);
// End-334-2025.05.21.130518
