const db = require('./src/db/connection');

try {
    db.prepare('DELETE FROM inventory').run();
    db.prepare('DELETE FROM suppliers').run();

    const insertSupplier = db.prepare('INSERT INTO suppliers (name, city) VALUES (?, ?)');
    
    const s1 = insertSupplier.run('Tech Gear Co', 'San Francisco');
    const s2 = insertSupplier.run('Global Logistics', 'Chicago');
    const s3 = insertSupplier.run('Office Essentials', 'New York');

    console.log('Suppliers seeded');

    const insertInventory = db.prepare(`
        INSERT INTO inventory (supplier_id, product_name, quantity, price) 
        VALUES (?, ?, ?, ?)
    `);

    insertInventory.run(s1.lastInsertRowid, 'Mechanical Keyboard', 50, 89.99);
    insertInventory.run(s1.lastInsertRowid, 'Gaming Mouse', 100, 45.00);

    insertInventory.run(s2.lastInsertRowid, 'Shipping Boxes', 500, 2.50);
    insertInventory.run(s2.lastInsertRowid, 'Packing Tape', 200, 1.99);

    insertInventory.run(s3.lastInsertRowid, 'Ergonomic Chair', 10, 299.00);

    console.log('Inventory seeded');
    console.log('Database is ready for testing!');

} catch (error) {
    console.error('Seeding failed:', error);
} finally {
    process.exit();
}
