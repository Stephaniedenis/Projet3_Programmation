const express = require('express');
const router = express.Router();
const homeController = require('./homeController');

router.get("/", homeController.allUsers);

router.get("/new", homeController.getIndex);

router.post("/new", homeController.saveUser);

router.get("/product/search", homeController.search);

router.get("/search", homeController.FindOneUser);

router.get("/edit/:id", homeController.editUser);

router.put("/edit/:id", homeController.update);

router.delete("/delete/:id", homeController.delete);


module.exports = router;
