export function get_img_src() {
    // 商铺设计图片模块获取图片src, 复制到剪贴板
    let a = $(".n-upload-file-info a").attr("href");
}
export function setPosition() {
    // 管理后台设计页面设置坐标
    let input = prompt("请输入left/top值（例如: 100/200）:");
    let [left, top] = input.split("/");
    if (left !== "" && !isNaN(left)) {
        $(".curEditModuleSize").attr("data-left", left);
        $(".curEditModuleSize").css("left", `${left}px`);
    }
    if (top !== "" && !isNaN(top)) {
        $(".curEditModuleSize").attr("data-top", top);
        $(".curEditModuleSize").css("top", `${top}px`);
    }
}
// End-18-2025.05.20.172031
