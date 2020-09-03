const monk = require('monk');
const connectionURL = process.env.MONGODB_URI || 'localhost:27017';
const db = monk(connectionURL);
db.then(() => {
    console.log('Connected correctly to server')
  });

module.exports = db;