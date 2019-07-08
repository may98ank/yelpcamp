var express = require('express');
var router = express.Router({mergeParams: true});
var CampgroundDb = require('../models/campground');
var CommentDb = require('../models/comment');
var middleware = require('../middleware');

router.get('/new', middleware.isLoggedIn, (req, res)=>{
    CampgroundDb.findById(req.params.id, (err, campground)=>{
        if(err || !campground){
            req.flash('error', 'Ooops!! Something went wrong.');
            res.redirect('back');
        }else{
            res.render("comments/new", {campground : campground});
        }
    });
});

router.post('/', middleware.isLoggedIn, (req, res)=>{
    CampgroundDb.findById(req.params.id, (err, campground)=>{
        if(err || !campground){
            req.flash('error', 'Ooops!! Something went wrong.');
            res.redirect('back');
        }else{
            CommentDb.create(req.body.comment, (err, comment)=>{
                if(err || !comment){
                    req.flash('error', 'Ooops!! Something went wrong.');
                    res.redirect('back');
                }else{
                    comment.author = {
                        id: req.user._id,
                        username: req.user.username
                    }
                    comment.save();
                    campground.comment.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res)=>{
    CommentDb.findById(req.params.comment_id, (err, comment)=>{
        if(err || !comment){
            req.flash('error', 'Ooops!! Something went wrong.');
            res.redirect('back');
        }else{
            res.render("comments/edit", {
                comment: comment ,
                campground_id: req.params.id
            });
        }
    });
});

router.put('/:comment_id', middleware.checkCommentOwnership, (req, res)=>{
    CommentDb.findByIdAndUpdate(req.params.comment_id,
         req.body.comment, (err, updatedComment)=>{
             if(err || !updatedComment){
                req.flash('error', 'Ooops!! Something went wrong.');
                res.redirect("back");
             }else{
                res.redirect('/campgrounds/' + req.params.id);
             }
         });
});

router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res)=>{
    CommentDb.findByIdAndRemove(req.params.comment_id, (err)=>{
        if(err){
            res.redirect("back");
        }else{
            req.flash('success', 'Comment is Deleted');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});


module.exports = router;