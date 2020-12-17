const cleaner = require('knex-cleaner');

const cleanTables = (knex) => {
  return cleaner
    .clean(knex, {
      mode: 'truncate',
      restartIdentity: true,
      ignoreTables: ['knex_migrations', 'knex_migrations_lock']
    })
    .then(() => console.log('\n** The tables were trunked! ** \n'));
};

exports.seed = function(knex) {
  if(knex.client.config.client === 'sqlite3') {
    return knex.raw('PRAGMA foreign_keys = OFF;').then(() => cleanTables(knex));
  } else {
    return cleanTables(knex);
  }
};
