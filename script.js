// Field Service Scheduling App

let customers = [];
let technicians = [];
let jobs = [];

// --------------------
// Add Customer
// --------------------
const customerForm = document.getElementById("customerForm");

if (customerForm) {
    customerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const address = document.getElementById("customerAddress").value.trim();

        if (!name || !phone || !address) {
            alert("Please fill all customer details.");
            return;
        }

        customers.push({
            name: name,
            phone: phone,
            address: address
        });

        alert("Customer added successfully!");

        customerForm.reset();
        displayCustomers();
        updateDashboard();
    });
}


// --------------------
// Add Technician
// --------------------
const technicianForm = document.getElementById("technicianForm");

if (technicianForm) {
    technicianForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("technicianName").value.trim();
        const skill = document.getElementById("technicianSkill").value.trim();

        if (!name || !skill) {
            alert("Please fill all technician details.");
            return;
        }

        technicians.push({
            name: name,
            skill: skill
        });

        alert("Technician added successfully
