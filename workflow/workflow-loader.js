window.addEventListener('urlSet', () => {
    console.log(window.url);  // 读取并使用主脚本中的 url 变量
});

GM_xmlhttpRequest({
    type: "GET",
    url: `http://admin.qipeiyigou.com/shops/shops_add.php?shops_id=24455853`,
    onload: function (response) {
     
        console.log("来自0loader"+response.responseText);
    }
});
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
                        "https://1024nettech.github.io/workflow/workflow-css.css",
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
        localStorage.setItem("src_all_loaded", "1");
        cc();
    }
    loadNextFile(0);
}
localStorage.setItem("src_all_loaded", "0");
update();
// End-87-2025.05.14.153434
