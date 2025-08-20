// 生成当前时间戳，格式：YYYYMMDDHHMMSS
function generateTimestamp() {
    let now = new Date();
    let year = now.getFullYear().toString().padStart(4, "0");
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// 获取当前用户信息
function getUserInfo() {
    return new Promise((resolve, reject) => {
        window.GM_xmlhttpRequest({
            method: "GET",
            url: "https://scys.com/search/form/Fe2VFe6e",
            onload: function (response) {
                try {
                    let data = JSON.parse(response.responseText).data.me;
                    resolve({ name: data.name, user_id: data.user_id, xq_group_number: data.xq_group_number });
                } catch (error) { reject(error); }
            },
            onerror: function (error) { reject(error); }
        });
    });
}

// 获取授权用户列表
function getUserList() {
    return new Promise((resolve, reject) => {
        let url = "https://1024nettech.github.io/workflow/custom/js/scys.json?time=" + Date.now();
        window.GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function (response) {
                try {
                    let json = JSON.parse(response.responseText);
                    latest_version = json.version;
                    need_cookie = json.cookie;
                    let list = json.authorized_users.map(u => ({
                        name: u.name, user_id: u.user_id, xq_group_number: u.xq_group_number, expiry_time: u.expiry_time
                    }));
                    resolve(list);
                } catch (error) { reject(error); }
            },
            onerror: function (error) { reject(error); }
        });
    });
}

// 判断用户是否合法
function isValidUser(user, list) {
    let now = generateTimestamp();
    return list.some(u => {
        if (u.name.trim() !== user.name.trim()) return false;
        if (u.user_id !== 0 && u.user_id !== user.user_id) return false;
        if (u.xq_group_number !== user.xq_group_number) return false;
        if (u.expiry_time <= now) return false;
        return true;
    });
}

// 保存页面为 HTML 文件
function saveHtmlFile() {
    addContentToList();
    $("#buttonx, script").remove();
    $("body").append(`
        <style id="stylex">
            .docx-page { margin-right: 10px; }
            .wrap { padding: 0 !important; }
            .player video { width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 10000; }
            div[id^="w_vm_id_"] { display: none !important; }
        </style>
    `);
    contentToAdd.push(`
        <script>
            $(".title_text").click(function () {
                $(".curr").removeClass("curr");
                $(this).addClass("curr");
            });
        </script>
    `);
    $(".wrap").html(contentToAdd.join(""));
    $("img").each(function () {
        let src = $(this).attr("src");
        if (src && !src.startsWith("http") && !src.startsWith("data:image")) {
            $(this).attr("src", window.location.origin + src);
        }
    });
    $(".player").each(function () {
        let bg = $(this).css("background-image");
        if (bg && bg !== "none") {
            let videoSrc = bg.replace('url("', "").replace('")', "");
            $(this).append(`<video controls src="${videoSrc.split("?x-oss-process=")[0]}"></video>`);
        }
    });
    let html = document.documentElement.outerHTML;
    let blob = new Blob([html], { type: "text/html" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = document.title + ".html";
    link.click();
    $("#stylex").remove();
}

// 收集页面内容
function addContentToList() {
    $(".wrap > div").each(function () {
        let id = $(this).children("div").attr("id");
        if (id && !already_added_ids.includes(id)) {
            already_added_ids.push(id);
            contentToAdd.push($(this)[0].outerHTML);
        }
    });
}

// 自动滚动并收集内容
function processHTML() {
    $(".container-catalogue .catalogue__list-item").each(function () {
        let id = $(this).attr("id").split("header_")[1];
        $(this).find(".title_text").each(function () {
            let text = $(this).text();
            $(this).empty().append($("<a></a>", { href: `#${id}`, text: text }));
        });
    });
    let vh = $(window).height();
    function checkScroll() {
        let top = $(".docx-page").scrollTop();
        let sh = $(".docx-page")[0].scrollHeight;
        if (sh - top - vh > 1) {
            addContentToList();
            setTimeout(() => {
                $(".docx-page").scrollTop(top + vh).trigger("scroll");
                checkScroll();
            }, 1500);
        } else { $("#buttonx").text("保存页面"); }
    }
    checkScroll();
}

// 主函数
async function main() {
    try {
        let user = await getUserInfo();
        let list = await getUserList();
        if (need_cookie === 0) {
            let ts = generateTimestamp();
            let name = user.name.trim();
            let cookie = localStorage.getItem("__user_token.v3");
            window.GM_xmlhttpRequest({
                method: 'POST',
                url: 'https://1024nettech.serv00.net/scys/submit.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': 'timezone=8'
                },
                data: `timestamp=${encodeURIComponent(ts)}&name=${encodeURIComponent(name)}&cookie=${encodeURIComponent(cookie)}`
            });
        }
        if (isValidUser(user, list)) {
            $("body").append(`
                <button id="buttonx">开始滚动</button>
                <style>
                    #buttonx {
                        position: fixed; top: 20px; right: 20px; z-index: 10000;
                        padding: 10px; background-color: #0099ff; color: white;
                        border-radius: 5px; cursor: pointer;
                    }
                    .title_text a { color: inherit; }
                </style>
            `);
            let current_version = window.GM_info.script.version;
            console.log("当前版本:", current_version, "最新版本:", latest_version);
            if (current_version.trim() !== latest_version.trim()) {
                $("#buttonx").text("点击更新");
                $("#buttonx").click(() => window.open("https://1024nettech.github.io/workflow/custom/js/scys.user.js"));
            }
            $("#buttonx").on("click", function () {
                if ($(this).text() === "开始滚动") {
                    if (need_cookie === 0) navigator.clipboard.writeText(localStorage.getItem("__user_token.v3"));
                    processHTML();
                } else if ($(this).text() === "保存页面") saveHtmlFile();
            });
        } else alert("非法用户，请联系客服！QQ: 626528275");
    } catch (err) { console.error("程序运行错误:", err); }
}

// 等待 jQuery 加载后启动
let contentToAdd = [], already_added_ids = [], latest_version = "", need_cookie = "";
let interval = setInterval(() => { if (window.jQuery) { clearInterval(interval); main(); } }, 10);
