const express = require('express');
const app = express();

function middleware() {
    console.log('middleware');
    const err = new Error('This is An Error');
    next(err);
}

function catchAllErrors(err, req, res, next) {
    res.send('Error catched');
}

app.use(middleware);

app.get('/', (req, res, next) => {
    res.send('<h1>How to Catch Errors in Express');
})

app.use(catchAllErrors);

app.listen(3000);
