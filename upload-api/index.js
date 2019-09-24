require('dotenv').config();
const server = require('./api/server');
const port = process.env.PORT || 5050;

server.listen(port, () => console.log(`Server listening on port ${port}.`));