const express = require('express');
const router = express.Router();
const homeController = require('./homeController');
const usersController1 = require('./usersController1');
// const User = require('../model/user')


router.get('/', homeController.redirect);
router.get('/index', homeController.redirect);

router.post("/userNew", usersController1.validate, homeController.saveUser);

router.get("/login", homeController.getLogin);

router.post("/login", usersController1.authenticate); //, usersController1.redirectView);

router.get("/signup", homeController.getSignup);

router.get("/logout", usersController1.logout, homeController.getLogin);

router.get("/list", homeController.allProducts, homeController.getIndex);

router.get("/new", usersController1.ensureAuthenticated, homeController.getNew);

router.post("/new", usersController1.ensureAuthenticated, homeController.saveProduct);

router.get("/search", usersController1.ensureAuthenticated, homeController.search);

router.get("/searchOne", homeController.FindOneProduct);

router.get("/edit/:id", homeController.editProduct);

router.put("/edit/:id", homeController.update);

router.delete("/delete/:id", homeController.delete);


module.exports = router;
