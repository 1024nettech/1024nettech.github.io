function main() {
    // 请求的 URL，包含时间戳防止缓存
    let url = "https://1024nettech.github.io/workflow/custom/js/scys.json?time=" + Date.now();
    // 发起 GET 请求
    window.GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function (response) {
            try {
                // 解析返回的 JSON 数据
                let jsonResponse = JSON.parse(response.responseText);
                console.log("响应数据: ", jsonResponse);
                // 获取 JSON 中的 auth 字段（假设它是一个数组）
                let auth = jsonResponse.auth;
                console.log("已授权: ", auth);
                let isValidUser = false; // 标记是否为合法用户
                // 遍历 auth 数组，检查每个元素是否在页面中
                auth.forEach(item => {
                    if (document.body.innerHTML.includes(item)) {
                        isValidUser = true; // 找到合法用户
                    }
                });
                // 判断用户是否合法
                if (isValidUser) {
                    console.log("合法用户");
                    // 创建并添加 #htmlx 元素和保存按钮到页面中
                    let htmlx = `
                        <div id="htmlx"></div>
                        <button id="buttonx">保存页面</button>
                        <style>
                            #htmlx {
                                display: none;
                            }
                            #buttonx {
                                position: fixed;
                                top: 20px;
                                right: 20px;
                                z-index: 9999;
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
                    $("body").append(htmlx);
                    // 为保存按钮绑定点击事件
                    $("#buttonx").on("click", function () {
                        // 遍历 .container-catalogue 中的每个 .catalogue__list-item 元素
                        $(".container-catalogue .catalogue__list-item").each(function () {
                            let listItemId = $(this).attr("id").split("header_")[1]; // 获取当前 li 的 id
                            let titleTextElements = $(this).find(".title_text"); // 获取所有 .title_text 元素
                            if (titleTextElements.length) {
                                titleTextElements.each(function () {
                                    let titleText = $(this).text(); // 获取每个 .title_text 的文本
                                    let anchor = $("<a></a>", {
                                        href: `#${listItemId}`,  // 设置锚点链接
                                        text: titleText  // 设置文本
                                    });
                                    $(this).empty().append(anchor); // 用新创建的 <a> 标签替换原有内容
                                });
                            }
                        });
                        // 获取视口高度
                        let viewportHeight = $(window).height();
                        let currentScrollTop = 0; // 当前滚动位置
                        // 处理 HTML 内容的函数
                        function processHTML() {
                            currentScrollTop = $(".docx-page").scrollTop();
                            let scrollHeight = $(".docx-page")[0].scrollHeight; // 获取滚动区域总高度
                            if (currentScrollTop + viewportHeight < scrollHeight) {
                                $(".wrap > div").each(function () {
                                    let divHtml = $(this).html();
                                    if (!$("#htmlx").html().includes(divHtml)) {
                                        let clonedDiv = $(this).clone();
                                        $("#htmlx").append(clonedDiv);
                                    }
                                });
                                setTimeout(function () {
                                    $(".docx-page").scrollTop(currentScrollTop + viewportHeight).trigger("scroll");
                                    processHTML(); // 继续处理 HTML
                                }, 2000); // 延迟 2 秒后继续滚动
                            } else {
                                console.log("已滚动到页面底部，停止滚动。");








                                saveHtmlFile(); // 停止滚动并保存 HTML 文件
                                return;
                            }
                        }
                        // 启动 HTML 处理
                        processHTML();
                    });
                    // 下载页面为 HTML 文件的函数
                    function saveHtmlFile() {
                        // 处理页面中的所有图片：相对链接转换为绝对链接
                        $("img").each(function () {
                            let src = $(this).attr("src");
                            if (src && !src.startsWith("http")) {
                                $(this).attr("src", window.location.origin + src); // 将相对链接转为绝对链接
                            }
                        });

                        // 处理所有 .player 元素：将背景图片作为视频源，创建视频元素
                        $(".player").each(function () {
                            let backgroundImage = $(this).css("background-image");
                            if (backgroundImage && backgroundImage !== "none") {
                                let videoSrc = backgroundImage.replace('url("', '').replace('")', ''); // 获取背景图片的 URL
                                let videoElement = `<video controls src="${videoSrc.split("?x-oss-process=")[0]}"></video>`;
                                $(this).append(videoElement); // 将视频元素添加到 .player 元素中
                            }
                        });


                        $(".wrap").html($("#htmlx").html()); // 将 .wrap 的 HTML 替换为 #htmlx 的内容
                        $("#htmlx, #buttonx, script").remove(); // 移除临时元素和脚本
                        let style = `
                            <style id="stylex">
                                .wrap {
                                    padding: 0 !important;
                                }
                                .docx-page {
                                    margin-right: 10px;
                                }
                                div[id^="w_vm_id_"] {
                                    display: none !important
                                }
                                    .player video{
                                    width: 100%;
                                    height: 100%;
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    z-index:10000;
                                    }
                            </style>
                            `;
                        $("body").append(style);
                        let htmlContent = document.documentElement.outerHTML; // 获取整个文档的 HTML 内容
                        let blob = new Blob([htmlContent], { type: "text/html" }); // 创建 Blob 对象
                        let link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = document.title + ".html"; // 使用文档标题作为文件名
                        link.click();
                        $("#stylex").remove(); // 移除样式
                    }
                } else {
                    alert("非法用户, 请联系客服! QQ: 626528275"); // 非法用户提示
                }
            } catch (error) {
                console.error("JSON 解析错误:", error); // 解析错误
            }
        },
        onerror: function (error) {
            console.error("请求失败:", error); // 请求失败
        }
    });
}
// 等待 jQuery 加载完成后执行 main 函数
let interval = setInterval(function () {
    if (window.jQuery) {
        clearInterval(interval);
        main(); // 执行 main 函数
    }
}, 10);
