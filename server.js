const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

require('./config/passport')(passport);

const app = express();

app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(session({ 
    secret: 'ijfoi2jfoi23jfoijf2oijf2jf',
    resave: true,
    saveUninitialized: true ,
    httpOnly: false,
    cookie: {maxAge: 36000000}
})); 
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./middlewares/sse'))
app.use(require('./controllers'));

app.listen(3000, () => {
    console.log('listening on port 3000');
});