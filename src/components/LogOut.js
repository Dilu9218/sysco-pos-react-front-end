import { Component } from 'react';
import { withRouter } from 'react-router-dom'

class LogOut extends Component {

    componentDidMount() {
        this.props.LOG_USER_IN_AND_OUT(false);
        this.props.history.push('/login');
    }

    render() {
        return null;
    }
}

export default withRouter(LogOut);
