const router = require("express").Router()

const User = require("../models/User.model")


router.get("/profile", async (req,res)=>{
    const {_id, username} = req.session.user
    try{
        const usuario = await User.findById(_id).populate("products")
        res.render("user/profile", {username, products: usuario.products})
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router