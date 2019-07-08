var CampgroundDb = require('../models/campground'),
    CommentDb = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if(!req.isAuthenticated()){
        req.flash("error", "You are not logged in, Please Login!");
        res.redirect('/login');
    }else{
        CampgroundDb.findById(req.params.id, (err, campground)=>{
            if(err){
                req.flash('error', 'Ooops!!!! Something went wrong.');
                res.redirect('back');
            }else{
                console.log(campground);
                var a = req.user._id + "";
                var b = campground.creator.id + "";
                if(a === b){
                    next();
                }else{
                    req.flash('error', 'Sorry, You are not allowed to that!!');
                    res.redirect('/campgrounds');
                }
            }
        });
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next){
    if(!req.isAuthenticated()){
        req.flash("error", "You are not logged in, Please Login!");
        res.redirect('/login');
    }else{
        CommentDb.findById(req.params.comment_id, (err, comment)=>{
            if(err){
                req.flash('error', 'Ooops!!!! Something went wrong.');
                res.redirect("back");
            }else{
                var a = req.user._id;
                var b = comment.author.id;
                if(b.equals(a)){
                    next();
                }else{
                    req.flash('error', 'Sorry, You are not allowed to that!!');
                    res.redirect('back');
                }
            }
        });
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You are not logged in, Please Login First!");
    res.redirect('/login');
};

module.exports = middlewareObj;