const express = require('express');
const app = express();
const { Pool } = require('pg');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Verbindung zur Datenbank
const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: '1989',
  database: 'postgres',
});

// API-Endpunkt für die Benutzerauthentifizierung
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  pool.query(
    'SELECT * FROM users WHERE email = $1 AND password = $2',
    [email, password],
    (err, result) => {
      if (err) {
        console.error('Fehler bei der Datenbankabfrage:', err);
        res.json({ success: false });
      } else {
        if (result.rows.length > 0) {
          res.json({ success: true });
        } else {
          res.json({ success: false });
        }
      }
    }
  );
});
// API-Endpunkt zum Abrufen der Nachrichten
app.get('/messages', (req, res) => {
  pool.query('SELECT * FROM sendmessage', (err, result) => {
    if (err) {
      console.error('Fehler bei der Datenbankabfrage:', err);
      res.json({ success: false, error: err });
    } else {
      res.json({ success: true, messages: result.rows });
    }
  });
});


app.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});
