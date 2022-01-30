import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const currencySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    code: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    rates: [{
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        code: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        rate: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true,
});

const Currency = mongoose.model('Currency', currencySchema);

export default Currency;