import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

// GET method for all users
export const getUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
}

// POST method for creating new user
export const createUser = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    let token = "";

    // Check if email exists in database
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(400);
                res.send("Username already exists");
            } else {
                // Check if username exists in database
                User.findOne({ username: req.body.username })
                    .then(userFound => {
                        if (userFound) {
                            res.status(400);
                            res.send("Email already exists");
                        } else {
                            token = generateToken(password);
                            const newUser = new User({ username, email, password, token });

                            newUser.save()
                                .then(() => res.json({
                                    _id: newUser.id,
                                    username: newUser.username,
                                    email: newUser.email,
                                    token: token
                                }))
                                .catch(err => res.status(400).json('Error: ' + err));
                        }
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

// POST method for logging in user
export const authUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // find User with given email in database
    User.findOne({ email: req.body.email })
        .then(user => {
            // Check if password given is the user's password
            if (user && (user.matchPassword(password))) {
                user.matchPassword(password).then((matches) => {
                    if (matches) {
                        res.json({
                            _id: user.id,
                            username: user.username,
                            email: user.email,
                            token: generateToken(user.id)
                        });
                    } else {
                        res.status(400).json('Error: Invalid email or password')
                    }
                })
            } else {
                res.status(400).json('Error: Invalid email or password')
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
}