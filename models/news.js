var mongoose = require('mongoose');
var newsSchema = new mongoose.Schema({
  title:String,
  author:String,
  description:String,
  likes:Number,
  updated_date:{type:Date,default:Date.now()},
  comments:[{
    likes:Number,
    comment:{
      type:String,
      lowercase:false,
      trim:true
    }
  }]
});

module.exports = mongoose.model('news',newsSchema);
