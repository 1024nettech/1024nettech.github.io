fetchShopInfo();
function update() {
    //脚本更新
    let version_url = `https://1024nettech.github.io/workflow/version.json?t=${Date.now()}`;
    GM_xmlhttpRequest({
        type: "GET",
        url: version_url,
        onload: function (response) {
            try {
                let versionData = JSON.parse(response.responseText.trim());
                let userJsVersion = versionData["workflow.user.js"];
                if (userJsVersion == GM_info.script.version) {
                    console.log(`workflow.user.js已是最新版本: ${GM_info.script.version}\n${version_url}`);
                    let urls = [
                        "https://1024nettech.github.io/workflow/workflow-func.js",
                        "https://1024nettech.github.io/workflow/workflow-main.js",
                        "https://1024nettech.github.io/workflow/workflow-css.css"
                    ];
                    loadFiles(urls, 1);
                } else {
                    $("body").html(`<a id="update_tip" href="https://1024nettech.github.io/workflow/workflow.user.js" target="_blank">点击更新</a>`);
                }
            } catch (error) {
                console.error("解析版本信息时出错:", error);
            }
        }
    });
}
function loadFiles(urls, status) {
    // 动态加载外部文件(JS/CSS)
    if (status == 1) {
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
                script.onload = function () {
                    console.log(`脚本加载完成：${url}`);
                    loadedFiles++;
                    if (loadedFiles === totalFiles) {
                        onFilesLoaded();
                    }
                    loadNextFile(index + 1);
                };
                script.onerror = function (error) {
                    console.error(`脚本加载失败：${url}，错误信息：`, error);
                    loadNextFile(index + 1);
                };
                console.log(`开始加载脚本：${url}`);
                document.head.append(script);
            } else if (fileExtension === "css") {
                let link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = url;
                link.onload = function () {
                    console.log(`CSS 加载完成：${url}`);
                    loadedFiles++;
                    if (loadedFiles === totalFiles) {
                        onFilesLoaded();
                    }
                    loadNextFile(index + 1);
                };
                link.onerror = function (error) {
                    console.error(`CSS 加载失败：${url}，错误信息：`, error);
                    loadNextFile(index + 1);
                };
                console.log(`开始加载 CSS：${url}`);
                document.head.append(link);
            } else {
                console.error(`无法识别的文件类型：${url}`);
                loadNextFile(index + 1);
            }
        }
    }
    function onFilesLoaded() {
        console.log("所有文件加载完成！");
        let checkAuthInterval = setInterval(function () {
            let auth = localStorage.getItem("auth");
            if (auth !== null) {
                clearInterval(checkAuthInterval);
                fetchShopInfo();
            }
        }, 100);
    }
    loadNextFile(0);
}
update();
// End-92-2025.05.14.125730
function fetchShopInfo() {
    // 获取商铺信息
    let shopId = unsafeWindow.__NUXT__.data["/api/siteData?undefined"]["dev"]["rawdata"]["basic_info"]["shop_info"]["id"];
    GM_xmlhttpRequest({
        type: "GET",
        url: `http://admin.qipeiyigou.com/shops/shops_add.php?shops_id=${shopId}`,
        onload: function (response) {
            console.log(response.responseText);
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
            $.ajax({
                type: "GET",
                url: `http://testpage.qipeiyigou.com/dom/shops/ajax_get_class.php?big_id=${bigId}&sub_id=${subId}`,
                success: function (response) {
                    $('#shop-cat').attr('title', '查询完毕……');

                    // 解析 response 获取相应数据
                    let f = response.split("selected")[1].split("<")[0].replace(">|-", "");
                    let g = response.split("selected")[2].split("<")[0].replace(">", "");

                    // 更新标题
                    $('#shop-cat').attr('title', `${f}-${g}`);
                },
                error: function (xhr, status, error) {
                    console.error("请求失败: ", status, error);
                }
            });
        }
    });
};
