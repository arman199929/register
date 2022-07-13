const url = require('url');
const Admin = require('../models/admin.js');
const {validationResult} = require("express-validator");
const Login = require("../models/login");
const admPath = ('../views/admin/adminLog.ejs'), admParamsPath = ('../views/admin/')


/**Login as admin **/
exports.adminLogin = (req, res) => {
    const urlValue = Object.keys(req.query).toString()
    let pass, username = "";
    if (urlValue === 'password')
        pass = urlValue
    if (urlValue === 'username')
        username = urlValue
    res.render(admPath, {
        title: 'Admin login',
        layouts: '../views/admin/adminLog.ejs',
        pass, username
    })
}

/**Get all users **/
exports.adminParams = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param

        if (arrParam === 'password' || arrParam === 'username') {
            return res.redirect(url.format({
                pathname: '../views/main.ejs',
                query: {
                    error: arrParam
                }
            }))
        }
    }
    const username = req.body.username;
    const password = req.body.password;

    if (username === 'user123' && password === '123456') {
        Admin.getUsers()
            .then(result => {
                res.render(`admin/admin.ejs`, {
                    title: "USER LIST",
                    users: result
                })
            })
            .catch(err => {
                console.log(err)

            })
    } else {
        res.sendStatus(404)
    }

}

/**Delete users **/
exports.deleteUser = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'id') {
            return res.redirect(url.format({
                pathname: '../views/main.ejs',
                query: {
                    error: arrParam
                }
            }))
        }
    }

    const dId = req.body.id
    Admin.delete(dId)
        .then(result => {
            res.render('admin/admin.ejs', {
                title: '',
                users: Admin.getUsers()
                    .then(result => {
                        res.render(`admin/admin.ejs`, {
                            title: "USER LIST",
                            users: result
                        })
                    })
                    .catch(err => {
                        console.log(err)

                    })
            })


        }).catch(err => {
        res.sendStatus(404)
        console.log(err)
    })

}


/**Change Users parameters**/
exports.editUsers = (req, res) => {
    const id = req.params.id
    Admin.edit(id)
        .then(result => {
            res.render(`${admParamsPath}edit.ejs`, {
                title: "Edit user parameters",
                layout: '../views/admin/admin.ejs',
                user: result
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.update = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'full_name' || arrParam === 'username' || arrParam === 'city'
            || arrParam === 'phone' || arrParam === 'whatsapp' || arrParam === 'id') {
            return res.redirect(url.format({
                pathname: '/admin',
                query: {
                    error: arrParam
                }
            }))
        }
    }

    const data = [req.body.full_name, req.body.username, req.body.city, req.body.phone, req.body.whatsapp, req.body.id]


    Admin.update(data)
        .then(result => {
            res.render('admin/admin.ejs', {
                title: '',
                users: Admin.getUsers()
                    .then(result => {
                        res.render(`admin/admin.ejs`, {
                            title: "USER LIST",
                            users: result
                        })
                    })
                    .catch(err => {
                        console.log(err)

                    })
            })
            console.log('this')
        })
        .catch(err => {
            res.redirect(url.format({
                pathname: '/admin'
            }))
            console.log(err)
        })
};