let lines = {
    xt: null,
    xc: null,
    xb: null,
    yl: null,
    yc: null,
    yr: null,
}

// 置入参考线
for (let p in lines) {
    let node = lines[p] = document.createElement('div')

    node.classList.add('ref-line', p)
    node.style.cssText = `display:none;opacity:0.7;position:absolute;background:#4DAEFF;z-index:199111250;${p[0] === 'x' ? 'width:100%;height:1px;left:0;' : 'width:1px;height:100%;top:0;'}`

    // 挂上一些辅助方法
    node.show = function () {
        this.style.display = 'block'
    }
    node.hide = function () {
        this.style.display = 'none'
    }
    node.isShow = function () {
        return this.style.display !== 'none'
    }
    document.body.appendChild(node)
}

class RefLine {
    constructor(options = {}) {
        this.options = Object.assign({
            gap: 3
        }, options)
    }

    /**
     * @param dragNode {Element} 拖拽元素的原生node
     * @param checkNodes {String|Element} 选择器 或者 原生node集合
     */
    check(dragNode, checkNodes) {
        // 将 checkNodes 转换为 NodeList
        checkNodes = typeof checkNodes === 'string' ? document.querySelectorAll(checkNodes) : checkNodes;

        // 获取拖动节点的边界信息
        let dragRect = dragNode.getBoundingClientRect();
        let dragTop = dragRect.top; // 拖动节点距离页面顶部的距离

        // 清除所有选中状态
        this.uncheck();

        // 遍历所有需要检查的节点
        Array.from(checkNodes).forEach((item) => {
            // 移除 ref-line-active 类
            item.classList.remove('ref-line-active');

            // 如果当前节点是拖动节点，则跳过
            if (item === dragNode) return;

            // 获取当前节点的边界信息
            let { top, height, bottom, left, width, right } = item.getBoundingClientRect();

            // 计算拖动节点的中心点
            let dragWidthHalf = dragRect.width / 2;
            let dragHeightHalf = dragRect.height / 2;

            // 计算当前节点的中心点
            let itemWidthHalf = width / 2;
            let itemHeightHalf = height / 2;

            // 定义参考线条件
            let conditions = {
                top: [
                    // xt-top
                    {
                        isNearly: this._isNearly(dragTop, top), // 使用拖动节点距离页面顶部的距离
                        lineNode: lines.xt,
                        lineValue: top,
                        dragValue: top - dragTop // 修改为 top 减去拖动节点距离页面顶部的距离
                    },
                    // xt-bottom
                    {
                        isNearly: this._isNearly(dragTop + dragRect.height, top),
                        lineNode: lines.xt,
                        lineValue: top,
                        dragValue: top - (dragTop + dragRect.height)
                    },
                    // xc
                    {
                        isNearly: this._isNearly(dragTop + dragHeightHalf, top + itemHeightHalf),
                        lineNode: lines.xc,
                        lineValue: top + itemHeightHalf,
                        dragValue: top + itemHeightHalf - (dragTop + dragHeightHalf)
                    },
                    // xb-top
                    {
                        isNearly: this._isNearly(dragTop + dragRect.height, bottom),
                        lineNode: lines.xb,
                        lineValue: bottom,
                        dragValue: bottom - (dragTop + dragRect.height)
                    },
                    // xb-bottom
                    {
                        isNearly: this._isNearly(dragTop, bottom),
                        lineNode: lines.xb,
                        lineValue: bottom,
                        dragValue: bottom - dragTop
                    },
                ],
                left: [
                    // yl-left
                    {
                        isNearly: this._isNearly(dragRect.left, left),
                        lineNode: lines.yl,
                        lineValue: left,
                        dragValue: left
                    },
                    // yl-right
                    {
                        isNearly: this._isNearly(dragRect.right, left),
                        lineNode: lines.yl,
                        lineValue: left,
                        dragValue: left - dragRect.width
                    },
                    // yc
                    {
                        isNearly: this._isNearly(dragRect.left + dragWidthHalf, left + itemWidthHalf),
                        lineNode: lines.yc,
                        lineValue: left + itemWidthHalf,
                        dragValue: left + itemWidthHalf - (dragRect.left + dragWidthHalf)
                    },
                    // yr-left
                    {
                        isNearly: this._isNearly(dragRect.right, right),
                        lineNode: lines.yr,
                        lineValue: right,
                        dragValue: right - dragRect.width
                    },
                    // yr-right
                    {
                        isNearly: this._isNearly(dragRect.left, right),
                        lineNode: lines.yr,
                        lineValue: right,
                        dragValue: right - dragRect.left
                    },
                ]
            };

            // 处理条件
            Object.keys(conditions).forEach((direction) => {
                conditions[direction].forEach((condition) => {
                    if (condition.isNearly) {
                        condition.lineNode.style.display = 'block';
                        condition.lineNode.style.top = condition.lineValue + 'px';
                        condition.lineNode.style.left = condition.dragValue + 'px';
                    }
                });
            });
        });
    }

    uncheck() {
        Object.values(lines).forEach((item) => item.hide())
        Array.from(document.querySelectorAll('.ref-line-active')).forEach((item) => item.classList.remove('ref-line-active'))
    }

    _isNearly(dragValue, targetValue) {
        return Math.abs(dragValue - targetValue) <= this.options.gap
    }
}

module.exports = RefLine