const _render = (vNone)=>{
    if (!vNone) return;

    if (typeof vNone === 'string') {
        return document.createTextNode(vNone)
    } 

    const { tag, attrs, children } = vNone;

    // 如果tag是函数 则证明这是一个组件
    if (typeof tag === 'function') {
        // 如果存在prototype 并且有render方法 则证明这是一个class组件
        if (tag.prototype && tag.prototype.render) {
            const Com = new tag(attrs);
            const ComVNode = Com.render();
            return _render(ComVNode);
        } else {
            // 函数组件
            const ComVNode = new tag(attrs);
            return _render(ComVNode);
        }
    }

    const node = document.createElement(tag);

    // 设置属性
    attrs && Object.entries(attrs).map((item)=> setAttribute(node, item))

    // 递归渲染children
    if (children) children.map((item) => render(item, node));
    return node;
}

// 将虚拟dom计算成真实dom
const render = (vNone, dom) =>{
    // console.log(vNone);
    return dom.appendChild(_render(vNone));
}

// 设置标签属性 className 事件 title id style等
const setAttribute = (dom, attr) =>{
    const [key, value] = attr;

    // class
    if (key === 'className') {
        dom.setAttribute('class', value || '');
    } else if (key.startsWith('on')) { // 各种事件
        const newKey = key.toLowerCase();
        dom[newKey] = value;
    } else if (key === 'style') { // 行内style
        if (!value || typeof value === 'string') {
            dom.setAttribute(key, value || '');
        } else if (typeof value === 'object'){
            Object.entries(value).map((item)=>{
                const [cssKey, cssValue] = item;
                if (typeof cssValue === 'number') {
                    dom.style[cssKey] = `${cssValue}px`;
                } else {
                    dom.style[cssKey] = cssValue;
                }
            })
        }
    } else { // 其他各种属性
        dom.setAttribute(key, value || '');
    }
}

const ReactDOM = {
    render
}

export default ReactDOM;