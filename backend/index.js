const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());

// Frontend files
app.use(express.static("../"));

// Home
app.get("/", (req, res) => {
    res.send("Field Service Scheduling App Backend is Running!");
});

// ==================== CUSTOMERS ====================

app.post("/api/customers", (req, res) => {
    const { name, phone, address } = req.body;

    const result = db.prepare(`
        INSERT INTO customers (name, phone, address)
        VALUES (?, ?, ?)
    `).run(name, phone, address);

    res.json({
        message: "Customer added successfully!",
        id: result.lastInsertRowid
    });
});

app.get("/api/customers", (req, res) => {
    const customers = db.prepare("SELECT * FROM customers").all();
    res.json(customers);
});

// ==================== TECHNICIANS ====================

app.post("/api/technicians", (req, res) => {
    const { name, skill } = req.body;

    const result = db.prepare(`
        INSERT INTO technicians (name, skill)
        VALUES (?, ?)
    `).run(name, skill);

    res.json({
        message: "Technician added successfully!",
        id: result.lastInsertRowid
    });
});

app.get("/api/technicians", (req, res) => {
    const technicians = db.prepare("SELECT * FROM technicians").all();
    res.json(technicians);
});

// ==================== SERVICE JOBS ====================

app.post("/api/jobs", (req, res) => {
    const { customer, service, date, technician, status } = req.body;

    const result = db.prepare(`
        INSERT INTO jobs (customer, service, date, technician, status)
        VALUES (?, ?, ?, ?, ?)
    `).run(customer, service, date, technician, status);

    res.json({
        message: "Service job scheduled successfully!",
        id: result.lastInsertRowid
    });
});

app.get("/api/jobs", (req, res) => {
    const jobs = db.prepare("SELECT * FROM jobs").all();
    res.json(jobs);
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});