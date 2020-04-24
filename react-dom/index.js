const _render = (vNone)=>{
    if (!vNone) return;

    if (typeof vNone === 'string') {
        return document.createTextNode(vNone)
    } else {
        const { tag, attrs, children } = vNone;
        const node = document.createElement(tag);

        attrs && Object.entries(attrs).map((item)=>{
            setAttribute(node, item);
        })

        // 递归
        if (children) children.map((item) => render(item, node));

        return node;
    }
}

// 将虚拟dom计算成真实dom
const render = (vNone, dom) =>{
    // console.log(vNone, dom);
    return dom.appendChild(_render(vNone));
}

// className onClick onFocus等等 style   id title
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