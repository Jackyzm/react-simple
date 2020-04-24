const createElement = (tag, attrs, ...children) => {
    return {
        tag, // 标签名
        attrs, // 属性
        children
    }
}

const React = {
    createElement
}

export default React;