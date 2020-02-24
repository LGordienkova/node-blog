const db = require('../models');

class PostService {
	async getAll(){
		const posts = await db.Post.findAll();
		return posts;
	}

	async getById(id){
		const post = await db.Post.findOne({
			where: { id }
		})
		return post;
	}

	async insert(data){
		const post = await db.Post.create(data)
		return post;
	}
}

module.exports = new PostService();