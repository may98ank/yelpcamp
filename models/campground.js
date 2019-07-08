var mongoose = require("mongoose");

var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    createdAt: {type: Date, default: Date.now },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }    
    ],
    creator:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
});

const Comment = require('./comment');
campgroundSchema.pre('remove', async function() {
	await Comment.remove({
		_id: {
			$in: this.comment
		}
	});
});

module.exports = mongoose.model("campground", campgroundSchema);