const express = require('express');
const {body} = require("express-validator");
const mainController = require('../controller/mainController')
const homeController = require('../controller/registerController.js');
const loginController = require('../controller/loginController.js');
const adminController = require('../controller/adminController')

const signOut = require('../controller/signOut.js')
const homeRouter = express.Router();


homeRouter.get('/',mainController.main)

/** Register routers **/
homeRouter.post('/register', homeController.register);
homeRouter.get('/register', homeController.regMode);

/** Login routers**/
homeRouter.get('/login', loginController.login);
homeRouter.post('/login', loginController.doLogin);

/**Sign out**/
homeRouter.post('/signout',signOut.sign_out)

/**Admin routers**/

homeRouter.get('/admin',adminController.adminLogin);
homeRouter.post('/admin/log', adminController.adminParams)
homeRouter.post('/admin/delete',  adminController.deleteUser)
homeRouter.get('/admin/edit/:id', adminController.editUsers)

homeRouter.post('/admin/update', adminController.update);



module.exports = homeRouter;