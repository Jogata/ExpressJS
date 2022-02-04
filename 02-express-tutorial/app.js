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

app.get('api/products/names', (req, res) => {
    const productsNames = products.map(product => {
        return product.name;
    })
    res.json(productsNames);
})
// Respond to request for Product by ID
app.get('api/products/1', (req, res) => {
    const product = products.find(product => {
        return product;
    })
    res.json(product);
})
app.get('api/products/2', (req, res) => {
    const product = products.find(product => {
        return product;
    })
    res.json(product);
})
app.get('api/products/3', (req, res) => {
    const product = products.find(product => {
        return product;
    })
    res.json(product);
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
