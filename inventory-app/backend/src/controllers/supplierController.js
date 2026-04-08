const db = require('../db/connection');

exports.createSupplier = (req, res) => {
    const { name, city } = req.body;
    if (!name || !city) return res.status(400).json({ error: "Name and city required" });

    const stmt = db.prepare('INSERT INTO suppliers (name, city) VALUES (?, ?)');
    const info = stmt.run(name, city);
    res.status(201).json({ id: info.lastInsertRowid, name, city });
};