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
const redirectHome = (req, res, next) => {
    if (req.session.userID) {
        res.redirect('/home');
    } else {
        next();
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

app.get('/login', redirectHome, (req, res) => {
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

app.get('/register', redirectHome, (req, res) => {
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

app.post('/login', redirectHome, (req, res) => {
    const { name, password } = req.body;
    // TODO: validate input
    // TODO: hash password
    if (name && password) {
        const user = users.find(user => {
            return user.name === name && user.password === password;
        })

        if (user) {
            req.session.userID = user.id;
            return res.redirect('/home');
        }
    }
    res.send('Wrong user/pass');
})

app.post('/register', redirectHome, (req, res) => {
    const { name, email, password } = req.body;
    // TODO: validate input
    // TODO: hash password
    if (name && email && password) {
        const isUserExist = users.some(user => {
            return user.name === name;
        })

        if (!isUserExist) {
            const user = {
                id: users.length + 1,
                name,
                email,
                password,
            }

            users.push(user);
        }
    }
    res.send('User exist');
})

app.post('/logout', redirectLogin, (req, res) => {
    res.send('logout');
})

app.listen(3000, () => {
    console.log('3000...');
});