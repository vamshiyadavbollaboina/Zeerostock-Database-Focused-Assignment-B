const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const db = new Database('inventory.db');

// Execute schema
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

module.exports = db;