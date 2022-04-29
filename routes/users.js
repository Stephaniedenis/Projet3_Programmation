const express = require('express');
const router = express.Router();
const homeController = require('./homeController');
const usersController1 = require('./usersController1');

router.get("/", homeController.getLogin);
router.get("/login", homeController.getLogin);
router.post("/login", usersController1.authenticate);
router.get("/signup", homeController.getSignup);
// router.get("/logout", isAuthenticatedUser, (req, res)=> {
//     req.logOut() ;
//     // etc
// });
router.get("/register", homeController.getRegister);

router.get("/users", homeController.allProducts);

router.get("/new", homeController.getIndex);

router.post("/new", homeController.saveProduct);

router.get("/product/search", homeController.search);

router.get("/search", homeController.FindOneProduct);

router.get("/edit/:id", homeController.editProduct);

router.put("/edit/:id", homeController.update);

router.delete("/delete/:id", homeController.delete);


module.exports = router;
