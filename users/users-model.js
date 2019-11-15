const db = require('../database/dbConfig.js');

module.exports = {
  add,
  findById,
};

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

async function findById(id) {
  return await db('users')
    .where({ id })
    .select('username', 'id')
    .first();
}
