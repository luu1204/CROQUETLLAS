const router = require("express").Router()
const User = require("../models/User.model")
const bycrypt = require("bcryptjs")

router.get("/register", (req,res)=>{
    res.render("auth/register")
})
router.post("/register", async(req,res)=>{
    const{username, password} = req.body
    if (!username || !password) {
        res.render("auth/register", {err:"*Completa todos los campos"})
        return
    }
    try{
        const salt = await bycrypt.genSalt(13)
        const hashedPassword = await bycrypt.hash(password,salt)
        const foundUser = await User.findOne({username:username})
        if (foundUser) {
            let err = "Ese usuario ya esta registrado"
            res.render("auth/register", {err})
            return
        }
        await User.create({username:username, password:hashedPassword})
        res.redirect("/auth/login")
    }
    catch(err){
        console.log(err)
    }

})
router.get("/login", (req,res)=>{ 
    res.render("auth/login")
})
router.post("/login",async (req,res)=>{
    const {username, password} = req.body
    if (!username || !password) {
        res.render("auth/login", {err:"Completa los campos"})
        return
    }

    try{
        const foundUser = await User.findOne({username: username})
        if(foundUser === null){
            let err = "El usuario no existe"
            res.render("auth/login", {err})
            return
        }
        const isPasswordOK = await bycrypt.compare(password, foundUser.password)
        
        if (!isPasswordOK) {
            let err = "la contraseña es incorrecta"
            res.render("auth/login",{err})
                return
        }
        req.session.user = {
            _id: foundUser._id,
            username:foundUser.username
        }
        req.app.locals.isUserActive = true
        req.session.save(()=>{
            res.redirect("/")
        })
    }

    catch(err){
        console.log(err)
    }
})
router.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        req.app.locals.isUserActive = false
        res.redirect("/")
    })
})


module.exports = router
