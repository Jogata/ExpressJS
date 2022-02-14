// npm install bcrypt

const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

// DB
const users = [
    { id: 1, name: 'john', password: '123456' },
    { id: 2, name: 'peter', password: '123456' },
    { id: 3, name: 'susan', password: '123456' },
    { id: 4, name: 'anna', password: '123456' },
    { id: 5, name: 'emma', password: '123456' },
];
// BodyParser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Set Static Files
app.use(express.static('./methods-public'));

// Get All Users
app.get('/api/people/', (req, res) => {
    res.status(200).json({success: true, data: users});
})

// Create a New User, using BCRYPT to hash the password
app.post('/api/people/registration', async (req, res) => {
    // TODO: check if the User/email already exist in DB
    try {
        // Hash the password with BCRYPT.
        // * The password will be hashed 12 times.
        // * If you use too big number, encryption may last hours
        const hashedPassword = await bcrypt.hash(req.body.password2, 12);
        const user = { name: req.body.name2, password: hashedPassword};
        users.push(user);
        res.status(201).send('User created');
    } catch {
        res.status(500).send('Error(post:/api/people/registration)');
    }
})

// Login using BCRYPT to compare the passwords
app.post('/api/people/login', async (req, res) => {
    const user = users.find(user => {
        return user.name === req.body.name1;
    })
    if (user) {
        try {
            const isCorrectPassword = await bcrypt.compare(req.body.password1, user.password);
            if (isCorrectPassword) {
                res.status(200).send('Access allowed');
            } else {
                res.status(401).send('Wrong username/password');
            }
        } catch (error) {
            res.status(500).send();
        }
    } else {
        const fakePassword = await bcrypt.hash('fake', 12);
        const isCorrectPassword = await bcrypt.compare(req.body.password1, fakePassword);
        return res.status(401).send(`Wrong username/password`);
    }
})

app.listen(3000);

/*
2GHz core you can roughly expect:
rounds=8 : ~40 hashes/sec
rounds=9 : ~20 hashes/sec
rounds=10: ~10 hashes/sec
rounds=11: ~5  hashes/sec
rounds=12: 2-3 hashes/sec
rounds=13: ~1 sec/hash
rounds=14: ~1.5 sec/hash
rounds=15: ~3 sec/hash
rounds=25: ~1 hour/hash
rounds=31: 2-3 days/hash
*/