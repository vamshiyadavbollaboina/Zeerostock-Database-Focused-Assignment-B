const db = require('../db/connection');
exports.createInventory = (req, res) => {
    const { supplier_id, product_name, quantity, price } = req.body;
    if (!supplier_id || !product_name || quantity === undefined || !price) {
        return res.status(400).json({ error: "All fields (supplier_id, product_name, quantity, price) are required." });
    }
    if (Number(quantity) < 0) {
        return res.status(400).json({ error: "Quantity cannot be negative." });
    }
    if (Number(price) <= 0) {
        return res.status(400).json({ error: "Price must be greater than zero." });
    }

    try {
        const supplier = db.prepare('SELECT id FROM suppliers WHERE id = ?').get(supplier_id);
        
        if (!supplier) {
            return res.status(404).json({ error: `Supplier with ID ${supplier_id} does not exist.` });
        }

        const stmt = db.prepare(`
            INSERT INTO inventory (supplier_id, product_name, quantity, price) 
            VALUES (?, ?, ?, ?)
        `);
        
        const info = stmt.run(supplier_id, product_name, quantity, price);

        res.status(201).json({ 
            message: "Inventory item added successfully", 
            id: info.lastInsertRowid 
        });

    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ error: "Internal server error while adding inventory." });
    }
};

exports.getGroupedInventory = (req, res) => {
    const query = `
        SELECT 
            s.id AS supplier_id,
            s.name AS supplier_name, 
            GROUP_CONCAT(i.product_name, ', ') AS products,
            SUM(i.quantity * i.price) AS total_value
        FROM suppliers s
        JOIN inventory i ON s.id = i.supplier_id
        GROUP BY s.id
        ORDER BY total_value DESC
    `;
    try {
        const data = db.prepare(query).all();
        if (data.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(data);
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ error: "Internal server error while fetching inventory summary." });
    }
};