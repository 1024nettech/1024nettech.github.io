/*——————————————————————————————Public Start——————————————————————————————*/
GM_xmlhttpRequest({
    type: "GET",
    url: `http://admin.qipeiyigou.com/shops/shops_add.php?shops_id=24455853`,
    onload: function (response) {
        console.log("来自func"+response.responseText);
    }
});
alert();
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
function loadScripts(urls, status) {
    //动态加载外部脚本
    if (status == 1) {
        urls = urls.map(url => url + '?t=' + Date.now());
    }

    let totalScripts = urls.length;

    function loadNextScript(index) {
        if (index < totalScripts) {
            let script = document.createElement('script');
            script.src = urls[index];

            script.onload = function () {
                console.log(`脚本加载完成：${urls[index]}`);
                loadNextScript(index + 1);
            };

            script.onerror = function (error) {
                console.error('脚本加载失败：', error);
            };

            console.log(`开始加载脚本：${urls[index]}`);
            document.head.append(script);
        }
    }

    loadNextScript(0);
}
function getAuth(position) {
    //获取操作权限
    return auth.charAt(position - 1);
}
function generateTimestamp(format) {
    //获取时间戳
    const now = new Date();
    const year = now.getFullYear().toString().padStart(4, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    if (format == 1) {
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }
    else if (format == 0) {
        return `${year}/${month}/${day}`;
    }
}
/*——————————————————————————————Public End——————————————————————————————*/
/*——————————————————————————————汽配易购 Start——————————————————————————————*/
function openProductsEdit(status) {
    //Esc打开产品栏目管理列表
    if (status) {
        if (url.includes("sc_product_list.php") && !url.includes("&t=")) {
            $('a').filter(function () {
                return $(this).text().trim() == '编辑';
            }).each(function (index) {
                let newHref = $(this).attr('href');
                window.open(newHref, '_blank');
            });
            if ($(".page-next").length) {
                location.href = $(".page-next").attr("href");
            } else {
                window.close();
            }
        }
    }
};
function getCheckedLabels() {
    // 获取所有选中产品性质的父元素文本:产品发布页
    let labelsText = Array.from(document.querySelectorAll('input[name="properties[]"]:checked'))
        .map(checkbox => checkbox.closest('label').textContent.trim())
        .join(', ');
    console.log(labelsText);
    return labelsText;
}
function generateOriginRecord() {
    //获取修改产品性质前的原始记录:产品发布页
    let today = getCurrentDate();
    let person = "xxpersonname";
    let username = $(".welcome").text().trim().replace("欢迎您：", "");
    // 使用 URLSearchParams 提取查询参数
    let urlParams = new URLSearchParams(new URL(url).search);
    // 获取 'ch_id' 和 'id' 的值
    let ch_id = urlParams.get('ch_id');
    let id = urlParams.get('id');
    let ch_name = $(".myColumnTit").text();
    let origin_labels = getCheckedLabels();
    let product_link = "http://testpage.qipeiyigou.com/qipeiyigouwang/products/" + id + ".html";
    let origin_record = `${today}\t${person}\t${username}\t${ch_id}\t${id}\t${ch_name}\t${product_link}\t${origin_labels}\t`;
    let stored_record = localStorage.getItem("record");
    localStorage.setItem("record", stored_record + origin_record);
}
function generateNewRecord(status) {
    //获取修改产品性质后的最新记录:产品发布页
    let new_labels = getCheckedLabels() + "\t" + status + "|@@|";
    let stored_record = localStorage.getItem("record");
    localStorage.setItem("record", stored_record + new_labels);
}
function open_shop_products() {
    //店铺内打开或关闭产品
    if (!location.href.includes("mshop/product/item")) {
        $(".list .image").each(function () {
            window.open($(this).attr("href"));
        });
    } else if (location.href.includes("mshop/product/item")) {
        window.close();
    }
}

/*——————————————————————————————汽配易购 End——————————————————————————————*/
/*——————————————————————————————1688 Start——————————————————————————————*/
function img_rename() {
    // 主图修改：修改 .detail-gallery-img 的图片 alt 和 src 后缀
    document.querySelectorAll('.detail-gallery-img:not(.video-icon + .detail-gallery-img)').forEach((img, index) => {
        img.alt = `主图-${index + 1}`;
        // 只在 src 中不包含 #1024down 时修改
        if (!img.src.includes('#1024down')) {
            img.src = img.src + '#1024down-' + img.alt; // 追加到 src 的末尾，并把 alt 值加到 #1024down 后面
        }
    });
    // 规格图修改：修改 .sku-item-image 的 div 背景图片并添加隐藏 img 子元素
    $('.prop-img,.single-sku-img-pop').addClass('sku-item-image');
    document.querySelectorAll('.sku-item-image').forEach((skuItem, index) => {
        // 检查是否已经存在 img 子元素且 src 中已包含 #1024down
        const existingImg = skuItem.querySelector('img');
        if (!existingImg || !existingImg.src.includes('#1024down')) {
            const bgUrl = window.getComputedStyle(skuItem).backgroundImage.slice(5, -2);
            const img = document.createElement('img');
            img.alt = `规格图-${index + 1}`;
            img.src = bgUrl + '#1024down-' + img.alt; // 追加到 src 的末尾，并把 alt 值加到 #1024down 后面
            img.style.display = 'none';
            skuItem.appendChild(img);
        }
    });
    // 详情图修改：修改 .content-detail 内部图片的 alt 和 src 后缀
    document.querySelectorAll('.content-detail img').forEach((img, index) => {
        img.alt = `详情图-${index + 1}`;
        // 如果 img 有 data-lazyload-src 属性，则将其值赋给 src
        if (img.hasAttribute('data-lazyload-src')) {
            img.src = img.getAttribute('data-lazyload-src');
        }
        // 只在 src 中不包含 #1024down 时修改
        if (!img.src.includes('#1024down')) {
            img.src = img.src + '#1024down-' + img.alt; // 追加到 src 的末尾，并把 alt 值加到 #1024down 后面
        }
    });
}
function sliceImage(canvas, screenshotMode) {
    // 如果是单图模式，不需要判断大小并切割
    if (screenshotMode === 'single') {
        const imgData = canvas.toDataURL("image/png");
        return [imgData];
    }
    // 多图模式：检查图片是否大于5MB
    const imgData = canvas.toDataURL("image/png");
    const byteCharacters = atob(imgData.split(',')[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset++) {
        byteArrays.push(byteCharacters.charCodeAt(offset));
    }
    const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });
    if (blob.size > 5 * 1024 * 1024) {
        const height = canvas.height;
        const midHeight = Math.floor(height / 2);
        // 如果图片大于5MB，切割为两部分
        const firstPartCanvas = document.createElement('canvas');
        const secondPartCanvas = document.createElement('canvas');
        firstPartCanvas.width = canvas.width;
        firstPartCanvas.height = midHeight;
        secondPartCanvas.width = canvas.width;
        secondPartCanvas.height = height - midHeight;
        const firstPartCtx = firstPartCanvas.getContext('2d');
        const secondPartCtx = secondPartCanvas.getContext('2d');
        firstPartCtx.drawImage(canvas, 0, 0, canvas.width, midHeight, 0, 0, canvas.width, midHeight);
        secondPartCtx.drawImage(canvas, 0, midHeight, canvas.width, height - midHeight, 0, 0, canvas.width, height - midHeight);
        const firstPartSlices = sliceImage(firstPartCanvas);
        const secondPartSlices = sliceImage(secondPartCanvas);
        return [...firstPartSlices, ...secondPartSlices];
    } else {
        return [imgData];
    }
}
function takeScreenshots(flag) {
    //1688详情截图及状态管理
    if (flag == 0) {
        flag = 1;
        $("body").attr("id", "bodyx");
        $(".content-detail").attr("id", "screenshot-area");
        $('#processing-message').text("处理中……");
        location.href = location.href.split("#bodyx")[0] + "#bodyx";
        const pageTitle = document.title;
        html2canvas(document.querySelector("#screenshot-area"), {
            useCORS: true,
            logging: true
        }).then(canvas => {
            const imageArray = sliceImage(canvas);
            let downloadedCount = 0;
            const totalImages = imageArray.length;
            imageArray.forEach((imgData, index) => {
                const link = document.createElement('a');
                link.href = imgData;
                link.download = `${time}-${index + 1}-${pageTitle}.png`;
                link.click();
                downloadedCount++;
                if (downloadedCount === totalImages) {
                    $('#processing-message').text("已完成！");
                }
            });
        });
    }
    else {
        alert("已下载！如需重新下载请刷新页面……");
    }
}

/*——————————————————————————————1688 End——————————————————————————————*/

