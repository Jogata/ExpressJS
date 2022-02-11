const express = require('express');
const {products} = require('./data');
const users = require('./routes/users');

const app = express();

// Set Static Files
app.use(express.static('./methods-public'));

// =================   MIDDLEWARE   =================
// BodyParser (middleware that give you access to the data from the body of the request)
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// TODO Login

// Login (test)
app.post('/login', (req, res) => {
    const {name} = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`);
    }
    res.status(401).send('Missing Name and/or Password');
})

// =================   ROUTES   =================
app.use('/api/people', users);


app.get('/api/products/names', (req, res) => {
    const productsNames = products.map(product => {
        return product.name;
    })
    res.json(productsNames);
})

// =================   :PARAMS   ===================
// Respond to request for Product by ID using Params
app.get('/api/products/id/:productID', (req, res) => {
    const {productID} = req.params;
    const product = products.find(product => product.id === Number(productID));
    if (!product){
        return res.status(404).send('Product Does Not Exist');
    }
    return res.json(product);
})

// Respond to request for Product using more Params
app.get('/api/products/id/:productID/reviews/:reviewID', (req, res) => {
    res.json(req.params);    // => { productID: "{:productID}", reviewID: "{:reviewID}"}
})

// =================   ?QUERY STRING   ===================
// Respond to request for Product by name using Query
    // /api/products/query?search=leather&limit=2  / => first two products with 'leather' in the name
    // /api/products/query?search=leather          / => all products with 'leather' in the name
    // /api/products/query?limit=2                 / => first two products
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
        sortedProducts = sortedProducts.slice(0, Number(limit));
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
