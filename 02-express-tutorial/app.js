const express = require('express');
const products = require('./data');

const app = express();

// Set Static Files
app.use(express.static('./methods-public'));

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/products">Products</a>');
})

app.get('api/products', (req, res) => {
    res.json(products);
})

app.get('/about', (req, res) => {
    res.send('About Page');
})

app.all('*', (req, res) => {
    res.send('Not Found');
})


app.listen(5000, () => {
    console.log('server is listening on port 5000...');
})
