const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  description:   String,
});

const Posts = mongoose.model('Posts', postSchema);
module.exports = Posts