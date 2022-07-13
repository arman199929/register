const url = require("url");
const Login = require('../models/login.js')
const logPath = ('../views/layouts/log.ejs'), welPath = ('../views/backend/dashboard.ejs')
const {validationResult} = require('express-validator')


exports.login = (req, res) => {

    const urlValue = Object.keys(req.query).toString()
    let pass, username = "";
    if (urlValue === 'password')
        pass = urlValue
    if (urlValue === 'username')
        username = urlValue


    res.render(logPath, {
        title: 'Login',
        layout: ``,
        pass, username
    })
}

exports.doLogin = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param

        if (arrParam === 'password' || arrParam === 'username') {
            return res.redirect(url.format({
                pathname: '/backend/dashboard.ejs',
                query: {
                    error: arrParam
                }
            }))
        }
    }
    const username = req.body.username;
    const password = req.body.password;
    let path = ''

    Login.login(username, password)

        .then(result => {
            if (Number.isInteger(result)) {

                path = ''
                req.session = result
                console.log(result)


            }
            res.render(welPath, {
                title: 'Welcome'
            })
        })
        .catch(err => {
            console.log(err)
        });
}