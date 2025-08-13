function main() {
    let url = "https://1024nettech.github.io/workflow/custom/js/scys.json?time=" + Date.now();
    window.GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function (response) {
            try {
                let jsonResponse = JSON.parse(response.responseText);
                console.log("响应数据: ", jsonResponse);
                let auth = jsonResponse.auth;
                console.log("已授权: ", auth);
                let isValidUser = false;
                auth.forEach(item => {
                    if (document.body.innerHTML.includes(item)) {
                        isValidUser = true;
                    }
                });
                if (isValidUser) {
                    console.log("合法用户");
                    let htmlx = `
                        <div id="htmlx"></div>
                        <button id="scrollx">开始滚动</button>
                        <button id="buttonx">保存页面</button>
                        <style>
                            #htmlx { display: none; }
                            #scrollx,#buttonx {
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
                            #buttonx{top:60px;}
                            .title_text a { color: inherit; }
                        </style>
                    `;
                    $("body").append(htmlx);
                    $("#scrollx").on("click", function () {
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
                        function processHTML() {
                            currentScrollTop = $(".docx-page").scrollTop();
                            let scrollHeight = $(".docx-page")[0].scrollHeight;
                            let remainingScroll = scrollHeight - currentScrollTop - viewportHeight;
                            // 如果页面底部还有足够的内容（有未处理的部分），继续滚动
                            if (remainingScroll > 1) {  // 这里设置为1避免过于精确，可以根据需要调整
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
                                }, 1500); // 延迟滚动
                            } else {
                                console.log("已滚动到页面底部，停止滚动。");
                            }
                        }
                        processHTML(); // 启动 HTML 处理
                    });
                    $("#buttonx").on("click", function () {
                        $(".wrap > div").each(function () {
                            let divHtml = $(this).html();
                            if (!$("#htmlx").html().includes(divHtml)) {
                                let clonedDiv = $(this).clone();
                                $("#htmlx").append(clonedDiv);
                            }
                        }); saveHtmlFile();
                    });
                    function saveHtmlFile() {
                        $("img").each(function () {
                            let src = $(this).attr("src");
                            if (src && !src.startsWith("http")) {
                                $(this).attr("src", window.location.origin + src);
                            }
                        });
                        $(".player").each(function () {
                            let backgroundImage = $(this).css("background-image");
                            if (backgroundImage && backgroundImage !== "none") {
                                let videoSrc = backgroundImage.replace('url("', '').replace('")', '');
                                let videoElement = `<video controls src="${videoSrc.split("?x-oss-process=")[0]}"></video>`;
                                $(this).append(videoElement);
                            }
                        });
                        $(".wrap").html($("#htmlx").html());
                        $("#htmlx, #scrollx, script").remove();
                        let style = `
                            <style id="stylex">
                                .wrap { padding: 0 !important; }
                                .docx-page { margin-right: 10px; }
                                div[id^="w_vm_id_"] { display: none !important; }
                                .player video {
                                    width: 100%;
                                    height: 100%;
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    z-index: 10000;
                                }
                            </style>
                        `;
                        $("body").append(style);
                        let htmlContent = document.documentElement.outerHTML;
                        let blob = new Blob([htmlContent], { type: "text/html" });
                        let link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = document.title + ".html";
                        link.click();
                        $("#stylex").remove();
                    }
                } else {
                    alert("非法用户, 请联系客服! QQ: 626528275");
                }
            } catch (error) {
                console.error("JSON 解析错误:", error);
            }
        },
        onerror: function (error) {
            console.error("请求失败:", error);
        }
    });
}
let interval = setInterval(function () {
    if (window.jQuery) {
        clearInterval(interval);
        main();
    }
}, 10);
// End-140-2025.08.13.172544
