import React from 'react';
import axios from 'axios';
import { Navbar } from '../../Components';
import { useNavigate } from 'react-router-dom';
import './Add.css'

var numberOfRates = 0;

// Add fields for new Rate
function AddRate() {
    numberOfRates++;
    var row = document.createElement('div');
    row.className = "add-currency-container-form-row-rates";

    var name = document.createElement('div');
    name.className = "add-currency-container-form-name";

    var nameLabel = document.createElement('label');
    nameLabel.innerHTML = "Name";

    var nameInput = document.createElement('input');
    nameInput.id = "rate-name-" + numberOfRates;
    nameInput.type = "text";

    name.appendChild(nameLabel);
    name.appendChild(nameInput);

    var code = document.createElement('div');
    code.className = "add-currency-container-form-code";

    var codeLabel = document.createElement('label');
    codeLabel.innerHTML = "Code";

    var codeInput = document.createElement('input');
    codeInput.id = "rate-code-" + numberOfRates;
    codeInput.type = "text";

    code.appendChild(codeLabel);
    code.appendChild(codeInput);

    var rate = document.createElement('div');
    rate.className = "add-currency-container-form-rate";

    var rateLabel = document.createElement('label');
    rateLabel.innerHTML = "Rate";

    var rateInput = document.createElement('input');
    rateInput.id = "rate-rate-" + numberOfRates;
    rateInput.type = "text";

    rate.appendChild(rateLabel);
    rate.appendChild(rateInput);

    row.appendChild(name);
    row.appendChild(code);
    row.appendChild(rate);

    document.getElementById('add-rates').appendChild(row);
}

function Add() {
    const navigate = useNavigate();

    //POST method for creating new currency
    function AddCurrency() {
        if (document.getElementById('currency-name').value && document.getElementById('currency-code').value) {
            
            const currency = {
                "name": document.getElementById('currency-name').value,
                "code": document.getElementById('currency-code').value,
                "rates": []
            }

            for (var i = 0; i < numberOfRates + 1; i++) {
                const nameID = "rate-name-" + i;
                const codeID = "rate-code-" + i;
                const rateID = "rate-rate-" + i;
                if (document.getElementById(nameID).value && document.getElementById(codeID).value && document.getElementById(rateID).value) {
                    const rate = {
                        "name": document.getElementById(nameID).value,
                        "code": document.getElementById(codeID).value,
                        "rate": document.getElementById(rateID).value
                    }
                    currency.rates.push(rate);
                }
            }

            axios.post("http://localhost:8000/currencies", currency, {headers: {'Authorization': JSON.parse(localStorage.getItem("userInfo")).email}})
                .then(function (response) {
                    navigate(`/`, { replace: true });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }


    return <div className='add-currency-container'>
        <Navbar />
        <h2>Add new currency</h2>
        <div className='add-currency-container-form'>
            <div className='add-currency-container-form-row'>
                <div className='add-currency-container-form-name'>
                    <label>Name</label>
                    <input type="text" id='currency-name' />
                </div>
                <div className='add-currency-container-form-code'>
                    <label>Code</label>
                    <input type="text" id='currency-code' />
                </div>
            </div>
            <hr />
            <div className='add-currency-form-add-rates-container'>
                <label>Rates</label>
                <button onClick={AddRate}>Add Rate</button>
            </div>
            <div id='add-rates'>
                <div className='add-currency-container-form-row-rates'>
                    <div className='add-currency-container-form-name'>
                        <label>Name</label>
                        <input type="text" id='rate-name-0' />
                    </div>
                    <div className='add-currency-container-form-code'>
                        <label>Code</label>
                        <input type="text" id='rate-code-0' />
                    </div>
                    <div className='add-currency-container-form-rate'>
                        <label>Rate</label>
                        <input type="text" id='rate-rate-0' />
                    </div>
                </div>
            </div>
            <hr />
            <div className='add-currency-container-form-btn-container'>
                <button onClick={AddCurrency}>Add  Currency</button>
            </div>
        </div>
    </div>;
}

export default Add;
