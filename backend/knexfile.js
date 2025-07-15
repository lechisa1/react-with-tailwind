module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'tailwind_db'
    },
    migrations: {
      directory: './migrations'
    }
  }
};
