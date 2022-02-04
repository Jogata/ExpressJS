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

// =================   :PARAMS   ===================
// Respond to request for Product by ID using params
app.get('/api/products/:productID', (req, res) => {
    const {productID} = req.params;
    const product = products.find(product => product.id === Number(productID));
    if (!product){
        return res.status(404).send('Product Does Not Exist');
    }
    return res.json(product);
})

// Respond to request for Product using more params
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    res.json = req.params; // will return { productID: "{:productID}", reviewID: "{:reviewID}"}
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
