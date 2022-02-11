// add * ?user=jogata * to the URL in the browser to pass Authorize Middleware
const logger = require('./demo/logger');
const authorize = require('./demo/authorize');

app.get('/demo', logger, (req, res) => {
    res.send('<h1>Demo Home Page</h1><a href="/demo/api/products">Products</a>');
})

app.get('/demo/jogata', logger, (req, res) => {
    res.send('<h1>Demo Home Page</h1><a href="/demo/api/products/?user=jogata">Products</a>');
})

app.get('/demo/api/products', [logger, authorize], (req, res) => {
    res.json(products);
})