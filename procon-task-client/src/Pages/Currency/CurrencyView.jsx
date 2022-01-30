import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import Currency from '../../Components/Currencies/Currency';
import CurrencyRates from '../../Components/Currencies/CurrencyRates';
import { Navbar } from '../../Components';
import './CurrencyView.css'

// GET method for getting currency exchange from one given currency
// to the second given currency
function getClickedCurrency(e) {
  // If no currency is selected alert the user
  if (!document.querySelector('input[name="rates-radio"]:checked')) {
    alert("Please Select a currency");
  } else {
    var activeCurrency = document.querySelector('input[name="rates-radio"]:checked').value;
    var currencyFrom = document.getElementsByTagName("h1")[0].id;
    const amount = document.getElementById("currency-amount").value;
    if (amount) {
      axios.get(`http://localhost:8000/currencies?code1=${currencyFrom}&code2=${activeCurrency}&amount=${amount}`)
        .then(function (response) {
          // handle success
          document.getElementById("currency-result").innerHTML = response.data.result;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    } else {
      alert("Please enter an amount to be calculated");
    }

  }

}



function CurrencyView() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currencyURL = `/edit/${useParams().code}`;
  const userInfo = localStorage.getItem("userInfo");

  // Check if user is logged in
  useEffect(() => {
    if (userInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  })

  return <div className='currency-view-container'>
    <Navbar />
    <Currency code={useParams().code} />
    <label>Rates</label>
    <CurrencyRates code={useParams().code} />
    <div className="currency-amount">
      <label>Amount</label>
      <input type="text" id='currency-amount' />
    </div>
    <hr />
    <div className='currency-view-btns-container'>
      <button onClick={getClickedCurrency}>Calculate</button>
      {isLoggedIn && <Link to={currencyURL}>
        <div className='currencies-container-currency'>Edit</div>
      </Link>}

    </div>

    <div className='currency-view-result-container'>
      <span>Result: &nbsp;</span>
      <div id='currency-result'>0</div>
    </div>

  </div>;
}

export default CurrencyView;
