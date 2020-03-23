const express = require('express');
const router = express.Router();

const postService = require(`../postgres/services/postService`);

module.exports = (io) => {
	router.get('/', async (req, res) => {
		let data;
		try {
			data = await postService.getAll();
		} catch(err) {
			res.status(500).send({ message: err.message });
		}

		res.send(data);
	})

	router.get('/:id', async (req, res) => {
		let data;
		try {
			data = await postService.getById(req.params.id);
		} catch(err) {
			res.status(err.status).send({ message: err.message });
		}

		res.send(data);
	})

	router.post('/', async(req, res) => {
		let data;
		try {
			data = await postService.insert(req.body);

		} catch(err) {
			res.status(500).send({ message: err.message });
		}
		io.emit('postsUpdated');
		res.send(data);
	})

	return router;
}



