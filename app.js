const express = require('express');
const app = express();
const path = require('path');
const eL = require('express-ejs-layouts')
const router = require('./routes/routers.js');
const bodyParser = require('body-parser');

app.use(express.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',router);

app.use(eL)


app.listen(5002, () => {
    console.log('Server has started...')
})