var express = require('express');
var router = express.Router({mergeParams: true});
var CampgroundDb = require('../models/campground');
var CommentDb = require('../models/comment');
var middleware = require('../middleware')


router.get('/', (req, res)=>{
    CampgroundDb.find({}, (err, campgrounds)=>{
        if(err || !campgrounds){
            req.flash('error', 'Ooops!! Something went wrong.');
            res.redirect('/');
        }else{
            let display_data = {
                campgrounds : campgrounds,
                page: "campgrounds"
            };
            res.render('campgrounds/index', display_data);
        }
    });
});

router.post('/', middleware.isLoggedIn, (req, res)=>{
    var campground = { name : req.body.name,
        image : req.body.image,
        price: req.body.price,
        description : req.body.description,
        creator: {
            id: req.user._id,
            username: req.user.username
        }
    }
    CampgroundDb.create(campground, (err, campground)=>{
        if(err || !campground){
            req.flash('error', 'Ooops!! Something went wrong.');
            res.redirect('/campgrounds');
        }else{
            req.flash('success', 'Campground is Successfully Created.');
            res.redirect('/campgrounds');
        }
    });
});

router.get('/new', middleware.isLoggedIn, (req, res)=>{
    res.render('campgrounds/new');
});

router.get('/:id', (req, res)=>{
    CampgroundDb.findById(req.params.id).populate
    ('comment').exec((err, campground)=>{
        if(err || !campground){
            req.flash('error', 'Ooops!! Something went wrong.');
            res.redirect('/campgrounds');
        }else{
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

router.get('/:id/edit', middleware.checkCampgroundOwnership,(req, res)=>{
    CampgroundDb.findById(req.params.id, (err, campground)=>{
        if(err || !campground){
            req.flash('error', 'Ooops!! Something went wrong.');
            res.redirect('/campgrounds');
        }else{
            res.render("campgrounds/edit", {campground: campground});
        }
    });
});

router.put('/:id', middleware.checkCampgroundOwnership, (req, res)=>{
    var campground = { name : req.body.name,
        price: req.body.price,
        image : req.body.image,
        description : req.body.description,
    }
    CampgroundDb.findByIdAndUpdate(req.params.id, campground, (err, cg)=>{
        if(err || !campground){
            req.flash('error', 'Ooops!! Something went wrong.');
            res.redirect('/campgrounds');
        }else{
            req.flash('success', 'Campground is successfully updated.');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

router.delete('/:id', middleware.checkCampgroundOwnership, (req, res)=>{
    CampgroundDb.findByIdAndRemove(req.params.id, (err, campgroundRemoved)=>{
        if(err || !campgroundRemoved){
            req.flash('error', 'Ooops!! Something went wrong.');
            res.redirect('back');
        }else{
            CommentDb.deleteMany( {_id: { $in: campgroundRemoved.comment } }, (err) => {
                if (err) {
                    console.log(err);
                }
                req.flash('success', 'Campground is sucessfully Deleted.');
                res.redirect("/campgrounds");
            });
        }
    });
});

module.exports = router;