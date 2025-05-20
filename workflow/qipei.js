import * as publics from "./public.js"
const url = location.href;
export function openProductsEdit() {
    // Esc打开产品栏目管理列表
    $("a").filter(function () {
        return $(this).text().trim() === "编辑";
    }).each(function () {
        window.open($(this).attr("href"), "_blank");
    });
    if ($(".page-next").length) {
        location.href = $(".page-next").attr("href");
    } else {
        window.close();
    }
};
export async function handleProductAction(checked_car, status = "") {
    // 获取产品页面的相关数据, 并进行记录操作
    let today = publics.generateTimestamp(0);
    let person = "xxpersonname";
    let username = $(".welcome").text().trim().replace("欢迎您: ", "");
    let urlParams = new URLSearchParams(new URL(url).search);
    let ch_id = urlParams.get("ch_id");
    let id = urlParams.get("id");
    let ch_name = $(".myColumnTit").text();
    let product_link = `http://testpage.qipeiyigou.com/qipeiyigouwang/products/${id}.html`;
    let record = `${today}\t${person}\t${username}\t${ch_id}\t${id}\t${ch_name}\t${product_link}\t`;
    let labelsBefore = Array.from(document.querySelectorAll(`input[name="properties[]"]:checked`))
        .map(checkbox => checkbox.closest("label").textContent.trim())
        .join(", ");
    if (status === "未处理") {
        record += `${labelsBefore}\t${labelsBefore}\t${status}`;
        await publics.appendToRecord(record);
        window.close();
    } else {
        let interval = setTimeout(async function checkAndExecute() {
            if ($("#sub_id option:selected").length && $("#shop_pro_class_big_id option:selected").length) {
                clearTimeout(interval);
                $("input[type=checkbox][value=4]").prop("checked", false);
                if (checked_car) {
                    $("input[type=checkbox][value=2]").prop("checked", true);
                }
                let labelsAfter = Array.from(document.querySelectorAll(`input[name="properties[]"]:checked`))
                    .map(checkbox => checkbox.closest("label").textContent.trim())
                    .join(", ");
                record += `${labelsBefore}\t${labelsAfter}\t${status}`;
                await publics.appendToRecord(record);
                $("title").text("完成");
                $("#submit_msg a").click();
            } else {
                setTimeout(checkAndExecute, 1000);
            }
        }, 1000);
    }
}
export function open_close_shop_products() {
    // 店铺内打开或关闭产品
    if (!location.href.includes("mshop/product/item")) {
        $(".list .image").each(function () {
            window.open($(this).attr("href"));
        });
    } else if (location.href.includes("mshop/product/item")) {
        window.close();
    }
}
export async function open_channel_product_list(chIds) {
    // 打开所有包含产品的栏目管理列表页
    if (!Array.isArray(chIds) || chIds.length === 0) {
        console.log("chIds 不是有效的数组或为空");
        return;
    }
    console.log("函数 open_channel_product_list 被调用\n频道 ID 列表:\n", chIds);
    if (url === "http://testpage.qipeiyigou.com/" || url === "http://testpage.qipeiyigou.com/dom/sc_user_center.php?username=qipeiyigouwang") {
        console.log("URL 匹配, 开始处理频道 ID 列表");
        let promises = chIds.map((id, index) => {
            return new Promise((resolve, reject) => {
                let productUrl = `http://testpage.qipeiyigou.com/dom/sc_product_list.php?username=qipeiyigouwang&ch_id=${id}&ls_cur=112`;
                console.log(`请求频道 ID: ${id}`);
                $.ajax({
                    url: productUrl,
                    method: "GET",
                    success: function (response) {
                        console.log(`响应频道 ID: ${id}`);
                        resolve({
                            index: index,
                            id: id,
                            hasProducts: !response.includes("暂无数据"),
                            url: productUrl
                        });
                    },
                    error: function (xhr, status, error) {
                        console.error(`请求失败, URL: ${productUrl}, 错误: ${error}`);
                        resolve({ index: index, id: id, hasProducts: false, url: productUrl });
                    }
                });
            });
        });
        Promise.all(promises).then(results => {
            results.sort((a, b) => a.index - b.index);
            results.forEach(result => {
                if (result.hasProducts) {
                    console.log(`打开有产品的页面: ${result.url}`);
                    window.open(result.url, "_blank");
                } else {
                    console.log(`该频道没有产品, 跳过: ${result.url}`);
                }
            });
            console.log("所有请求已完成, 窗口按顺序打开");
        }).catch(error => {
            console.error("处理请求时发生错误:", error);
        });
    } else {
        console.log("URL 不匹配, 跳过处理");
    }
}
export function export_tsc() {
    // 首页导出数据组件
    let html = `
        <img src="https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1746954291684901.png" id="toggleImg" />
        <input type="text" id="nameInput" placeholder="请输入姓名" />
        <button id="exportx">导出数据为 TSV</button>
        `;
    $("body").append(html);
    let autorun = Number(localStorage.getItem("autorun"));
    if (autorun) {
        $("#toggleImg").attr("src", "https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1746954291684901.png");
    }
    else {
        $("#toggleImg").attr("src", "https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1746954290554632.png");
    }
    $("#toggleImg").click(function () {
        let autorun = Number(localStorage.getItem("autorun"));
        if (autorun) {
            $(this).attr("src", "https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1746954290554632.png");
            autorun = 0;
        } else {
            $(this).attr("src", "https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1746954291684901.png");
            autorun = 1;
        }
        localStorage.setItem("autorun", autorun);
    });
    $("#exportx").click(function () {
        let personName = $("#nameInput").val().trim();
        if (!personName) {
            alert("姓名不能为空！");
            return;
        }
        let time = publics.generateTimestamp(1);
        let fileName = `${personName}-${time}`;
        publics.downloadRecordAsTSV(personName, fileName);
    });
}
export function showKeyword() {
    // 显示关键词
    let keyword = $("meta[name=keywords]").attr("content");
    let author = $("meta[name=author]").attr("content");
    if (keyword.includes(author)) {
        $("#keywordx").text("关键词为空");
    } else {
        $("#keywordx").text(keyword);
    }
};
export function checkProduct() {
    // 检查产品详情
    let id = 0;
    let tip = "";
    $("#tipx").text("正在检查中……");
    if ($(".main a").length) {
        id = 1;
        tip += "存在超链接！";
    }
    if ($(".main *[style*=pointer]").length) {
        id = 2;
        tip += "存在非超链接小手！";
    }
    let images = $(".main img");
    for (let i = 0; i < images.length; i++) {
        let src = images.eq(i).attr("src");
        if (!src.includes("aimg8.dlssyht.cn")) {
            id = 3;
            tip += "存在外链图片！";
            break;
        }
    }
    if (id === 0) {
        tip = "正常！";
    } else {
        $("#tipx").css("background-color", "red");
        alert(tip);
    }
    $("#tipx").text(`检查结果: ${tip}`);
};
function extractDataAsObject() {
    // 手动提取商家中心的栏目{id:名称}
    let items = document.querySelectorAll(".item-list li");
    let dataObj = {};
    items.forEach(item => {
        let link = item.querySelector("a");
        let chId = new URLSearchParams(link.search).get("ch_id");
        let title = item.querySelector(".p-tit").textContent.trim();
        dataObj[chId] = title;
    });
    console.log(dataObj);
    return dataObj;
}
export async function fetchChIdsAndTitles(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`请求失败, 状态码: ${response.status}`);
        }

        // 获取响应的字节流
        const arrayBuffer = await response.arrayBuffer();

        // 使用 TextDecoder 解码响应体，如果编码是 GBK
        const decoder = new TextDecoder('gbk');
        const decodedText = decoder.decode(arrayBuffer);

        console.log("xx" + decodedText);  // 输出解码后的文本

        // 正则表达式提取 ch_id 和标题
        const chIdDict = {};
        // 修改正则表达式，以匹配 <a> 标签中的 ch_id 和 <span class="p-tit"> 标签中的标题
        const regex = /<a href=".*?ch_id=(\d+).*?">.*?<span class="p-tit">\s*(.*?)\s*<\/span>/g;

        let match;
        while ((match = regex.exec(decodedText)) !== null) {
            const chId = match[1]; // 提取 ch_id
            const title = match[2].trim(); // 提取标题并去除空格
            chIdDict[chId] = title; // 将 ch_id 和标题存入字典
        }

        console.log("提取到的 ch_id 和标题字典: ", chIdDict);
        return chIdDict;
    } catch (error) {
        console.error("请求失败: " + error.message);
        return {};
    }
}
// End-231-2025.05.20.102958
