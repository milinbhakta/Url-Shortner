const Joi = require('joi');
const client = require('./connection');


const schema = Joi.object().keys({
  name: Joi.string().token().min(1).max(100).required(),
  url: Joi.string().uri({
    scheme: [
      /https?/
    ]
  }).required()
}).with('name', 'url');

function find(name) {

  var result;

  client.connect(err => {
    const collection = client.db("anu").collection("urls");

    result = collection.findOne({
      $where: [{
        'name': name
      }]
    });

    client.close();
  });

  return result;

  // return urls.findOne({
  //   name
  // });
}

/*
{
  url: 'http://example.com',
  name: 'super-catchy'
}
*/
async function create(almostAnu) {
  const result = Joi.validate(almostAnu, schema);
  console.log("$$$RESULT" + result);
  if (result.error === null) {
    const url = await urls.findOne({
      name: almostAbu.name
    });
    if (!url) {
      var result1;
      client.connect(err => {
        const collection = client.db("anu").collection("urls");

        try {
          collection.insertOne(almostAnu);
        } catch (e) {
          console.log(e);
        };

        client.close();
      });
      // return urls.insert(almostAnu);
      return result1;
    } else {
      return Promise.reject({
        isJoi: true,
        details: [{
          message: 'Short name is in use.'
        }]
      });
    }
  } else {
    return Promise.reject(result.error);
  }
}

module.exports = {
  create,
  find
};