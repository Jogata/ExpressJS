const express = require('express');
const session = require('express-session');
const {users} = require('../data');

const app = express();

// BodyParser (middleware that give you access to the data from the body of the request)
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    name: 'sid',
    secret: 'This is a secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true,
        // secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        // maxAge: 1000 * 60 * 60 * 24  // 1 day
    },
}));

const redirectLogin = (req, res, next) => {
    if (req.session.userID) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/', (req, res) => {
    const { userID } = req.session;
    res.send(`
        <h1>Welcome!</h1>
        ${userID ? `
        <a href='/home'>Home</a>
        <form method='post' action='/logout'>
            <button>Logout</button>
        </form>` : `
        <a href='/login'>Login</a>
        <a href='/register'>Register</a>
        `} 
    `)
})

app.get('/home', redirectLogin, (req, res) => {
    res.send(`
    <h1>Welcome!</h1>
    <a href='/'>Main</a>
    <ul>
        <li>Name: </li>
        <li>ID: </li>
    </ul>
    `)
})

app.get('/login', (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form method='post' action='/login'>
        <input type="text" name="name" id="name" placeholder="Name" required"/>
        <input type="password" name="password" id="password" placeholder="Password" required"/>
        <input type="submit"/>
        </form>
        <a href='/register'>Register</a>
    `);
})

app.get('/register', (req, res) => {
    res.send(`
        <h1>Register</h1>
        <form method='post' action='/register'>
        <input type="text" name="name" id="name" placeholder="Name" required"/>
        <input type="email" name="email" id="email"/>
        <input type="password" name="password" id="password" placeholder="Password" required"/>
        <input type="submit"/>
        </form>
        <a href='/login'>Login</a>
    `);
})

app.post('/login', (req, res) => {
    res.send('post log');
})

app.post('/register', (req, res) => {
    res.send('post reg');
})

app.post('/logout', (req, res) => {
    res.send('logout');
})

app.listen(3000, () => {
    console.log('3000...');
});