var campground  = require("./models/campground"),
    comment     = require("./models/comment"),
    mongoose    = require("mongoose");
    
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "HogCamp", 
        image: "https://i.stack.imgur.com/gJGR3.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]

var seedDb = (seedData=null) =>{
    if(!seedData){
       seedData = data; 
    }
    comment.remove({}, (err)=>{
        if(err){
            console.log("Check Comment For Delete");
        }
    });
    campground.remove({}, (err)=>{
        // if(err){
        //     console.log(err);
        // }else{
        //     seedData.forEach((seed)=>{
        //         console.log("hello");
        //         campground.create(seed, (err, createdCampground)=>{
        //             if(err){
        //                 console.log(err);
        //             }else{
        //                 comment.create({
        //                     text: "This place is great, but I wish there was internet",
        //                     author: "Homer"
        //                 },(err, createdComment)=>{
        //                     if(err){
        //                         console.log(err);
        //                     }else{
        //                         createdComment.save();
        //                         createdCampground.comment.push(createdComment);
        //                         createdCampground.save();
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // }
    });
}

module.exports = seedDb;
