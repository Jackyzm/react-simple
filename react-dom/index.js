// 加载组件
export const renderComponent = (comp) => {
    const {
        componentWillUpdate,
        componentDidUpdate,
        componentDidMount
    } = comp;
    let base;
    const vNode = comp.render();
    base = _render(vNode);

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

// 将虚拟dom转换成真实dom
const _render = (vNone) => {
    if (!vNone) return;

    if (typeof vNone === 'string') {
        return document.createTextNode(vNone)
    } 

    if (typeof vNone === 'number') {
        return document.createTextNode(vNone.toString())
    }

    const { tag, attrs, children } = vNone;

    // 如果tag是函数 则证明这是一个组件
    if (typeof tag === 'function') {
        // 如果存在prototype 并且有render方法 则证明这是一个class组件
        if (tag.prototype && tag.prototype.render) {
            // 实例化组件
            const comp = new tag();

            // 设置props
            setComponentProps(comp, attrs)

            return comp.base;
        } else {
            // 函数组件
            const comVNode = new tag(attrs);
            return _render(comVNode);
        }
    }

    const node = document.createElement(tag);

    // 设置属性
    attrs && Object.entries(attrs).map((item)=> setAttribute(node, item))

    // 递归渲染children
    if (children) children.map((item) => render(item, node));
    return node;
}

// 将虚拟dom转换成真实dom
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
        dom.setAttribute(key, value || '');
    }
}

const ReactDOM = {
    render
}

export default ReactDOM;