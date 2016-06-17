const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

const app = express();

app.use(require('./controllers'));

app.listen(3000, () => {
    console.log('listening on port 3000');
});