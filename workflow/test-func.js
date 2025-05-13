function a(b) {
    alert(b+1);
}
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
                } else {
                    $("body").html('<a id="update_tip" href="https://1024nettech.github.io/workflow/workflow.user.js" target="_blank">点击更新</a>');
                }
            } catch (error) {
                console.error('解析版本信息时出错:', error);
            }
        }
    });
}
