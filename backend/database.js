const Database = require("better-sqlite3");

const db = new Database("field_service.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT,
        address TEXT
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS technicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        skill TEXT
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer TEXT,
        service TEXT,
        date TEXT,
        technician TEXT,
        status TEXT
    )
`).run();

console.log("SQLite database connected!");

module.exports = db;