import React, { Component } from 'react';

class MainPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="jumbotron jumbotron-fluid">
                    <h1 className="display-4">Mini-project: a simple Point of Sale (POS) system</h1>
                    <p className="lead">Back end should be developed as a REST API in either JS, Java or Golang. Front end should be developed using React.js.
                    </p>
                    <hr className="my-4" />
                    <p style={{ padding: '0px 20px' }}>REST API should be designed and specified before development starts. Test coverage should be as close to 100% as possible, and should be
                    developed along with the code (not later). There should be extensive error handling and validations – app should fail gracefully even under
                    the most unexpected circumstances. Code should be clean and self-explanatory for any other developer. Code should be simple and self-explanatory.
                    There should be a demo of work every two days</p>
                </div>
                <div className="card" style={{ width: "auto", textAlign: 'left', margin: '20px' }}>
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
                <img src={require('./node_test_results.png')} alt="Node JS REST API Test Results and Coverage" style={{ width: '90%', marginBottom: '25px' }} />
            </React.Fragment>
        );
    }
}

export default MainPage;
