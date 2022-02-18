// npm install cookie-parser

const express = require('express');
const cookieParser = require('cookie-parser');
const { response } = require('express');

const app = express();
app.use(cookieParser());

app.get('/', function (req, res) {
    res.cookie('firstCookie', 'sended successfully');
    response.end('Cookie was received. Use "document.cookie" to see it in the browser');
})

app.get('/clearCookie', function (req, res) {
    res.clearCookie('firstCookie');
    response.end('Cookie was deleted. Use "document.cookie" again.');
})

app.listen(3000, function () {
    console.log('What do you want to test today :) ?');
})