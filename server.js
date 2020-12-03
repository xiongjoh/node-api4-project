const express = require('express');
const cors = require('cors')

const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')
const middleware = require('./middlewares/middlewares')
const server = express();

server.use(middleware.logger)
server.use(express.json())
server.use(cors())


server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
