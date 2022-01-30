import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    token: {
        type: String,
        required: true,
        minlength: 3
    }
}, {
    timestamps: true,
});


// encyprt the password before save
userSchema.pre('save', async function (next) {
    if ( !this.isModified("password")){
        next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
})

// Method for checking if the password given matches the user's password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;