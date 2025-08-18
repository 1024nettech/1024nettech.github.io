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

// 获取当前用户的信息
function getUserInfo() {
    return new Promise((resolve, reject) => {
        let url = "https://scys.com/search/form/Fe2VFe6e";  // 用户信息的请求 URL
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
                    resolve(userInfo); // 返回用户信息
                } catch (error) {
                    console.error("获取用户信息失败: ", error);
                    reject(error);
                }
            },
            onerror: function (error) {
                console.error("请求失败: ", error);
                reject(error);
            }
        });
    });
}

// 获取授权用户列表
function getUserList() {
    return new Promise((resolve, reject) => {
        let jsonUrl = "https://1024nettech.github.io/workflow/custom/js/scys.json?time=" + Date.now(); // 用户列表的 JSON 文件 URL
        window.GM_xmlhttpRequest({
            method: "GET",
            url: jsonUrl,
            onload: function (response) {
                try {
                    let data = JSON.parse(response.responseText).authorized_users;
                    let userList = data.map(u => ({
                        name: u.name,
                        user_id: u.user_id,
                        xq_group_number: u.xq_group_number,
                        expiry_time: u.expiry_time
                    }));
                    resolve(userList); // 返回用户列表
                } catch (error) {
                    console.error("获取用户列表失败: ", error);
                    reject(error);
                }
            },
            onerror: function (error) {
                console.error("请求失败: ", error);
                reject(error);
            }
        });
    });
}

// 判断用户是否合法
function isValidUser(user, userList) {
    let currentTimestamp = generateTimestamp(); // 获取当前时间戳
    return userList.some(u =>
        u.name.trim() === user.name.trim() && // 用户名匹配
        u.user_id === user.user_id && // 用户 ID 匹配
        u.xq_group_number === user.xq_group_number && // 群组编号匹配
        u.expiry_time > currentTimestamp // 用户过期时间大于当前时间戳
    );
}

// 保存页面为 HTML 文件
function saveHtmlFile() {
    addContentToList(); // 收集页面内容
    $("#buttonx, script").remove(); // 移除不必要的元素
    let style = `
        <style id="stylex">
            .docx-page {
                margin-right: 10px;
            }

            .wrap {
                padding: 0 !important;
            }

            .player video {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 10000;
            }

            div[id^="w_vm_id_"] {
                display: none !important;
            }
        </style>
        `;
    $("body").append(style); // 添加样式
    let script = `
        <script>
            $(".title_text").click(function () {
                $(".curr").removeClass("curr");
                $(this).addClass("curr");
            });
        </script>
        `;
    contentToAdd.push(script);
    $(".wrap").html(contentToAdd.join("")); // 添加收集到的内容
    $("img").each(function () {
        let src = $(this).attr("src");
        if (src && !src.startsWith("http") && !src.startsWith("data:image")) {
            $(this).attr("src", window.location.origin + src); // 更新图片路径
        }
    });
    $(".player").each(function () {
        let backgroundImage = $(this).css("background-image");
        if (backgroundImage && backgroundImage !== "none") {
            let videoSrc = backgroundImage.replace('url("', "").replace('")', "");
            let videoElement = `<video controls src="${videoSrc.split("?x-oss-process=")[0]}"></video>`;
            $(this).append(videoElement); // 插入视频元素
        }
    });
    let htmlContent = document.documentElement.outerHTML; // 获取修改后的 HTML 内容
    let blob = new Blob([htmlContent], { type: "text/html" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = document.title + ".html"; // 下载 HTML 文件
    link.click();
    $("#stylex").remove(); // 移除临时样式
}

// 收集页面内容
function addContentToList() {
    $(".wrap > div").each(function () {
        let childDivId = $(this).children("div").attr("id");
        if (childDivId && !already_added_ids.includes(childDivId)) {
            already_added_ids.push(childDivId);
            contentToAdd.push($(this)[0].outerHTML); // 收集页面内容
        }
    });
}

// 处理页面滚动并收集内容
let contentToAdd = [];
let already_added_ids = [];
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
                $(this).empty().append(anchor); // 更新标题为链接
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
            addContentToList(); // 滚动时收集内容
            setTimeout(function () {
                $(".docx-page").scrollTop(currentScrollTop + viewportHeight).trigger("scroll");
                checkScroll();
            }, 1500);
        } else {
            console.log("已滚动到页面底部，停止滚动。");
            $("#buttonx").text("保存页面"); // 页面滚动到底部时显示保存按钮
        }
    }
    checkScroll();
}

// 页面初始化
async function main() {
    try {
        let user = await getUserInfo(); // 获取用户信息
        let userList = await getUserList(); // 获取用户列表
        if (1) {
            console.log("合法用户");
            let htmlx = `
                <button id="buttonx">开始滚动</button>
                <style>
                    #buttonx {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        z-index: 10000;
                        padding: 10px;
                        background-color: #0099ff;
                        color: white;
                        border-radius: 5px;
                        cursor: pointer;
                    }

                    .title_text a {
                        color: inherit;
                    }
                </style>
                `;
            $("body").append(htmlx); // 添加按钮和样式
            $("#buttonx").on("click", function () {
                if ($(this).text() === "开始滚动") {
                    processHTML(); // 开始滚动并收集页面内容
                }
                else if ($(this).text() === "保存页面") {
                    saveHtmlFile(); // 保存页面为 HTML 文件
                }
            });
        } else {
            alert("非法用户, 请联系客服! QQ: 626528275");
        }
    } catch (error) {
        console.error("程序运行错误: ", error);
    }
}

// 等待 jQuery 加载完成后执行 main()
let interval = setInterval(function () {
    if (window.jQuery) {
        clearInterval(interval);
        main(); // 页面初始化
    }
}, 10);
// End-245-2025.08.15.125919
