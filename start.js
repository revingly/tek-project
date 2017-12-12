const mongoose = require('mongoose');
const http = require('http');
const socketio = require('./socketio');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major <= 7 && minor <= 5) {
  console.log('Hey You! \n\tYou\'re on an older version of node that doesn\'t support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. \n ');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});

// import all the models so we can call them from the mongoose instance later
require('./models/users');
require('./models/tags');
require('./models/messages');
require('./models/posts');
require('./models/emails');
require('./models/comments');
require('./models/courses');
require('./models/books');
// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 7777);
server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

io = socketio.listen(server);
