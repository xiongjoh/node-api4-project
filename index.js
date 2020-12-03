// code away!

const port = process.env.PORT || 4000

const server = require('./server')

server.listen(port, () => {
    console.log('\n* Server Running on http://localhost:4000 *\n');
  });
  