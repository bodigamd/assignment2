const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  UserId: { type: String, unique: true, required: true},
  FirstName: {type: String, required: true},
  LastName: { type: String, required: true},
  password: { type: String, required: true},
  following: [String]
})


const User = mongoose.model("User", userSchema);



async function register(UserId, FirstName, LastName, password) {
  const user = await getUser(UserId);
  if(user) throw Error('Please try for a new UserId');

  const newUser = await User.create({
    UserId: UserId,
    FirstName: FirstName,
    LastName: LastName,
    password: password
  });

  return newUser;
}


async function login(UserId, password) {
  const user = await getUser(UserId);
  if(!user) throw Error('User not found');
  if(user.password != password) throw Error('Wrong Password');

  return user;
}


async function updatePassword(id, newpassword) {
  const user = await User.updateOne({"_id": id}, {$set: { password: newpassword}});
  return user;
}


async function deleteUser(id) {
  await User.deleteOne({"_id": id});
};


async function getUser(UserId) {
  return await User.findOne({ "UserId": UserId});
}


module.exports = { 
  register, login, updatePassword, deleteUser, getUser
};