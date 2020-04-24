import Component from './component'
const createElement = (tag, attrs, ...children) => {
    return {
        tag, // 标签名
        attrs, // 属性
        children,
    }
}

const React = {
    createElement,
    Component
}

export default React;

export {
    Component
}