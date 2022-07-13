const bcrypt = require('bcrypt');
const connect = require("../db/database.js");
const {log} = require("util");
const saltRound = 10;

module.exports = class User {
    constructor(full_name, username,password,city, phone, whatsapp ) {
        this.full_name = full_name;
        this.username = username;
        this.password = password;
        this.city = city;
        this.phone = phone;
        this.whatsapp = whatsapp;

    }



    register() {

        // const hash = bcrypt.hashSync(pass(1),saltRound)
        let uArr = [this.full_name, this.username,this.password,this.city, this.phone, this.whatsapp, ];
        console.log(uArr)
        return new Promise((res, rej) => {
            const sql = 'INSERT INTO users (full_name,username,password,city, phone,whatsapp) VALUES (?,?,?,?,?,?)';
            connect.query(sql, uArr)
                .then(result => {
                    res(result[0].insertId);
                })
                .catch(err => {
                    console.log(err)
                    rej(err)
                })
        })
    }



}