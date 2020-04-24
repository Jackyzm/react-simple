// 设置标签属性 className 事件 title id style等
const setAttribute = (dom, attr) =>{
    const [key, value] = attr;
    // 没有值 则清除属性
    if (!value) return dom.removeAttribute(key);

    // class
    if (key === 'className') {
        dom.setAttribute('class', value);
    } else if (key.startsWith('on')) { // 各种事件
        const newKey = key.toLowerCase();
        dom[newKey] = value;
    } else if (key === 'style') { // 行内style
        if (!value || typeof value === 'string') {
            dom.setAttribute(key, value);
        } else if (typeof value === 'object') {
            Object.entries(value).map((item) => {
                const [cssKey, cssValue] = item;
                if (typeof cssValue === 'number') {
                    dom.style[cssKey] = `${cssValue}px`;
                } else {
                    dom.style[cssKey] = cssValue;
                }
            })
        }
    } else { // 其他各种属性
        dom.setAttribute(key, value);
    }
}

// dom 是真实dom/以及存在的dom vNode是虚拟dom/Virtual DOM
const diffAttribute = (vNode, dom) => {
    const { attrs } = vNode; // 新的属性
    const { attributes } = dom;
    const oldAttr = {}; // 旧的属性
    [...attributes].map((item) => {
        oldAttr[item.name] = item.value;
    });

    // 比较新旧属性 如果新的中没有 则移除属性
    oldAttr && Object.entries(oldAttr).map((item)=>{
        const [key] = item;
        if (!Object.prototype.hasOwnProperty.call(attrs, key)) setAttribute(dom, key, null);
    });

    // 比较新旧属性 如果新的属性与旧的不一致/新增 则设置
    attrs && Object.entries(attrs).map((item)=>{
        const [key, value] = item;
        if (oldAttr[key] !== value) setAttribute(dom, item);
    });
}

function diffChildren (dom, vChildren){
    const domChildren = dom.childNodes;

    // 遍历children
    vChildren.map((item, index) => {
        // 递归对比所以一一对应的节点
        const child = diffNode(item, domChildren[index]);

        const f = domChildren[index];
        if (child && child !== dom && child !== f) {
            if (!f) {
                dom.appendChild(child);
            }
        }
    })
}

// 加载组件
const renderComponent = (comp) => {
    const {
        componentWillUpdate,
        componentDidUpdate,
        componentDidMount
    } = comp;
    let base;
    const vNode = comp.render();
    base = diffNode(vNode);

    if (comp.base){
        componentWillUpdate();
        componentDidUpdate();
    } else {
        componentDidMount();
    }

    // 节点替换
    if (comp.base && comp.base.parentNode) {
        comp.base.parentNode.replaceChild(base, comp.base)
    }

    comp.base = base;
}

// 设置props
const setComponentProps = (comp, props) =>{
    const {
        componentWillMount,
        componentWillReceiveProps,
        base
    } = comp;

    if (!base) {
        componentWillMount && componentWillMount();
    } else if (componentWillReceiveProps) {
        componentWillReceiveProps(props);
    }

    // 设置props
    comp.props = props;

    // 渲染组件
    renderComponent(comp);
}

// 卸载组件
const unMountComp = (comp) => {
    if (comp.base && comp.base.parentNode) {
        comp.base.parentNode.removeNode(comp.base);
    }
}

function diffComponent (dom, vNode) {
    // 如果组件没有变化
    let comp = dom;
    let newDom = null;
    const { tag, attrs } = vNode;

    // 如果组件没有变化，重新设置props
    if (comp && (comp.constructor === tag)){
        // 设置props
        setComponentProps(comp, attrs);
        newDom = comp.base;
    } else {
        // 组件发生变化
        if (comp) unMountComp(comp);

        // 如果存在prototype 并且有render方法 则证明这是一个class组件
        if (tag.prototype && tag.prototype.render) {
            // 实例化组件
            const newComp = new tag();
            setComponentProps(newComp, attrs);
            newDom = newComp.base;
        } else {
            // 函数组件
            const comVNode = new tag(attrs);
            newDom = diffNode(comVNode);
        }
    }

    return newDom;
}

// 对比单个节点
function diffNode (vNode, dom){
    if (!vNode) return;
    let newDom = dom;

    if (typeof vNode === 'number' || typeof vNode === 'string') {
        const newVNode = vNode.toString();

        // 如果dom存在 并且也为文字
        if (dom && dom.nodeType === 3) {
            // 原本的文字与新的文字不相同
            if (dom.textContent !== newVNode) dom.textContent = newVNode;
        } else {
            // dom不存在 或者原本的dom不是文字
            newDom = document.createTextNode(newVNode);
        }
        return newDom;
    }

    const { tag, children } = vNode;

    if (typeof tag === 'function') {
        return diffComponent(newDom, vNode);
    }

    if (!dom) {
        newDom = document.createElement(tag);
    }

    if (children && children.length) {
        diffChildren(newDom, children);
    }

    diffAttribute(vNode, newDom)

    return newDom;
}

const diff = (vNode, dom, container) => {
    const result = diffNode(vNode, dom);

    // 首次加载
    if (container) container.appendChild(result);

    return result;
}

export default diff;
