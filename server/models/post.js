const mongoose = require("mongoose");

const User = require('./user');


const postSchema = new mongoose.Schema({
  UserId: { type: String, required: true},
  PostId: { type: String, required: true},
  PostName: { type: String, required: true},
  PostDate: { type: String, required: true},
  description: { type: String, required: true}
});


const Post = mongoose.model("Post", postSchema);


async function newPost(UserId, PostId, PostName, PostDate, description) {
  const user = await User.getUser(UserId);
  if(!user) throw Error('Please register to continue');

  const newPost = await Post.create({
    UserId: UserId,
    PostId: PostId,
    PostName: PostName,
    PostDate: PostDate,
    description: description
  });

  return newPost;
}


async function viewPost(pid) {
    return await Post.findOne({ "_id": pid});
}


async function updatePost(pid, newdescription) {
  const post = await Post.updateOne({"_id": pid}, {$set: { description: newdescription}});
  return post;
}


async function deletePost(pid) {
  await Post.deleteOne({"_id": pid});
};


module.exports = { 
    newPost, viewPost, updatePost, deletePost 
};