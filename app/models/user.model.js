const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: {type:String, required:true,},
    password: {type:String, required:true},
    email: {type:String, default:''},
    image:{type:String, default:''},
    reviews:[],
    products:[]
  });

  var User = mongoose.model('User', userSchema);

  module.exports = User
