import React, { Component } from './react';
import ReactDOM from './react-dom';

// babel在线转换
// https://babeljs.io/repl


// function 组件
const Foo = (props) => {
    // console.log(props);
    const { foo } = props;
    return (
        <div className="title" title="xxx" style="width:100px;height:100px;" onClick={ func }>
            react
            <div style={{backgroundColor: '#f00'}}>
                <span>111</span>
                <span>{foo}</span>
            </div>
        </div>
    )
}

// 使用babel转换之后
// var Foo = function Foo(props) {
//     console.log(props);
//     var foo = props.foo;
//     return /*#__PURE__*/React.createElement("div", {
//       className: "title",
//       title: "xxx",
//       style: "width:100px;height:100px;",
//       onClick: func
//     }, "react", /*#__PURE__*/React.createElement("div", {
//       style: {
//         backgroundColor: '#f00'
//       }
//     }, /*#__PURE__*/React.createElement("span", null, "111"), /*#__PURE__*/React.createElement("span", null, foo)));
//   };


// class 组件
class Com extends Component {
    constructor(props){
        // 在一个构造方法中可以使用super关键字来调用一个父类的构造方法。
        super(props);
        this.state = {
            count: 10
        }
    }

    componentWillMount(){
        console.log('componentWillMount');
    }

    componentWillReceiveProps(props){
        console.log('componentWillReceiveProps', props);
    }

    componentWillUpdate(){
        console.log('componentWillUpdate');
    }

    componentDidUpdate(){
        console.log('componentDidUpdate');
    }

    componentDidMount(){
        console.log('componentDidMount');
    }

    btnClick (){
        const { count } = this.state;
        this.setState({ count: count + 1 })
    }

    render() {
        const { ll } = this.props;
        const { count } = this.state;
        return (
            <div className="title" title="xxx" style="width:100px;height:100px;">
                react
                <div style={{backgroundColor: '#f00'}}>
                    <span>111</span>
                    <span>{ll}</span>
                </div>
                <div>
                    <p>{ count }</p>
                    {/* <button onClick={this.btnClick.bind(this)}>点点点</button> */}
                    <button onClick={() => this.btnClick()}>点点点</button>
                </div>
            </div>
        )
    }
}

// 使用babel转换之后
// var Com = /*#__PURE__*/function (_React$Component) {
//     _inherits(Com, _React$Component);

//     var _super = _createSuper(Com);

//     function Com() {
//         _classCallCheck(this, Com);

//         return _super.apply(this, arguments);
//     }

//     _createClass(Com, [{
//         key: "render",
//         // constructor(){
//         //     super();
//         //     this.state = {
//         //         a: 111
//         //     }
//         // }
//         value: function render() {
//         return /*#__PURE__*/React.createElement("div", null, "ffff");
//         }
//     }]);

//     return Com;
// }(React.Component);

const func = () => {
    console.log('----')
}

const element = (
    <div className="title" title="xxx" style="width:100px;height:100px;" onClick={ func }>
        react
        <div style={{backgroundColor: '#f00'}}>
            <span>111</span>
        </div>
        <Foo foo="xxx">
            <div>111</div>
        </Foo>
        <Com ll="llll">
            <div>2222</div>
        </Com>
    </div>
)

// 使用babel转换之后
// var element = /*#__PURE__*/React.createElement("div", {
//   className: "title",
//   title: "xxx",
//   style: "width:100px;height:100px;"
// }, "react", /*#__PURE__*/React.createElement("div", {
//   style: {
//     backgroundColor: '#f00'
//   }
// }, /*#__PURE__*/React.createElement("span", null, "111")), /*#__PURE__*/React.createElement(Foo, {
//   foo: "xxx"
// }, /*#__PURE__*/React.createElement("div", null, "111")), /*#__PURE__*/React.createElement(Com, {
//   ll: "llll"
// }, /*#__PURE__*/React.createElement("div", null, "2222")));

// ReactDOM.render("xxxxxx", document.getElementById('root'));

ReactDOM.render(<Com ll="11122"/>, document.getElementById('root'));
