import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import EditCurrency from '../../Components/Currencies/EditCurrency'
import EditCurrencyRates from '../../Components/Currencies/EditCurrencyRates'
import { Navbar } from '../../Components';
import './Edit.css';

var numberOfRates = 0;

// Add fields for new Rate
function AddRate() {
  numberOfRates++;
  var row = document.createElement('div');
  row.className = "edit-currency-rates-row";

  var name = document.createElement('div');
  name.className = "edit-rate-name-col";

  var nameLabel = document.createElement('label');
  nameLabel.innerHTML = "Name";

  var nameInput = document.createElement('input');
  nameInput.id = "rate-name-" + numberOfRates;
  nameInput.type = "text";

  name.appendChild(nameLabel);
  name.appendChild(nameInput);

  var code = document.createElement('div');
  code.className = "edit-rate-code-col";

  var codeLabel = document.createElement('label');
  codeLabel.innerHTML = "Code";

  var codeInput = document.createElement('input');
  codeInput.id = "rate-code-" + numberOfRates;
  codeInput.type = "text";

  code.appendChild(codeLabel);
  code.appendChild(codeInput);

  var rate = document.createElement('div');
  rate.className = "edit-rate-rate-col";

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

  document.getElementById('edit-currency-add-row').appendChild(row);
}

function Edit() {
  const navigate = useNavigate();
  //  PATCH method for updating currency
  function UpdateCurrency() {
    var inputs, index;

    const currency = {
      "name": document.getElementById('edit-currency-name').innerHTML,
      "code": document.getElementById('edit-currency-code').innerHTML,
      "rates": []
    }

    inputs = document.getElementsByTagName('input');
    for (index = 0; index < inputs.length; index = index + 3) {
      var curname = inputs[index].value;
      var curcode = inputs[index + 1].value;
      var currate = inputs[index + 2].value;
      if (curname && curcode && currate) {
        const rate = {
          "name": curname,
          "code": curcode,
          "rate": currate
        }
        currency.rates.push(rate);
      }
    }


    axios.patch(`http://localhost:8000/currencies/${currency.code}`, currency, {headers: {'Authorization': JSON.parse(localStorage.getItem("userInfo")).email}})
      .then(function (response) {
        console.log("Currency Updated Successfully");
        navigate(`/`, { replace: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // DELETE method for deleting current currency
  function DeleteCurrency() {
    axios.delete(`http://localhost:8000/currencies/${document.getElementById('edit-currency-code').innerHTML}`, {headers: {'Authorization': JSON.parse(localStorage.getItem("userInfo")).email}})
      .then(function (response) {
        navigate(`/`, { replace: true });
      }).catch(function (error) {
        console.log(error);
      });
  }


  return <div className='edit-currency-container'>
    <Navbar />
    <h1>Edit</h1>
    <EditCurrency code={useParams().code} />
    <div id='add-rates'>
      <div className='edit-currency-btns-container'>
        <button onClick={AddRate}>Add Rate</button>
        <button onClick={UpdateCurrency}>Update Currency</button>
        <button onClick={DeleteCurrency} id='edit-currency-delete-btn'>Delete Currency</button>
      </div>
      <EditCurrencyRates code={useParams().code} />
    </div>
  </div>;
}

export default Edit;
