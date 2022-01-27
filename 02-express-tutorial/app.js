// set index.html as Home page, add static files

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./methods-public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './methods-public/index.html'));
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
