const monk = require('monk');
const connectionURL = process.env.MONGODB_URI || 'localhost/Shortner';
const db = monk(connectionURL);

module.exports = db;