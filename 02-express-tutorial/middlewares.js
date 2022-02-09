// different ways to apply middleware

const logger = require('./demo/logger');
const logger1 = require('./demo/logger');
const logger2 = require('./demo/logger');
const logger3 = require('./demo/logger');
const authorize = require('./demo/authorize');


app.use(logger);
// apply ONE middleware to all routes =>      /     /log     /api/products    /api/users    /about
// -------------------------------------------------------------------------------------------------------
app.use([authorize, logger]);  // execute authorize first, then logger
app.use([logger, authorize]);  // execute logger first, then authorize
// apply TWO middlewares to all routes =>      /     /log     /api/products    /api/users    /about
// -------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------
// apply ONE middleware to single route
app.get('/log', logger1, (req, res) => {
    res.send('Log');
})
// apply TWO middlewares to single route
app.get('/log', [logger1, authorize], (req, res) => {
    res.send('Log');
})
// -------------------------------------------------------------------------------------------------------

app.use('/api', logger2);
// will apply middleware to all routes starting with /api =>     /api/products    /api/users

app.get('/', (req, res) => {
    res.send('Home');
})

app.use(logger3);
// will apply middleware to all routes below, but not for the routes above =>    /api/products     /api/users     /about

app.get('/api/products', (req, res) => {
    res.send('Products');
})
app.get('/api/users', (req, res) => {
    res.send('Users');
})
app.get('/about', (req, res) => {
    res.send('About');
})