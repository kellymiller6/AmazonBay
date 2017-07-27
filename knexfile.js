module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/amazonbay',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
     directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost/amazonbay_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  }
};
