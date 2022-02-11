const express = require("express");
const router = express.Router();

let {users} = require('../data');

// Get all users (request from javascript.html)
router.get('/', (req, res) => {
    res.status(200).json({success: true, data: users});
})

// Get user by name (request from Form HTML element/javascript.html)
router.post('/', (req, res) => {
    const {name} = req.body;
    if (name) {
        const user = users.filter(user => {
            return user.name === name;
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