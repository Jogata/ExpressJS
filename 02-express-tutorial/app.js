// add get, add about, add 404

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Home Page');
})
app.get('/about', (req, res) => {
    res.status(200).send('About Page');
})
app.all('*', (req, res) => {
    res.status(404).send('Not Found');
})

app.listen(5000, () => {
    console.log('server is listening on port 5000...');
})
