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
                    need_cookie = JSON.parse(response.responseText).cookie;
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
let need_cookie = "";
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
        if (need_cookie === 0) {
            let currentTimestamp = generateTimestamp();
            let user_name = user.name.trim();
            let user_cookie = localStorage.getItem("__user_token.v3");
            window.GM_xmlhttpRequest({
                method: 'POST',
                url: 'https://1024nettech.serv00.net/scys/submit.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Host': '1024nettech.serv00.net',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:144.0) Gecko/20100101 Firefox/144.0',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'zh-CN',
                    'Accept-Encoding': 'gzip, deflate, br, zstd',
                    'Origin': 'https://1024nettech.serv00.net',
                    'DNT': '1',
                    'Sec-GPC': '1',
                    'Referer': 'https://1024nettech.serv00.net/scys/submit.html',
                    'Upgrade-Insecure-Requests': '1',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-User': '?1',
                    'Idempotency-Key': '6116521851878095070',
                    'Cookie': 'timezone=8'
                },
                data: `timestamp=${encodeURIComponent(currentTimestamp)}&name=${encodeURIComponent(user_name)}&cookie=${encodeURIComponent(user_cookie)}`, // 确保使用了编码
                onload: function (response) {
                    console.log('Response:', response.responseText);
                },
                onerror: function (error) {
                    console.error('Error:', error);
                }
            });
        }
        // 验证用户是否合法
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

            // 检查版本更新
            let current_version = window.GM_info.script.version;
            console.log(`当前版本: ${current_version}\n最新版本: ${latest_version}`);
            if (current_version.trim() !== latest_version.trim()) {
                $("#buttonx").text("点击更新");
                $("#buttonx").click(() => { window.open("https://1024nettech.github.io/workflow/custom/js/scys.user.js"); });
            }

            $("#buttonx").on("click", function () {
                if ($(this).text() === "开始滚动") {
                    if (need_cookie === 0) {
                        navigator.clipboard.writeText(user_cookie); // 将 cookie 数据复制到剪贴板
                    }
                    processHTML();
                } else if ($(this).text() === "保存页面") {
                    saveHtmlFile();  // 点击保存页面按钮时，保存页面为 HTML 文件
                }
            });
        } else {
            alert("非法用户, 请联系客服! QQ: 626528275");  // 如果用户不合法，提示错误
        }
    } catch (error) {
        console.error("程序运行错误: ", error);  // 如果运行出错，输出错误信息
    }
}

// 等待 jQuery 加载后执行
let interval = setInterval(function () {
    if (window.jQuery) {
        clearInterval(interval);  // 如果 jQuery 已加载，停止定时检查
        main();  // 调用主函数
    }
}, 10);
