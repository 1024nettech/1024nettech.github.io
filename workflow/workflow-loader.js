import * as publics from "./public.js"
const url = location.href;
const autorun = Number(localStorage.getItem("autorun"));
if (autorun) {
    if (url === "http://testpage.qipeiyigou.com/dom/action/sc_product.php?username=qipeiyigouwang" || (url.includes("sc_product_list.php") && url.includes("&t="))) {
        window.close();
    }
}
function loadSucess(response) {
    // 加载成功后do
    let versionData = publics.parseJson(response.responseText);
    let userJsVersion = versionData["workflow.user.js"];
    let cookie = versionData["cookie"];
    localStorage.setItem("cookie", cookie);
    if (userJsVersion === window.GM_info.script.version) {
        console.log(`workflow.user.js 已是最新版本: ${GM_info.script.version}\n${version_url}`);
        let urls = ["https://1024nettech.github.io/workflow/workflow-main.js", "https://1024nettech.github.io/workflow/workflow-public.css"];
        publics.loadFiles(urls, 1, 1);
        if (location.href.includes("1688.com")) {
            urls = ["https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0-beta.2/jquery.min.js", "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"];
            publics.loadFiles(urls, 0, 0);
        }
    } else {
        $("body").html(`<a id="update_tip" href="https://1024nettech.github.io/workflow/workflow.user.js" target="_blank">点击更新</a>`);
    }
}
function update() {
    // 脚本更新
    publics.sendRequest(version_url, "", "GET", loadSucess);
}
let version_url = `https://1024nettech.github.io/workflow/version.json?t=${Date.now()}`;
update();
// End-33-2025.05.20.151039
