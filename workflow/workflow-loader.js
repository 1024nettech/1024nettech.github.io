function sendRequest(url, cookie, method, doSuccess, formData = null) {
    // 发送请求
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
                console.error("Request failed with status: " + response.status);
            }
        },
        onerror: function (error) {
            console.error("Request failed:", error);
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
                    console.error(`CSS 加载失败: ${url}，错误信息: `, error);
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
        console.log("所有文件加载完成！");
    }
    loadNextFile(0);
}
function waitForElementOrCookie(selector, callback, interval = 100, maxAttempts = 100) {
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
window.alert = function () { };
const autorun = localStorage.getItem("autorun");
if (url.includes("sc_product_list.php") && url.includes("&t=")) {
    if (autorun) {
        window.close();
    }
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
                let fetchShopInfo = () => {
                    let shopId = unsafeWindow.__NUXT__.data["/api/siteData?undefined"]["dev"]["rawdata"]["basic_info"]["shop_info"]["id"];
                    sendRequest(`http://admin.qipeiyigou.com/shops/shops_add.php?shops_id=${shopId}`, cookie, "GET", function (response) {
                        let bigId = response.responseText.match(/big_id.*?>/)[0].match(/(\d+)/)[0];
                        let subId = response.responseText.match(/sub_id".*>/)[0].match(/(\d+)/)[0];
                        let certifiedInfo = "无";
                        if (response.responseText.includes("certified_info")) {
                            certifiedInfo = response.responseText.match(/https:\/\/aimg8.dlssyht.cn\/certified_info.*target/)[0].split("?")[0];
                        }
                        waitForElementOrCookie("#shop-info", function () {
                            if (certifiedInfo === "无") {
                                $("#shop-cert a").text("无认证资料");
                            } else {
                                $("#shop-cert a").attr("href", certifiedInfo);
                            }
                        });
                        sendRequest(`http://testpage.qipeiyigou.com/dom/shops/ajax_get_class.php?big_id=${bigId}&sub_id=${subId}`, document.cookie, "GET", function (response) {
                            waitForElementOrCookie("#shop-info", function () {
                                $("#shop-cat").attr("title", "查询完毕……");
                                let big_shop_class = response.responseText.split("selected")[1].split("<")[0].replace(">|-", "");
                                let sub_shop_class = response.responseText.split("selected")[2].split("<")[0].replace(">", "");
                                $("#shop-cat").attr("title", `${big_shop_class}-${sub_shop_class}`);
                            });
                        });
                    });
                };
                fetchShopInfo();
            }
            else if (url.includes("mshop/product/item")) {
                // 产品详情页
                let channelNameMap = {};
                function fetchChannelNameMap() {
                    sendRequest("http://testpage.qipeiyigou.com/dom/shops/shop_pro_manage.php?username=qipeiyigouwang&ls_cur=112", document.cookie, "GET", function (response) {
                        let match = response.responseText.match(/ch_id=(\d+)[^>]*><span class="p-tit">([^<]+)<\/span>/g);
                        if (match) {
                            match.forEach(item => {
                                let id = item.match(/ch_id=(\d+)/)[1];
                                let name = item.match(/<span class="p-tit">([^<]+)<\/span>/)[1];
                                channelNameMap[id] = name;
                            });
                        }
                        console.log("channelNameMap: ", channelNameMap);
                        fetchProductInfo(proId, channelId, title);
                    });
                }
                function fetchProductInfo(proId, channelId, title) {
                    sendRequest(`http://testpage.qipeiyigou.com/dom/sc_product.php?ch_id=${channelId}&id=${proId}`, document.cookie, "GET", function (response) {
                        if (response.responseText.includes(title)) {
                            let productProperties = extractProductProperties(response.responseText);
                            let exclusiveModels = extractExclusiveModels(response.responseText);
                            waitForElementOrCookie("#divx", function () {
                                $("#span3").text(`产品性质：${productProperties}`);
                                $("#span4").text(`专属车型：${exclusiveModels}`);
                            });
                            let { bigId, subId } = extractSystemCategories(response.responseText);
                            fetchSystemCategoryInfo(channelId, bigId, subId, title);
                        }
                    });
                }
                function extractProductProperties(responseText) {
                    let productProperties = "";
                    let properties = responseText.split("产品性质")[1].split("tr")[0].split("checked=");
                    for (let prop of properties) {
                        if (prop.includes("checked")) {
                            productProperties += prop.match(/[\u4e00-\u9fa5]+/) + "-";
                        }
                    }
                    return productProperties.slice(0, -1);
                }
                function extractExclusiveModels(responseText) {
                    return responseText.split("专属车型")[1].split(`"checked"`)[1].split("</label>")[0].match(/[\u4e00-\u9fa5]+/);
                }
                function extractSystemCategories(responseText) {
                    let bigId = responseText.split(`"big_id"`)[2].split(`"`)[1];
                    let subId = responseText.split(`"sub_id"`)[2].split(`"`)[1];
                    return { bigId, subId };
                }
                function fetchSystemCategoryInfo(channelId, bigId, subId, title) {
                    waitForElementOrCookie("cookie", function () {
                        sendRequest(`http://admin.qipeiyigou.com/Ajax/VT/AjaxGetInfo.php?ch_id=${channelId}&req_method=5&one_cid=${bigId}&two_cid=${subId}`, cookie, "GET", function (response) {
                             console.log(response.responseText);
                            let dalei = extractCategoryName(response.responseText, bigId);
                           
                            let xiaolei = extractCategoryName(response.responseText, subId);
                            waitForElementOrCookie("#divx", function () {
                                $("#span2").text(`系统分类：${channelNameMap[channelId]}-${dalei}-${xiaolei}`);
                                $("#span1").text("查询完毕……");
                            });
                        });
                    });
                }
                function extractCategoryName(responseText, id) {
                    return responseText.split(`"${id}", "classname":`)[1].split(",")[0].split(`"`)[1];
                }
                let title = `"` + $(".title:first").text() + `"`;
                let proId = url.split("/item/")[1].split("?")[0];
                let channelId = unsafeWindow.__NUXT__.data["/api/product/item/" + proId + "?undefined"]["data"]["channelId"];
                fetchChannelNameMap();
            }
        }
        if (url.includes("denglu.php")) {
            function queryUserId(username, cookie, doSuccess) {
                let url = "http://admin.qipeiyigou.com/member_list.php?channel_id=0&is_frame=2";
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
                let url = `http://admin.qipeiyigou.com/member_manage_detail.php?id=${userId}&is_frame=2&dom_id=18`;
                sendRequest(url, cookie, "GET", function (response) {
                    let passwordMatch = response.responseText.match(/value="([^"]+)"/);
                    let password = passwordMatch ? passwordMatch[1] : null;
                    console.log("成功获取到密码:", password);
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
// End-306-2025.05.19.114500
