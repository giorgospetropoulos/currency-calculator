import React from "react";
import axios from "axios";

// Controler for GET request for rates of given currency
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
        return <div className="currencies-container">
            {
                this.state.rates.map(
                    rate =>
                        <div key={rate.code} >
                            <input type="radio" id={rate.code} name="rates-radio" value={rate.code} />
                            <label>{rate.name}</label>
                        </div>
                )
            }
        </div>
    }
}