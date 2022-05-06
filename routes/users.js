const express = require('express');
const router = express.Router();
const homeController = require('./homeController');
const usersController1 = require('./usersController1');
// const User = require('../model/user')


router.get('/', homeController.redirect);

router.post("/userNew", homeController.saveUser);

router.get("/login", homeController.getLogin);

router.post("/login", usersController1.authenticate);

router.get("/signup", homeController.getSignup);

// router.get("/logout", homeController.getLogout);

router.get("/list", homeController.allProducts, homeController.getIndex);

router.get("/new", homeController.getNew);

router.post("/new", homeController.saveProduct);

router.get("/search", homeController.search);

router.get("/searchOne", homeController.FindOneProduct);

router.get("/edit/:id", homeController.editProduct);

router.put("/edit/:id", homeController.update);

router.delete("/delete/:id", homeController.delete);


module.exports = router;
