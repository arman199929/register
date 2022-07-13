const connect = require("../db/database.js");
const bcrypt = require("bcrypt");
const {log} = require("util");

module.exports = class Admin {
    constructor() {
    }
    /**Gel all users from database**/
    static getUsers() {
        return new Promise(function (resolve, reject) {
            const sql = 'SELECT id,full_name,username,city,phone,whatsapp FROM users';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }

    /**Delete selected users**/
    static delete(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM users WHERE id = ?'
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**Change user parameters expect admin**/
    static edit(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id, full_name, username, city, phone, whatsapp FROM users WHERE id = ?'
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static update(data) {

        return new Promise((resolve, reject) => {
            const mysql = 'UPDATE users SET full_name = ?, username = ?, city = ?,phone = ?, whatsapp = ? WHERE id = ?'

            connect.query(mysql, data)
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}