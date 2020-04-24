import { renderComponent } from '../react-dom';
class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
    }
    setState(nextState) {
        this.state = {...this.state, ...nextState}
        renderComponent(this);
    }
}

export default Component;