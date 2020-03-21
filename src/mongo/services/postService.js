const Post = require('../models/post');

class PostService {
	async getAll(){
		const posts = await Post.find();
		return posts;
	}

	async getById(id){
		const post = await Post.findById(id)
		return post;
	}

	async insert(data){
        const postData = new Post(data);
        await postData.save();
		return postData;
	}
}

module.exports = new PostService();