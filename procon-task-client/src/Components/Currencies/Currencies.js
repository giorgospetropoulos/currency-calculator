import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


// Controler for GET request for all currencies
export default class Currencies extends React.Component {
    state = {
        currencies: [],
    };

    componentDidMount() {
        axios.get('http://localhost:8000/currencies')
            .then(res => {
                this.setState({ currencies: res.data });
            })
    }

    render() {
        return <div className="currencies-container">
            {this.state.currencies.map(currency => <Link to={currency.code} key={currency.code}><div className="currencies-container-currency">{currency.code} - {currency.name}</div></Link>)}
        </div>
    }
}