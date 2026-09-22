// Field Service Scheduling App

let customers = [];
let technicians = [];
let jobs = [];

// --------------------
// Add Customer
// --------------------
const customerForm = document.getElementById("customerForm");

if (customerForm) {
    customerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("customerName").value;
        const phone = document.getElementById("customerPhone").value;
        const address = document.getElementById("customerAddress").value;

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
    technicianForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("technicianName").value;
        const skill = document.getElementById("technicianSkill").value;

        technicians.push({
            name: name,
            skill: skill
        });

        alert("Technician added successfully!");

        technicianForm.reset();
        displayTechnicians();
        updateDashboard();
    });
}


// --------------------
// Display Customers
// --------------------
function displayCustomers() {

    const customerList = document.getElementById("customerList");

    if (!customerList) return;

    customerList.innerHTML = "";

    customers.forEach(function(customer) {

        const item = document.createElement("div");

        item.className = "item";

        item.innerHTML = `
            <h3>${customer.name}</h3>
            <p>Phone: ${customer.phone}</p>
            <p>Address: ${customer.address}</p>
        `;

        customerList.appendChild(item);
    });
}


// --------------------
// Display Technicians
// --------------------
function displayTechnicians() {

    const technicianList =
        document.getElementById("technicianList");

    if (!technicianList) return;

    technicianList.innerHTML = "";

    technicians.forEach(function(technician) {

        const item = document.createElement("div");

        item.className = "item";

        item.innerHTML = `
            <h3>${technician.name}</h3>
            <p>Skill: ${technician.skill}</p>
        `;

        technicianList.appendChild(item);
    });
}


// --------------------
// Update Dashboard
// --------------------
function updateDashboard() {

    const customerCount =
        document.getElementById("customerCount");

    const technicianCount =
        document.getElementById("technicianCount");

    const jobCount =
        document.getElementById("jobCount");

    const completedCount =
        document.getElementById("completedCount");

    if (customerCount) {
        customerCount.textContent = customers.length;
    }

    if (technicianCount) {
        technicianCount.textContent = technicians.length;
    }

    if (jobCount) {
        jobCount.textContent = jobs.length;
    }

    if (completedCount) {
        completedCount.textContent =
            jobs.filter(function(job) {
                return job.status === "Completed";
            }).length;
    }
}


// --------------------
// Welcome Message
// --------------------
window.addEventListener("load", function() {
    updateDashboard();
});
