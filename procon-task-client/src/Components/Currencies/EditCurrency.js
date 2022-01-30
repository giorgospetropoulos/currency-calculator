import React from "react";
import axios from "axios";

// Controler for GET request for current currency given
// different layout from Currency.js
export default class Currency extends React.Component {
    state = {
        currency: {},
        rates: {}
    };

    componentDidMount() {
        axios.get(`http://localhost:8000/currencies/${this.props.code}`)
            .then(res => {
                this.setState({ currency: res.data, rates: res.data.rates });
            })
    }

    render() {
        return <div className="edit-currency-main-info">
            <span id="edit-currency-name">{this.state.currency.name}</span>
            &nbsp;
            -
            &nbsp;
            <span id="edit-currency-code">{this.state.currency.code}</span>
        </div>
    }
}