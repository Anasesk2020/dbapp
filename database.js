const { Pool } = require('pg');

// Konfiguriere die Verbindungsinformationen
const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: '1989',
  database: 'postgres',
});

// Führe eine SQL-Abfrage aus
pool.query('SELECT * FROM users', (err, res) => {
  if (err) {
    console.error('Fehler bei der Abfrage:', err);
  } else {
    console.log('Ergebnis:', res.rows);
  }
});
