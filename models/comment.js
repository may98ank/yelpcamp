var mongoose = require("mongoose");

var commentSchema =  mongoose.Schema({
                            author: {
                                id:{
                                    type:  mongoose.Schema.Types.ObjectId,
                                    ref:   "User"
                                },
                                username: String,
                            },
                            createdAt: {type: Date, default: Date.now },
                            text: String
                        });

module.exports = mongoose.model("comment", commentSchema);