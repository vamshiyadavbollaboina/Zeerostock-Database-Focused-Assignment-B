# README: Part B – Inventory Database + APIs

## 🚀 Project Overview
This project focuses on the backend architecture and data integrity of the **Zeerostock** inventory system. It manages the relationship between suppliers and their surplus stock, ensuring that all data is validated and searchable through high-performance queries.

## 🛠 Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** SQLite (Relational)
* **API Testing:** Postman / cURL

## 📋 Features
* **Relational Mapping:** Links inventory items to specific, verified suppliers.
* **Strict Validation:** Prevents negative stock quantities or invalid pricing (Price must be $> 0$).
* **Business Intelligence Query:** An optimized endpoint that calculates the total monetary value of stock held by each supplier.

## ⚙️ How to Run Locally
1.  **Clone the Repository:**
    ```bash
    git clone <your-repo-link>
    cd inventory-database-project
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Initialize Database:**
    ```bash
    node src/db/setup.js
    ```
4.  **Start the Server:**
    ```bash
    npm start
    ```

---

## 📊 Database Schema Explanation
The data model is built on a **One-to-Many** relationship: one supplier can list multiple inventory items, but each item belongs to exactly one supplier.

* **Suppliers Table:** Contains `id` (Primary Key), `name`, and `city`.
* **Inventory Table:** Contains `id` (Primary Key), `supplier_id` (Foreign Key), `product_name`, `quantity`, and `price`.



## ❓ Design Choice: SQL vs. NoSQL
I chose **SQL (Relational)** for this assignment. In an inventory system, data consistency is critical. SQL allows us to enforce **Referential Integrity**—for example, the database will physically prevent adding an inventory item if the `supplier_id` does not exist. Additionally, the requirement to group and aggregate data (Sum of $Quantity \times Price$) is a native strength of SQL's relational engine.

## ⚡ Indexing & Optimization
**Indexing the Foreign Key:**
I would implement a **B-Tree Index** on the `supplier_id` column in the `Inventory` table. 

**Why?**
The most resource-intensive requirement in this project is joining the two tables and grouping by the supplier. Without an index, the database must perform a "Full Table Scan" for every row. With an index on `supplier_id`, the database can perform a "Seek," reducing query time from $O(n)$ to $O(\log n)$. This ensures the total value report remains fast even with millions of stock records.
