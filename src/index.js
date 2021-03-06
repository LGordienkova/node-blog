const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts.js');
const mongoose = require('mongoose');

const socketio = require('socket.io');

const cors = require('cors');
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://node_blog_user:qwerty1@ds115523.mlab.com:15523/node_blog', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongoDb Connected')
  // we're connected!
});

app.use(cors())
app.use(bodyParser.json());

app.use((req, res, next) => {
	console.log(req.url);
	next();
});

app.get('/api/v0.1/status', (req, res) => {
	res.send({ status: 'ok' });
});


const expressServer = app.listen(port, () => {
	console.log(`server ready on ${port} port`);
});

const io = socketio(expressServer)

io.on('connection', function(socket){
	socket.emit('messageFromServer');
	console.log('a user connected');
});

app.use('/api/v0.1/posts', postRoutes(io));


module.exports = app;
