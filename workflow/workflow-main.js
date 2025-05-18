import * as admin from "./admin.js"
import * as publics from "./public.js"
import * as qipei from "./qipei.js"
import * as ali from "./ali.js"
async function main() {
    const url = location.href;
    const auth = localStorage.getItem("auth"); // 000: 第一位为admin权限,第二位为组长查店铺权限,第三位为截图权限
    console.log(`workflow-main.js输出的auth: ${auth}`);
    let autorun = Number(localStorage.getItem("autorun"));
    let stored_day = localStorage.getItem("date");
    const record = ["日期\t姓名\t会员名\t栏目id\t产品id\t栏目名\t产品链接\t原始值\t改后值\t处理状态"];
    const today = publics.generateTimestamp(0);
    if (stored_day !== today) {
        localStorage.setItem("date", today);
        console.log("开始清除所有数据……");
        publics.clearExceptAuth();
        await publics.clearAll();
        console.log("所有数据已清除……");
        await publics.setAndLog("record", record);
    }
    if (url.includes("qipeiyigou.com")) {
        // admin权限
        if (auth[0] === "1") {
            if (url.includes("admin.qipeiyigou.com")) { }
        }
        // 组长查店铺权限
        if (auth[1] === "1") {
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
                        <span id="span2">系统分类：</span><br>
                        <span id="span3">产品性质：</span><br>
                        <span id="span4">专属车型：</span><br>
                    </div>
                    <p id="tipx" style="display: none;">正在检查中……</p>
                    `;
                $("body").append(html);
                $(".title h3").append(`<br><p id="keywordx"></p>`);
                $(".nav-link").click(() => {
                    $("#divx, #tipx").remove();
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
                        open_close_shop_products();
                        break;
                }
            });
        }
        // 公共权限
        // 获取所有产品栏目id后打开有产品的产品管理页
        if (autorun) {
            let chIds = [];
            $.ajax({
                url: "http://testpage.qipeiyigou.com/dom/shops/shop_pro_manage.php?username=qipeiyigouwang&ls_cur=112",
                method: "GET",
                success: function (response) {
                    let regex = /ch_id=(\d+)/g;
                    let match;
                    while ((match = regex.exec(response)) !== null) {
                        chIds.push(match[1]);
                    }
                    console.log("提取到的 ch_id 数组为：", chIds);
                    qipei.open_channel_product_list();
                },
                error: function (xhr, status, error) {
                    console.error("请求失败: " + error);
                }
            });
        }
        // 首页添加导出组件
        if (url == "http://testpage.qipeiyigou.com/") {
            qipei.export_tsc();
        }
        // 退出后自动跳转登录页
        else if (url == "http://testpage.qipeiyigou.com/vip_qipeiyigouwang.html") {
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
                $("#submit_msg").css("display", "none");
                let proname = $("#proname").val();
                let checked_box_num = $("input[type=checkbox]:checked").length;
                if (proname.includes("库存件")) {
                    nodo();
                }
                else {
                    if (checked_box_num == 1) {
                        if ($("input[type=checkbox][value=4]:checked").length) {
                            yesdo(1);
                        }
                        else {
                            nodo();
                        }
                    }
                    else {
                        if ($("input[type=checkbox][value=4]:checked").length) {
                            yesdo(0);
                        }
                        else {
                            nodo();
                        }
                    }
                }
            }
        }
        // 自动关闭提交后的栏目产品列表页
        else if (url.includes("sc_product_list.php") && url.includes("&t=")) {
            if (autorun) {
                window.close();
            }
        }
    }
    else if (url.includes("https://detail.1688.com/offer/") && auth[2] == "1") {
        let html = `
        <button id="modex">多图模式</button>
        <button id="processing-message">已准备...</button>
        `;
        $("body").append(html);
        let storedmode = localStorage.getItem("screenshotMode");
        // 设置初始模式
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
document.addEventListener("DOMContentLoaded", function () {
    main();
});
// End-190-2025.05.18.173734
