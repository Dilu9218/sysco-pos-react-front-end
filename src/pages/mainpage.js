import React, { Component } from "react";

class MainPage extends Component {
    render() {
        return (
            <React.Fragment>

                <div className="jumbotron jumbotron-fluid">
                    <h1 className="display-4">Mini-project: a simple Point of Sale (POS) system</h1>
                    <p className="lead">Back end should be developed as a REST API in either JS, Java or Golang. Front end should be developed using React.js.
                    </p>
                    <hr className="my-4" />
                    <p style={{ padding: "0px 20px" }}>REST API should be designed and specified before development starts. Test coverage should be as close to 100% as possible, and should be
                    developed along with the code (not later). There should be extensive error handling and validations – app should fail gracefully even under
                    the most unexpected circumstances. Code should be clean and self-explanatory for any other developer. Code should be simple and self-explanatory.
                    There should be a demo of work every two days</p>
                </div>
                <div className="card" style={{ width: "auto", textAlign: "left", margin: "20px" }}>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">&#10003; I should be able to reach the system using a web browser</li>
                        <li className="list-group-item">&#10003; I should be directed to the login screen if I'm not already logged in</li>
                        <li className="list-group-item">&#10003; I should be able to login using my username and password</li>
                        <li className="list-group-item">&#10003; I should be directed to the order list immediately after login</li>
                        <li className="list-group-item">&#10003; I should be able to see all the currently open orders in the order list</li>
                        <li className="list-group-item">&#10003; I should be able to view order details of an order by clicking the order in the order list</li>
                        <li className="list-group-item">&#10003; I should see all the items in the order, and their prices, and the total amount in the order detail view</li>
                        <li className="list-group-item">&#10003; I should be able to add new items to an order from the order detail view</li>
                        <li className="list-group-item">&#10003; I should be able to remove items from an order, from the order detail view</li>
                        <li className="list-group-item">&#10003; I should be able to modify the item count in an order, from the order detail view</li>
                        <li className="list-group-item">&#10003; I should be able to navigate away from the order detail view without having to explicitly save the order</li>
                    </ul>
                </div>
                <footer style={{ marginBottom: "15px" }}>
                    <a href="https://app.swaggerhub.com/apis-docs/CloudyPadmal/Sysco-POS/1.0.3#/"
                        target="_blank" rel="noopener noreferrer">
                        <h3><span className="badge badge-secondary" style={{ padding: "10px" }}>
                            <i className="fas fa-book"></i> REST API Documentation</span></h3>
                    </a></footer>
                <div className="card-deck" style={{ margin: "25px" }}>
                    <div className="card" style={{ border: "1px solid rgba(0,0,0,.125)" }}>
                        <img className="card-img-top" src={require("./node_test_results.png")}
                            alt="Node JS REST API Test Results and Coverage"
                            style={{ padding: "10px" }} />
                        <div className="card-body">
                            <h5 className="card-title">REST API using NodeJS</h5>
                            <p className="card-text">Test results and the total test coverage for the back end API developed with NodeJS
                            </p>
                        </div>
                    </div>
                    <div className="card" style={{ border: "1px solid rgba(0,0,0,.125)" }}>
                        <img className="card-img-top" src={require("./react_test_results.png")}
                            style={{ padding: "10px" }}
                            alt="React JS Front end Test Results and Coverage" />
                        <div className="card-body">
                            <h5 className="card-title">Front End using ReactJS</h5>
                            <p className="card-text">Test results and total test coverage for the front end UI</p>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default MainPage;
