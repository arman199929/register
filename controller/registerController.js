const {validationResult} = require("express-validator");
const url = require("url");
const User = require('../models/register.js');
const rPath = '../views/layouts/registr.ejs', logPath = ('../views/layouts/log.ejs'),
    welPath = ('../views/backend/dashboard.ejs');
const bodyParser = require('body-parser');


exports.regMode = (req, res) => {
    res.render(rPath, {
        title: 'Register',
        layout: ``
    })


}

exports.register = (req, res) => {

    if (!req.body) return res.sendStatus(400);

    const vErr = validationResult(req)
    console.log(vErr)
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param

        if (arrParam === 'full_name' || arrParam === 'username' || arrParam === 'password' || arrParam === 'city'
            || arrParam === 'phone' || arrParam === 'whatsapp') {
            return res.redirect(url.format({
                pathname: '/',
                query: {
                    error: arrParam
                }
            }))
        }


    }
    const user = new User(req.body.full_name, req.body.username, req.body.password, req.body.city, req.body.phone, req.body.whatsapp);
    user.register().then(result => {
        res.redirect(`/`)
    }).catch(err => {
        res.sendStatus(404)
        console.log(err)
    })


}