'user strict';
const Product = require("../model/product");


exports.getLogin = (req,res) => {
    res.render('login');
};
exports.getSignup = (req, res)=>{
    res.render('register');
}

exports.getRegister = (req,res)=>{
    res.render('register');
}

exports.getIndex = (req, res)=>{
    res.render("new");
};

exports.search = (req, res)=>{
    res.render("search", {product: null});  
};
exports.saveUser = (req,res)=>{
        if(req.skip) next();
        let userParams ={
            name: req.body.name,
            email : req.body.email,
            password : req.body.password
    };
        let newUser = new User(userParams);
        console.log(newUser);
        User.register(newUser, req.body.password, (error, user)=>{
            if(error){
                console.log(error);
                res.locals.redirect = "/users/new";
                next();
            }
            else{
                res.locals.redirect = "/users";
                next();
            }
        });
    },


exports.saveProduct = (req, res)=>{
    const code = req.body.code;
    const description = req.body.description;
    const price = req.body.price;

    const newProduct = new Product({code: code, description: description, price: price});
    newProduct.save()
    .then(result=> {
        req.flash("success_msg", "Product Data added To Database successfully");
        res.redirect("/");})
    .catch(error=>{
        req.flash("error_msg", "Product not added");
        console.log(error);
    });

};

exports.FindOneProduct = (req, res)=>{
const searchQuery = {code: req.query.code};
Product.findOne(searchQuery).then(product=>{
    if (product !== null) {
        res.render("search", {product: product});
    } else {
        req.flash("error_msg", "Product does not exist with this name");
        res.redirect("/product/search");
    }
})
    .catch(error=>{   
        req.flash("error_msg", " not found");
    res.redirect("/");}
);
};

exports.allProducts = (req, res)=>{
    // const user = [{id:"23459ae120678", code: "200", description: "Amy Bienvenu", price: 500}];
    // res.render("index", {users: user});
    Product.find({}).then(product=>{
        res.render("list", {product: product});
    }).catch(
        error=>{
            res.redirect("/");
        }
    );
};

exports.editProduct = (req, res)=>{
    const searchById = {_id: req.params.id};
    Product.findOne(searchById).then(
        product=>{res.render("edit", {product: product});}
    ).catch(error => {res.redirect("/");});

};

exports.update = (req, res)=>{
    const searchQuery = {_id: req.params.id};
    Product.updateOne(searchQuery, {$set: {
        code: req.body.code,
        description: req.body.description,
        price: req.body.price,
    }}).then((product)=>{
        req.flash("success_msg", "Product data updated successfully");
        res.redirect("/");
    })
    .catch(error => {
        req.flash("error_msg", "Product not deleted");
        res.redirect("/");});

};



exports.delete = (req, res)=>{

    const searchQuery = {_id: req.params.id}; 
    Product.deleteOne(searchQuery).then(()=>{
        req.flash("success_msg", "Product deleted successfully");
        res.redirect("/");
    }).catch(error=>{
        req.flash("error_msg", "Product not deleted");
        res.redirect("/");
    });

};