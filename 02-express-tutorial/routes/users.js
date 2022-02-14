const express = require("express");
const router = express.Router();

let {users} = require('../data');

// Get all users (request from javascript.html)
router.get('/', (req, res) => {
    res.status(200).json({success: true, data: users});
})

// Create new user / Registration
router.post('/registration', (req, res) => {
    const user = {
        name: req.body.name2,
        password: req.body.password2,
    }
    users.push(user);
    res.send('TODO: Registration in DB');
})

// Get user by name / Login
router.post('/login', (req, res) => {
    const {name1} = req.body;
    if (name1) {
        const user = users.filter(user => {
            return user.name === name1;
    })
    if (user[0]) {
        return res.status(201).json({success: true, person: user[0]});
    } else {
        return res.status(201).json({success: true, msg: "User doesn't exist"});
    }
    }
    res.status(400).json({success: false, msg: "Please, enter a name"});
})

module.exports = router