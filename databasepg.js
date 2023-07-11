const { Client } = require('pg');

const client = new Client({
  host: '172.17.0.2',
  port: 5432,
  user: 'postgres-container',
  password: 'admin-p',
  database: 'test',
});

client.connect();

client.query('SELECT * FROM accounts', (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  client.end();
});
