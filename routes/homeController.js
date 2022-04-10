exports.respondWithProduct = (req,res) =>{
    let paramsProduct = req.params.myProduct
    res.render ("index",{product:paramsProduct});
};