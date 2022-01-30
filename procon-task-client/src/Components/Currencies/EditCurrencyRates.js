import React from "react";
import axios from "axios";

// Controler for GET request for rates of given currency
// different layout from Currency.js
export default class Currencies extends React.Component {
    state = {
        rates: [],
    };

    componentDidMount() {
        axios.get(`http://localhost:8000/currencies/${this.props.code}`)
            .then(res => {
                this.setState({ rates: res.data.rates });
            })
    }

    render() {
        return <div className="currencies-container" id="edit-currency-add-row">
            {
                this.state.rates.map(
                    rate =>
                        <div key={rate.code} className="edit-currency-rates-row">
                            <div className="edit-rate-name-col">
                                <label>Name</label>
                                <input type="text" id={rate.name} defaultValue={rate.name} />
                            </div>
                            <div className="edit-rate-code-col">
                                <label>Code</label>
                                <input type="text" id={rate.code} defaultValue={rate.code} />
                            </div>
                            <div className="edit-rate-rate-col">
                                <label>Rate</label>
                                <input type="text" id={rate.rate} defaultValue={rate.rate} />
                            </div>
                        </div>
                )
            }
            <hr />
        </div>
    }
}