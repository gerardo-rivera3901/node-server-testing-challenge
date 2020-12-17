const db = require('../../data/dbConfig');

module.exports = {
  getAll,
  getById,
  insert,
  remove
};

function getAll() {
  return db('chihuahuas');
}

function getById(id) {
  return db('chihuahuas').where('id', id).first();
}

async function insert(post) {
  const [id] = await db('chihuahuas').insert(post);
  return getById(id);
}
function remove(id) {
  return db('chihuahuas').where('id', id).del();
}