import Currency from '../models/currencies.model.js';
import User from '../models/user.model.js';

// GET method for all currencies
export const getCurrencies = (req, res) => {
    // If request has below parameters, return the calculated rate
    if (req.query.code1 && req.query.code2 && req.query.amount) {
        Currency.findOne({ code: req.query.code1 })
            .then(sourceCurrency => {
                const foundRate = sourceCurrency.rates.find((currency) => currency.code == req.query.code2);
                const result = parseFloat(req.query.amount) * parseFloat(foundRate.rate);
                res.send(
                    {
                        "from": req.query.code1,
                        "to": req.query.code2,
                        "amount": req.query.amount,
                        "result": result.toString()
                    }
                );
            })
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        // if request has no parameters then return all currencies
        Currency.find()
            .then(currencies => res.json(currencies))
            .catch(err => res.status(400).json('Error: ' + err));
    }

}

// GET method for current currency
export const getCurrency = (req, res) => {
    // Check if param is "rates"
    // if true send rates of given Currency
    if (req.params.code === "rates") {
        Currency.findOne({ code: req.query.from })
            .then(foundCurrency => {
                if (!foundCurrency) {
                    res.send("No currency was found with given code.")
                } else {
                    const toCurrency = foundCurrency.rates.find((currency) => currency.code == req.query.to);
                    if (!toCurrency) {
                        res.send(foundCurrency.rates);
                    } else {
                        res.send([toCurrency]);
                    }
                }
            })
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        // if param is not rates, return the currency with given code
        Currency.findOne({ code: req.params.code })
            .then(currency => res.json(currency))
            .catch(err => res.status(400).json('Error: ' + err));
    }
}

// POST method for creating new currency
export const createCurrency = (req, res) => {
    // Check for authorization in header
    if (req.headers.authorization) {
        // Check if token that was sent with header exists in database
        User.findOne({ email: req.headers.authorization })
            .then(user => {
                if (user) {
                    const name = req.body.name;
                    const code = req.body.code;
                    const rates = req.body.rates;

                    const newCurrency = new Currency({
                        name,
                        code,
                        rates,
                    });

                    newCurrency.save()
                        .then(() => res.json('Currency added!'))
                        .catch(err => res.status(400).json('Error: ' + err));
                } else {
                    res.json("Unauthorized request 1");
                }
            })
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.json("Unauthorized request");
    }

}

// Delete method for given currency
export const deleteCurrency = (req, res) => {
    // Check for authorization in header
    if (req.headers.authorization) {
        // Check if token that was sent with header exists in database
        User.findOne({ email: req.headers.authorization })
            .then(user => {
                if (user) {
                    Currency.findOne({ code: req.params.code })
                        .then(currency =>
                            Currency.findByIdAndDelete(currency.id)
                                .then(() => res.json('Currency deleted.'))
                                .catch(err => res.status(400).json('Error: ' + err))
                        )
                        .catch(err => res.status(400).json('Error: ' + err));
                } else {
                    res.json("Unauthorized request 1");
                }
            })
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.json("Unauthorized request");
    }
}

// PATCH method for given currency
export const updateCurrency = (req, res) => {
    // Check for authorization in header
    if (req.headers.authorization) {
        // Check if token that was sent with header exists in database
        User.findOne({ email: req.headers.authorization })
            .then(user => {
                if (user) {
                    Currency.findOne({ code: req.params.code })
                        .then(currency => {
                            currency.name = req.body.name;
                            currency.code = req.body.code;
                            currency.rates = req.body.rates;
                            currency.save()
                                .then(() => res.json('Currency updated!'))
                                .catch(err => res.status(400).json('Error: ' + err));
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
                } else {
                    res.json("Unauthorized request 1");
                }
            })
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.json("Unauthorized request");
    }

}
