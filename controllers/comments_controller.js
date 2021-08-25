const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      });

      post.comments.push(comment);
      post.save();
    }
    return res.redirect("back");
  } catch (err) {
    console.log(`error-----------${err}`);
  }
};

module.exports.destroy = async function (req, res) {
  let comment = await Comment.findById(req.params.id);
  if (comment.user == req.user.id) {
    let postId = comment.post;
    comment.remove();
    Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
  } else {
    console.log("user not auth");
  }
  return res.redirect("back");
};
