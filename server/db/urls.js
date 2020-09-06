const Joi = require('joi');
const db = require('./connection');

const urls = db.get('urls');

const schema = Joi.object().keys({
  name: Joi.string().token().min(1).max(100).required(),
  url: Joi.string().uri({
    scheme: [
      /https?/
    ]
  }).required()
}).with('name', 'url');

function find(name) {
  return urls.findOne({
    name
  });
}

/*
{
  url: 'http://example.com',
  name: 'super-catchy'
}
*/
async function create(almostAnu) {
  const result = Joi.validate(almostAnu, schema);
  // result.error === null
  if (result.error === null) {
    const url = await urls.findOne({
      name: almostAnu.name
    });
    if (!url) {
      return urls.insert(almostAnu);
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