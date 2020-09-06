// const monk = require('monk');
// const connectionURL = 'mongodb+srv://desireflixAdmin:i8QKWdsYQj9lV7GB@cluster0.6zaqr.mongodb.net/anu';
// const db = monk(connectionURL);
// db.then(() => {
//     console.log('Connected correctly to server')
//   });


  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://desireflixAdmin:i8QKWdsYQj9lV7GB@cluster0.6zaqr.mongodb.net/<dbname>?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  
  client.connect(err => {
    const collection = client.db("anu").collection("urls");
    console.log(collection);
    // perform actions on the collection object
    client.close();
  });
  

module.exports = client;