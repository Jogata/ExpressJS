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

// =================   ?QUERY STRING   ===================
// /api/products/query?search=""&limit=2
app.get('/api/products/query', (req, res) => {
    const {search, limit} = req.query;
    let sortedProducts = [...products];

    if (search) {
        sortedProducts = sortedProducts.filter(product => {
            return product.name.startsWith(search);
        })
        if (sortedProducts.length === 0) {
            // return res.status(200).send('Nothing Found');
            return res.status(200).json({success: true, data: []});
        }
    }
    if (limit) {
        return sortedProducts = sortedProducts.slice(0, Number(limit));
    }

    res.status(200).json(sortedProducts);
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
