
// 要请求的 URL (可以更改为你需要请求的接口)
const url = 'https://1024nettech.github.io/workflow/custom/js/scys.json';

// 发起 GET 请求
window.GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: function (response) {
        try {
            // 解析返回的 JSON 数据
            const jsonResponse = JSON.parse(response.responseText);

            // 输出解析后的 JSON 内容
            console.log('响应数据:', jsonResponse);

            // 你可以访问返回的对象属性，比如：
            console.log('标题:', jsonResponse.title);
            console.log('是否完成:', jsonResponse.completed);
        } catch (error) {
            console.error('JSON 解析错误:', error);
        }
    },
    onerror: function (error) {
        console.error('请求失败:', error);
    }
});


// 创建并添加 #htmlx 元素和保存按钮到页面 body 中
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
// 将 #htmlx 和保存按钮添加到页面中
$("body").append(htmlx);
// 为保存按钮绑定点击事件
$("#buttonx").on('click', function () {

    // 获取视口的高度
    const viewportHeight = $(window).height();

    // 当前滚动位置
    let currentScrollTop = 0;

    // 处理 HTML 内容
    function processHTML() {
        // 获取当前滚动位置和可滚动区域的总高度
        currentScrollTop = $('.docx-page').scrollTop();
        const scrollHeight = $('.docx-page')[0].scrollHeight; // 获取滚动区域总高度

        // 判断是否已滚动到底部
        if (currentScrollTop + viewportHeight < scrollHeight) {
            // 1. 进行 HTML 处理
            $(".wrap > div").each(function () {
                let divHtml = $(this).html();
                if (!$("#htmlx").html().includes(divHtml)) {
                    let clonedDiv = $(this).clone();
                    $("#htmlx").append(clonedDiv);
                }
            });

            // 2. 延迟 2 秒后继续滚动
            setTimeout(function () {
                // 3. 滚动页面，滚动高度为视口高度
                $('.docx-page').scrollTop(currentScrollTop + viewportHeight).trigger('scroll');
                processHTML(); // 继续处理 HTML
            }, 2000); // 延迟 2 秒
        } else {
            console.log("已滚动到页面底部，停止滚动。");
            saveHtmlFile();
            return;
        }
    }

    // 启动处理
    processHTML();
});
// 下载页面为 HTML 文件
function saveHtmlFile() {
    // 将 .wrap 元素的 HTML 内容替换为 #htmlx 中的内容
    $(".wrap").html($("#htmlx").html());
    // 移除 #htmlx、保存按钮和 script 标签
    $("#htmlx, #buttonx, script").remove();
    // 添加样式调整
    let style = `
<style id="stylex">
    .wrap {
        padding: 0 !important;
    }

    .docx-page {
        margin-right: 10px;
    }

    div[id^="#w_vm_id_"] {
        display: none !important
    }
</style>
            `;
    $("body").append(style);

    // 获取整个文档的 HTML 内容
    let htmlContent = document.documentElement.outerHTML;
    // 创建一个 Blob 对象用于下载页面内容
    let blob = new Blob([htmlContent], { type: 'text/html' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = document.title + ".html";  // 使用文档标题作为下载的文件名
    link.click();

    $("#stylex").remove();
}
