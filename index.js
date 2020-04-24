import React from './react';
import ReactDOM from './react-dom';

const func = () => {
    console.log('----')
}

const element = (
    <div className="title" title="xxx" style="width:100px;height:100px;" onClick={ func }>
        react
        <div style={{backgroundColor: '#f00'}}>
            <span>111</span>
        </div>
    </div>
)

// 使用babel转换之后
// var element = /*#__PURE__*/React.createElement("div", {
//     className: "title",
//     title: "xxx",
//     style: "width:100px;height:100px;",
//     onClick: func
//   }, "react", /*#__PURE__*/React.createElement("div", {
//     style: {
//       backgroundColor: '#f00'
//     }
//   }, /*#__PURE__*/React.createElement("span", null, "111")));


// function 组件
const foo = () => {
    return (
        <div className="title" title="xxx" style="width:100px;height:100px;" onClick={ func }>
            react
            <div style={{backgroundColor: '#f00'}}>
                <span>111</span>
            </div>
        </div>
    )
}

// 使用babel转换之后
// var foo = function foo() {
//     return /*#__PURE__*/React.createElement("div", {
//       className: "title",
//       title: "xxx",
//       style: "width:100px;height:100px;",
//       onClick: func
//     }, "react", /*#__PURE__*/React.createElement("div", {
//       style: {
//         backgroundColor: '#f00'
//       }
//     }, /*#__PURE__*/React.createElement("span", null, "111")));
// };

// ReactDOM.render("xxxxxx", document.getElementById('root'));

ReactDOM.render(element, document.getElementById('root'));
