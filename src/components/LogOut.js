import { Component } from 'react';
import { withRouter } from 'react-router-dom'

class LogOut extends Component {

    componentDidMount() {
        this.props.logUserInAndOut(false);
        this.props.history.push('/login');
    }

    render() {
        return null;
    }
}

export default withRouter(LogOut);
