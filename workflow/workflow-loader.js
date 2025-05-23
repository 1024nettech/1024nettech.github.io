import * as publics from "./public.js"
const url = location.href;
const autorun = Number(localStorage.getItem("autorun"));
if (autorun) {
    window.alert = function () { };
    if (url === "http://testpage.qipeiyigou.com/dom/action/sc_product.php?username=qipeiyigouwang" || (url.includes("sc_product_list.php") && url.includes("&t="))) {
        window.close();
    }
}
async function loadSucess(response) {
    // 加载成功后do
    let versionData = publics.parseJson(response.responseText);
    let userJsVersion = versionData["workflow.user.js"];
    if (userJsVersion === window.GM_info.script.version) {
        console.log(`workflow.user.js 已是最新版本: ${GM_info.script.version}\n${version_url}`);
        let urls1 = ["https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js"];
        await publics.loadFiles(urls1, 0, 0);
        let urls0 = ["https://1024nettech.github.io/workflow/workflow-main.js", "https://1024nettech.github.io/workflow/workflow-public.css"];
        setTimeout(() => { publics.loadFiles(urls0, 1, 1); }, 1000);
        // let urls0 = ["https://1024nettech.github.io/workflow/workflow-main.js", "https://1024nettech.github.io/workflow/workflow-public.css"];
        // await publics.loadFiles(urls0, 0, 1);
        if (location.href.includes("1688.com")) {
            let urls2 = ["https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0-beta.2/jquery.min.js", "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"];
            await publics.loadFiles(urls2, 0, 0);
        }
        if (url.includes("qipeiyigou.com")) {
            let cookie = localStorage.getItem("cookie");
            if (!cookie) {
                let encodedCookie = prompt("请输入Key: ");
                localStorage.setItem("cookie", encodedCookie);
            }
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
// End-41-2025.05.23.145243
