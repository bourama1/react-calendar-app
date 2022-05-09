const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../../middleware/authenticate");

router.post("/api/user/create", async (req, res)=> {
    if (!req.body.project) {
        req.body.project="";
    }
    const user = new User(req.body);
    if (!req.body.confirmPassword||!(req.body.confirmPassword===req.body.password)) {
        res.send({message: "Passwords are not same"});
        return;
    }

    user.password = await bcrypt.hash(user.password, 12);
    user.save().then(() => {
        res.send({message: "Registration OK"});
    }).catch(()=>{
        res.send({message: "Registration error"});
    },
    );
});

router.post("/api/login", async (req, res) => {
    const foundUser = await User.findByCredentials(req.body);
    req.session.user_id = foundUser._id;
    if (!foundUser) {
        return;
    }
    res.send({
        user: foundUser,
    });
});

router.get("/api/users/:id", authenticate, (req, res)=>{
    User.findOne({_id: req.params.id}).then((user)=> res.send(user));
});

router.get("/api/users", authenticate, (req, res)=>{
    User.find({}).then((users)=> res.send(users));
});

router.post("/logout", authenticate, (req, res)=>{
    req.session.user_id = null;
    res.send({message: "Logout successful"});
});

router.get("/api/me/token", authenticate, (req, res)=>{
    res.send({token: req.session.user_id});
});

router.get("/api/me", authenticate, (req, res)=>{
    User.findOne({_id: req.session.user_id}).then((user)=> res.send(user));
});

module.exports = router;
