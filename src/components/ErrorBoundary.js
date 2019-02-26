import React from 'react';

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
                style={{ height: '100%', margin: '40%' }}>
                <span className="badge badge-dark">Cannot load site ...</span>
            </h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;