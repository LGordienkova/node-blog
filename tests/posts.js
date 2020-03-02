const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const server = require('../src/index');
const db = require('../src/models');

chai.use(chaiHttp);

describe('POSTS', () => {

	describe('GET /api/v0.1/posts', () => {
		beforeEach(async () => {
			await db.Post.destroy({ where: {} });
		})

		it('should return empty array', (done) => {
			chai.request(server)
			.get('/api/v0.1/posts')
			.end((err, res) => {
				const { status, body } = res;
				expect(status).to.be.eq(200);
				expect(body).to.be.empty;
				done();
			})
		})

		it('should return one item', async () => {
			const post = {
				title: 'Title',
				author: 'John Doe',
				description: 'Some description'
			}
			await db.Post.create(post);

			const result = await chai.request(server)
			.get('/api/v0.1/posts')

			const { body, status } = result;

			expect(body).to.have.lengthOf(1);
			expect(body[0]).to.eql(post);
		})
	})
})