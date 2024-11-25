const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const CommentSchema = new Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Link to the blog post
    userName: { type: String, required: true },
    commentText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

const CommentModel = model('Comment', CommentSchema);

module.exports = CommentModel;