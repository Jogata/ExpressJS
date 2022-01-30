'use strict'
// https://expressjs.com/en/4x/api.html#res
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("<h1>Send response with headers, depending on the content</h1>");
    
    // res.end("<h1>Send response without headers</h1>");

    // res.sendFile("./{filename}.{ext}");

    // res.json({header: 'set header type as application/json'});

    // res.redirect(301, '/{newdirection}');

    // res.format({
    //     "text/plain": () => {
    //         res.send('Send response as Text');
    //     },
    //     "text/html": () => {
    //         res.send('<h1>Send response as HTML</h1>');
    //     },
    //     "application/json": () => {
    //         res.send({message: 'Send a JSOn response'});
    //     },
    //     default: () => {
    //         res.status(406).send('Not Acceptable');
    //     }
    // })

    // res.links({
    //     first: "http://localhost:5000/?page=1",
    //     prev: "http://localhost:5000/?page=2",
    //     next: "http://localhost:5000/?page=4",
    //     last: "http://localhost:5000/?page=9",
    //     canonical: "http://localhost:5000/page=3",
    //     prefetch: "http://localhost:5000/{picture1}.{ext}",
    //     preload: "http://localhost:5000/{picture2}.{ext}"
    // })

        // app.set("view engine", "pug");
        // app.set("views", process.cwd() + "/views");
    // let locals = { name: "Jeffrey" };
    // res.render('myview', locals, (err, html) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     res.send(html);
    // })

// Set Headers
    // res.set('Content-Type', 'text/plain');
    // res.set({
    //     'Content-Type': 'text/plain',
    //     'Content-Length': '123',
    //     ETag: '12345'
    //   })

    // res.status(404);

// Sets the Content-Type of the first header
    // res.type('application/json');
// Sets headers after the first header
    // res.append('Access-Control-Allow_Origin', '*');

// Sets the HTTP response Content-Disposition header field to “attachment”
    // res.attachment('path/to/{filename}.{ext}')

    // res.download('/{filename}.{ext}', '/{newfilename}.{ext}', (err) => {
    //     if (err) {
    //       // Handle error, but keep in mind the response may be partially-sent
    //       // so check res.headersSent
    //     } else {
    //       // decrement a download credit, etc.
    //     }
    //   })
})

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log('server is listening on port 5000...');
})
