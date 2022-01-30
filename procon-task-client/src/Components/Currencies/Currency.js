import React from "react";
import axios from "axios";

// Controler for GET request for current currency given
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
        return <div>
            <h1 id={this.state.currency.code}>{this.state.currency.name} - {this.state.currency.code}</h1>
        </div>
    }
}