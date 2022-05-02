const express = require('express');
const router = express.Router();
const homeController = require('./homeController');
const usersController1 = require('./usersController1');
const User = require('../model/user')

//router.get("/", homeController.getLogin);
router.get('/', homeController.allUsers);

router.post("/user/new", usersController1.authenticate);

router.get("/login", homeController.getLogin);

router.post("/login", usersController1.authenticate);

router.get("/signup", homeController.getSignup);

//router.get("/logout", isAuthenticatedUser, (req, res)=> {
//req.logOut() ;
//     // etc
// });
router.get("/register", homeController.getRegister);

router.get("/list", homeController.allProducts);

router.get("/user/new", homeController.getIndex);

router.get("/:id", homeController.FindOneUser);

router.post("/new", homeController.saveProduct);

router.get("/product/search", homeController.search);

router.get("/search", homeController.FindOneProduct);

router.get("/edit/:id", homeController.editProduct);

router.put("/edit/:id", homeController.update);

router.delete("/delete/:id", homeController.delete);


module.exports = router;
