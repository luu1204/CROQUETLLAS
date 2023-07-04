const router = require("express").Router()
const User = require("../models/User.model")
const Product = require("../models/product.model")
const uploader = require("../middleware/uploader");


router.get("/create", (req,res)=>{
    
    if (req.session.user == undefined) {
        res.redirect("/")
        return
    }
    res.render("product/create")
})

router.post("/create", uploader.single("image"), async (req,res)=>{
    const {name, price, tel} = req.body
    const {_id} = req.session.user 

    try{
        const product = await Product.create({name, price: price, owner:_id,image: req.file.path, number:tel})
        console.log(product)
        await User.findByIdAndUpdate(_id, {$addToSet:{products: product._id}})
    
    }
    catch(err){
        console.log(err)
    }
    res.redirect("/")
})
router.get("/all", async (req, res)=>{

    try{
        const products = await Product.find()
        res.render("product/allproduct",{products})
    }catch(err){
        console.log(err)
    }
})

router.get("/oneProduct/:id", async (req, res)=>{
    const {id} = req.params
    try{
    const Producto = await Product.findById(id)
        res.render("product/product", {Producto})
    }catch(err){
        console.log(err)
    }
})

router.get("/delete/:id", async (req,res)=>{
    const {id} = req.params
    console.log(req.session.user)
    const {_id} = req.session.user
    try{
        const product = await Product.findByIdAndDelete(id)
        await User.findByIdAndUpdate(_id, {$pull: {products: product._id}})

            res.redirect("/product/all")
        }catch(err){
            console.log(err)
        }

})

router.get("/update/:id", async (req, res)=>{
    const {id} = req.params
    try{
        const product = await Product.findById(id)
        console.log(product, "ww")
        res.render("product/updateproduct", {product})
        }catch(err){
            console.log(err)
        }
})

router.post("/update/:id", async (req,res)=>{
    const {id} = req.params
    try{
        const {name, price} = req.body
        await Product.findByIdAndUpdate(id, {name:name, price:price})
        res.redirect("/product/all")
        }catch(err){
            console.log(err)
        }
})



module.exports = router