function sendRequest(url, cookie, method, doSuccess, formData = null) {
    // 发送请求, formData为{k:v}键值对
    let options = {
        method: method,
        url: url,
        headers: {
            "Cookie": cookie
        },
        onload: function (response) {
            if (response.status === 200) {
                doSuccess(response);
            } else {
                console.error("请求失败, 状态码: " + response.status);
            }
        },
        onerror: function (error) {
            console.error("请求发生错误: ", error);
        }
    };
    if (method.toUpperCase() === "POST" && formData) {
        options.headers["Content-Type"] = "application/x-www-form-urlencoded";
        let urlEncodedData = new URLSearchParams(formData).toString();
        options.data = urlEncodedData;
    }
    GM_xmlhttpRequest(options);
}
function loadSucess(response) {
    // 加载成功后do
    let versionData = JSON.parse(response.responseText.trim());
    let userJsVersion = versionData["workflow.user.js"];
    cookie = versionData["cookie"];
    if (userJsVersion === GM_info.script.version) {
        console.log(`workflow.user.js 已是最新版本: ${GM_info.script.version}\n${version_url}`);
        let urls = ["https://1024nettech.github.io/workflow/workflow-main.js", "https://1024nettech.github.io/workflow/workflow-public.css"];
        loadFiles(urls, 1, 1);
        if (location.href.includes("1688.com")) {
            urls = ["https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0-beta.2/jquery.min.js", "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"];
            loadFiles(urls, 0, 0);
        }
    } else {
        $("body").html(`<a id="update_tip" href="https://1024nettech.github.io/workflow/workflow.user.js" target="_blank">点击更新</a>`);
    }
}
function loadFiles(urls, status, isModule = false) {
    // 动态加载外部文件(JS/CSS)
    if (status === 1) {
        urls = urls.map(url => url + "?t=" + Date.now());
    }
    let totalFiles = urls.length;
    let loadedFiles = 0;
    function loadNextFile(index) {
        if (index < totalFiles) {
            let url = urls[index];
            let fileExtension = url.split(".").pop().split("?")[0].toLowerCase();
            if (fileExtension === "js") {
                let script = document.createElement("script");
                script.src = url;
                script.type = isModule ? "module" : "text/javascript";
                script.onload = function () {
                    console.log(`脚本加载完成: ${url}`);
                    loadedFiles++;
                    if (loadedFiles === totalFiles) {
                        onFilesLoaded();
                    }
                    loadNextFile(index + 1);
                };
                script.onerror = function (error) {
                    console.error(`脚本加载失败: ${url}，错误信息: `, error);
                    loadNextFile(index + 1);
                };
                console.log(`开始加载脚本: ${url}`);
                document.head.append(script);
            } else if (fileExtension === "css") {
                let link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = url;
                link.onload = function () {
                    console.log(`CSS 加载完成: ${url}`);
                    loadedFiles++;
                    if (loadedFiles === totalFiles) {
                        onFilesLoaded();
                    }
                    loadNextFile(index + 1);
                };
                link.onerror = function (error) {
                    console.error(`CSS 加载失败: ${url}, 错误信息: `, error);
                    loadNextFile(index + 1);
                };
                console.log(`开始加载 CSS: ${url}`);
                document.head.append(link);
            } else {
                console.error(`无法识别的文件类型: ${url}`);
                loadNextFile(index + 1);
            }
        }
    }
    function onFilesLoaded() {
        console.log("所有文件加载完成!");
    }
    loadNextFile(0);
}
function waitForElementOrCookie(selector, callback, interval = 100, maxAttempts = 1000) {
    // 等待元素或cookie存在后执行
    let attempts = 0;
    let intervalId = setInterval(function () {
        attempts++;
        if (selector === "cookie") {
            if (cookie !== "") {
                callback();
                clearInterval(intervalId);
            }
        } else {
            if ($(selector).length > 0) {
                callback();
                clearInterval(intervalId);
            }
        }
        if (attempts >= maxAttempts) {
            clearInterval(intervalId);
            if (selector === "cookie") {
                console.warn(`Cookie not set after ${maxAttempts} attempts.`);
            } else {
                console.warn(`Element ${selector} not found after ${maxAttempts} attempts.`);
            }
        }
    }, interval);
}
function update() {
    // 脚本更新
    sendRequest(version_url, "", "GET", loadSucess);
}
let version_url = `https://1024nettech.github.io/workflow/version.json?t=${Date.now()}`;
update();
const url = location.href;
let cookie = "";
const autorun = Number(localStorage.getItem("autorun"));
if (url === "http://testpage.qipeiyigou.com/dom/action/sc_product.php?username=qipeiyigouwang" && autorun) {
    window.close();
}
document.addEventListener("DOMContentLoaded", function () {
    main();
});
function main() {
    const auth = localStorage.getItem("auth"); // 000: 第一位为admin权限,第二位为组长查店铺权限,第三位为截图权限
    console.log(`workflow-loader.js 输出的auth: ${auth}`);
    if (url.includes("qipeiyigou.com")) {
        if (auth[1] === "1") {
            let urls = ["https://1024nettech.github.io/workflow/workflow-admin.css"];
            loadFiles(urls, 1, 0);
            if (url.includes("mshop/?")) {
                // 店铺首页
                waitForElementOrCookie("#shop-info", function () {
                    let shopId = unsafeWindow.__NUXT__.data["/api/siteData?undefined"]["dev"]["rawdata"]["basic_info"]["shop_info"]["id"];
                    sendRequest(`http://admin.qipeiyigou.com/shops/shops_add.php?shops_id=${shopId}`, cookie, "GET", function (response) {
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
                        sendRequest(`http://testpage.qipeiyigou.com/dom/shops/ajax_get_class.php?big_id=${bigId}&sub_id=${subId}`, document.cookie, "GET", function (response) {
                            $("#shop-cat").attr("title", "查询完毕……");
                            let big_shop_class = response.responseText.split("selected")[1].split("<")[0].replace(">|-", "");
                            let sub_shop_class = response.responseText.split("selected")[2].split("<")[0].replace(">", "");
                            $("#shop-cat").attr("title", `${big_shop_class}-${sub_shop_class}`);
                        });
                    });
                });
            }
            else if (url.includes("product/item/")) {
                // 获取分类信息
                waitForElementOrCookie("#divx", function () {
                    let title = `"${$(".title:first").text()}"`;
                    let proId = url.split("/item/")[1].split("?")[0];
                    let channelId = unsafeWindow.__NUXT__.data[`/api/product/item/${proId}?undefined`]["data"]["channelId"];
                    let channelNameMap = {
                        "15770577": "发动机系统",
                        "15770578": "车身及驾驶室",
                        "15770579": "汽修工具",
                        "16435676": "美容养护",
                        "16435678": "电子电器",
                        "19365569": "底盘系统",
                        "19366355": "液压系统",
                        "19366356": "通用配件",
                        "19366357": "新能源",
                        "19366358": "车辆饰品"
                    };
                    let channelName = channelNameMap[channelId];
                    let req_url = `http://testpage.qipeiyigou.com/dom/sc_product.php?ch_id=${channelId}&id=${proId}`;
                    sendRequest(req_url, document.cookie, "GET", function (response) {
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
                            exclusiveModels = response.responseText.split("专属车型")[1].split(`"checked"`)[1].split("</label>")[0].match(/[\u4e00-\u9fa5]+/);
                            $("#span3").text(`产品性质：${productProperties}`);
                            $("#span4").text(`专属车型：${exclusiveModels}`);
                            // 获取系统分类id
                            let bigId = response.responseText.split(`"big_id"`)[2].split(`"`)[1];
                            let subId = response.responseText.split(`"sub_id"`)[2].split(`"`)[1];
                            // 获取系统分类名
                            req_url = `http://admin.qipeiyigou.com/Ajax/VT/AjaxGetInfo.php?ch_id=${channelId}&req_method=5&one_cid=${bigId}&two_cid=${subId}`;
                            sendRequest(req_url, document.cookie, "GET", function (response) {
                                let one_class = response.responseText.split(`"${bigId}","classname":`)[1].split(",")[0].split(`"`)[1];
                                let two_class = response.responseText.split(`"${subId}","classname":`)[1].split(",")[0].split(`"`)[1];
                                $("#span2").text(`系统分类：${channelName}-${one_class}-${two_class}`);
                                $("#span1").text("查询完毕……");
                            });
                        }
                    });
                });
            }
        }
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
                sendRequest(url, cookie, "POST", function (response) {
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
                sendRequest(url, cookie, "GET", function (response) {
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
            $("#commonPassword").val("111111");
            $(".web-user-pass i").click(() => {
                waitForElementOrCookie("cookie", () => {
                    let username = $("#commonName").val().trim();
                    $("#commonPassword").val("");
                    $("#commonPassword").attr("placeholder", "查询中……");
                    queryUserId(username, cookie, function (password) {
                        console.log("最终获取到的密码:", password);
                        $("#commonName").val(username);
                        $("#commonPassword").val(password);
                        $(".web-login .item-list i").css("background-image", "url(https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1747535858129383.png)");
                    });
                });
            });
        }
    }
}
// End-279-2025.05.19.210425
