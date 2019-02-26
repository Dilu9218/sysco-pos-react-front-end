import React from 'react';
import { Link } from 'react-router-dom'

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1 className="d-flex justify-content-center"
                style={{ height: '100%', margin: '30% 0 0 0' }}>
                <span className="badge badge-dark" style={{ padding: '50px' }}>
                    Cannot load the website ... <br /><br />Want to go back to
                    <br /><br /><Link to="/home">Home Page</Link>?</span>
            </h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;