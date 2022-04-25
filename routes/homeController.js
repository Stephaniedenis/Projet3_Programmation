'user strict';
const User = require("../model/user");

exports.getIndex = (req, res)=>{
    res.render("new");
};

exports.search = (req, res)=>{
    res.render("search", {user: null});  
};

exports.registerUser = (req,res)=>{
    
};

exports.saveUser = (req, res)=>{
    const code = req.body.code;
    const description = req.body.description;
    const price = req.body.price;

    const newUser = new User({code: code, description: description, price: price});
    newUser.save()
    .then(result=> {
        req.flash("success_msg", "Product Data added To Database successfully");
        res.redirect("/");})
    .catch(error=>{
        req.flash("error_msg", "Product not added");
        console.log(error);
    });

};

exports.FindOneUser = (req, res)=>{
const searchQuery = {code: req.query.code};
User.findOne(searchQuery).then(user=>{
    if (user !== null) {
        res.render("search", {user: user});
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

exports.allUsers = (req, res)=>{
    // const user = [{id:"23459ae120678", code: "200", description: "Amy Bienvenu", price: 500}];
    // res.render("index", {users: user});
    User.find({}).then(user=>{
        res.render("index", {users: user});
    }).catch(
        error=>{
            res.redirect("/");
        }
    );
};

exports.editUser = (req, res)=>{
    const searchById = {_id: req.params.id};
    User.findOne(searchById).then(
        user=>{res.render("edit", {user: user});}
    ).catch(error => {res.redirect("/");});

};

exports.update = (req, res)=>{
    const searchQuery = {_id: req.params.id};
    User.updateOne(searchQuery, {$set: {
        code: req.body.code,
        description: req.body.description,
        price: req.body.price,
    }}).then((user)=>{
        req.flash("success_msg", "Product data updated successfully");
        res.redirect("/");
    })
    .catch(error => {
        req.flash("error_msg", "Product not deleted");
        res.redirect("/");});

};



exports.delete = (req, res)=>{

    const searchQuery = {_id: req.params.id}; 
    User.deleteOne(searchQuery).then(()=>{
        req.flash("success_msg", "Product deleted successfully");
        res.redirect("/");
    }).catch(error=>{
        req.flash("error_msg", "Product not deleted");
        res.redirect("/");
    });

};