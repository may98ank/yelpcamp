var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var User = require('../models/user');


router.get('/', (req, res)=>{
    res.render("home");
});

router.get('/register', (req, res)=>{
    res.render('register', {page:'register'});
});

router.post('/register', (req, res)=>{
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash('error', err.message + ".");
            return res.redirect("/register");
        }else{
            passport.authenticate("local")(req, res, ()=>{
                req.flash('success', 'You have Successfully registed. Welcome to Yelpcamp ' + user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get('/login', (req, res)=>{
    res.render("login", {page: "login"});
});

router.post('/login', passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res)=>{
});

router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('success', 'Logged Out!');
    res.redirect('/campgrounds');
});

module.exports = router;
