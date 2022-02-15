const express = require('express');
const session = require('express-session');
const {users} = require('../data');

const app = express();

app.use(session({
    name: 'sid',
    secret: 'This is a secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true,
        // secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        // maxAge: 1000 * 60 * 60 * 24  // 1 day
    },
}));

app.get('/', (req, res) => {
    res.send('/');
})

app.get('/home', (req, res) => {
    res.send('home');
})

app.get('/login', (req, res) => {
    res.send('get login');
})

app.get('/register', (req, res) => {
    res.send('get reg');
})

app.post('/login', (req, res) => {
    res.send('post log');
})

app.post('/register', (req, res) => {
    res.send('post reg');
})

app.post('/logout', (req, res) => {
    res.send('logout');
})

app.listen(3000, () => {
    console.log('3000...');
});