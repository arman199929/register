const url = require("url");
const User = require('../models/login.js')
const mainPath = ('../views/main.ejs')
const {validationResult} = require('express-validator')

exports.main = (req,res) => {
    res.render(mainPath,{
        title:'VickyBook',

    })
}