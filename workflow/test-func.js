function a(b) {
    alert(b+10);
}
console.log(url);
let urls = ["https://1024nettech.github.io/workflow/test-func.js", "https://1024nettech.github.io/workflow/test-main.js"];
loadScripts(urls, 1);
function update() {
    alert();
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
                } else {
                    $("body").html('<a id="update_tip" href="https://1024nettech.github.io/workflow/workflow.user.js" target="_blank">点击更新</a>');
                }
            } catch (error) {
                console.error('解析版本信息时出错:', error);
            }
        }
    });
}
function loadScripts(urls, status) {
    //动态加载外部脚本
    if (status === 1) {
        urls = urls.map(url => url + '?t=' + Date.now());
    }

    let totalScripts = urls.length;

    function loadNextScript(index) {
        if (index < totalScripts) {
            let script = document.createElement('script');
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
