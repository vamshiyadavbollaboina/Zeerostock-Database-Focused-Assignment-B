const db = require('./src/db/connection');

try {
    // 1. Clear existing data (Optional, for a clean start)
    db.prepare('DELETE FROM inventory').run();
    db.prepare('DELETE FROM suppliers').run();

    // 2. Insert Suppliers
    const insertSupplier = db.prepare('INSERT INTO suppliers (name, city) VALUES (?, ?)');
    
    const s1 = insertSupplier.run('Tech Gear Co', 'San Francisco');
    const s2 = insertSupplier.run('Global Logistics', 'Chicago');
    const s3 = insertSupplier.run('Office Essentials', 'New York');

    console.log('✅ Suppliers seeded');

    // 3. Insert Inventory
    const insertInventory = db.prepare(`
        INSERT INTO inventory (supplier_id, product_name, quantity, price) 
        VALUES (?, ?, ?, ?)
    `);

    // Items for Tech Gear Co (ID 1)
    insertInventory.run(s1.lastInsertRowid, 'Mechanical Keyboard', 50, 89.99);
    insertInventory.run(s1.lastInsertRowid, 'Gaming Mouse', 100, 45.00);

    // Items for Global Logistics (ID 2)
    insertInventory.run(s2.lastInsertRowid, 'Shipping Boxes', 500, 2.50);
    insertInventory.run(s2.lastInsertRowid, 'Packing Tape', 200, 1.99);

    // Item for Office Essentials (ID 3)
    insertInventory.run(s3.lastInsertRowid, 'Ergonomic Chair', 10, 299.00);

    console.log('✅ Inventory seeded');
    console.log('🚀 Database is ready for testing!');

} catch (error) {
    console.error('❌ Seeding failed:', error);
} finally {
    process.exit();
}