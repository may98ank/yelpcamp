var express =   require('express'),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose"),
    CampgroundDb = require("./models/campground"),
    CommentDb = require("./models/comment"),
    seed = require('./seed'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user'),
    methodOverride = require('method-override'),
    flash = require('connect-flash');


var campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes = require('./routes/comments'), 
    indexRoutes = require('./routes/index');

var app = express();


app.locals.moment = require('moment');


mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true});
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", 'ejs');
app.use(methodOverride('_method'));
app.use(express.static('public'));

// seed();

app.use(require('express-session')({
    secret: "this is first site I'm gonna Deploy",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(indexRoutes);
app.use( '/campgrounds', campgroundRoutes);
app.use( '/campgrounds/:id/comments', commentRoutes);


app.listen(8080, process.env.IP, ()=>{
    console.log("Yelpcamp............");
});