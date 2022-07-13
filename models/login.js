const connect = require("../db/database");
const bcrypt = require("bcrypt");
const {log} = require("util");
const saltRound = 10;

module.exports = class Login{
    constructor(username,password){}
 static login(username, password) {

    return new Promise(function (resolve, reject) {
        const sql = 'SELECT id,password FROM users WHERE username = ?';
        connect.query(sql, [username])
            .then(result => {
                const r = result[0][0]
                console.log(r)
                if (r.id > 0) {

                    if (!password) {
                        reject(false)

                    }
                    resolve(r.id)
                } else {
                    reject(false)
                }
            }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}}