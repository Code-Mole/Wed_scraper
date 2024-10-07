import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'web_scraper_data'
});

db.connect((err) => {
    if (err) console.log(err);
        console.log('Connected to database');
})

export {db};