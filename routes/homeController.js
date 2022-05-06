'user strict';
const Product = require("../model/product");
const User = require("../model/user");


exports.getLogin = (req,res) => {
    res.render('login');
};
exports.getSignup = (req, res)=>{
    res.render('register');
};

exports.getIndex = (req, res)=>{
    res.render('list');
};
exports.getNew = (req, res)=>{
    res.render('new');
};

exports.search = (req, res)=>{
    res.render('search', {product: null});  
};
exports.saveUser = (req, res, next)=>{

    if(req.skip) next();

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    
    let newUser = new User({name: name, email: email, password: password});

    User.register(newUser, req.body.password, (error, user)=>{
        if (error){
            next();
        }else{
            res.render('login');
            next();
        }
    });
 };

exports.redirect= (req, res)=>{
    res.redirect("/list")
}

exports.saveProduct = (req, res)=>{
    const code = req.body.code;
    const description = req.body.description;
    const price = req.body.price;

    const newProduct = new Product({code: code, description: description, price: price});
    newProduct.save()
    .then(result=> {
        req.flash("success_msg", "Product Data added To Database successfully");
        res.redirect("/edit");})
    .catch(error=>{
        req.flash("error_msg", "Product not added");
        console.log('/list');
    });

};

exports.FindOneProduct = (req, res)=>{
const searchQuery = {code: req.query.code};
Product.findOne(searchQuery)
.then(product=>{
    if (product !== null) {
        res.render("search", {product: product});
    } else {
        req.flash("error_msg", "Product does not exist with this name");
        res.redirect("/search");
        
    }
})
.catch(error=>{   
    req.flash("error_msg", " not found");
    res.redirect("/search");
});
};

exports.allProducts = (req, res, next)=>{
    if (req.isAuthenticated()){
        Product.find({})
        .then(product=>{
            res.locals.product = product;
            next();
        }).catch(
            error=>{
                res.redirect("/list");
            }
        );
    }else{
        res.locals.product = undefined;
        next();
    }
};

exports.editProduct = (req, res)=>{
    const searchById = {_id: req.params.id};
    Product.findOne(searchById).then(
        product=>{res.render("edit", {product: product});}
    ).catch(error => {res.redirect("/list");});

};

exports.update = (req, res)=>{
    const searchQuery = {_id: req.params.id};
    Product.updateOne(searchQuery, {$set: {
        code: req.body.code,
        description: req.body.description,
        price: req.body.price,
    }}).then((product)=>{
        req.flash("success_msg", "Product data updated successfully");
        res.redirect("/list");
    })
    .catch(error => {
        req.flash("error_msg", "Product not deleted");
        res.redirect("/list");});

};



exports.delete = (req, res)=>{

    const searchQuery = {_id: req.params.id}; 
    Product.deleteOne(searchQuery).then(()=>{
        req.flash("success_msg", "Product deleted successfully");
        res.redirect("/list");
    }).catch(error=>{
        req.flash("error_msg", "Product not deleted");
        res.redirect("/list");
    });

};