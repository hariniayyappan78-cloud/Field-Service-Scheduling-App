// Field Service Scheduling App

let customers = JSON.parse(localStorage.getItem("customers")) || [];
let technicians = JSON.parse(localStorage.getItem("technicians")) || [];
let serviceJobs = JSON.parse(localStorage.getItem("serviceJobs")) || [];

function saveData() {
    localStorage.setItem("customers", JSON.stringify(customers));
    localStorage.setItem("technicians", JSON.stringify(technicians));
    localStorage.setItem("serviceJobs", JSON.stringify(serviceJobs));
}

// Add Customer
function addCustomer() {
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

    saveData();

    alert("Customer added successfully!");

    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerAddress").value = "";

    displayCustomers();
    updateDashboard();
    loadCustomerOptions();
}

// Add Technician
function addTechnician() {
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

    saveData();

    alert("Technician added successfully!");

    document.getElementById("technicianName").value = "";
    document.getElementById("technicianSkill").value = "";

    displayTechnicians();
    updateDashboard();
    loadTechnicianOptions();
}

// Schedule Service Job
function scheduleJob() {
    const customerName = document.getElementById("jobCustomer").value;
    const serviceType = document.getElementById("serviceType").value;
    const serviceDate = document.getElementById("serviceDate").value;
    const technicianName = document.getElementById("jobTechnician").value;

    if (!customerName || !serviceType || !serviceDate || !technicianName) {
        alert("Please fill all service job details.");
        return;
    }

    serviceJobs.push({
        customerName: customerName,
        serviceType: serviceType,
        serviceDate: serviceDate,
        technicianName: technicianName
    });

    saveData();

    alert("Service job scheduled successfully!");

    document.getElementById("jobCustomer").value = "";
    document.getElementById("serviceType").value = "";
    document.getElementById("serviceDate").value = "";
    document.getElementById("jobTechnician").value = "";

    displayServiceJobs();
    updateDashboard();
}

// Display Customers
function displayCustomers() {
    const list = document.getElementById("customerList");

    if (!list) return;

    list.innerHTML = "";

    customers.forEach((customer) => {
        const item = document.createElement("div");

        item.innerHTML = `
            <strong>${customer.name}</strong><br>
            Phone: ${customer.phone}<br>
            Address: ${customer.address}
            <hr>
        `;

        list.appendChild(item);
    });
}

// Display Technicians
function displayTechnicians() {
    const list = document.getElementById("technicianList");

    if (!list) return;

    list.innerHTML = "";

    technicians.forEach((technician) => {
        const item = document.createElement("div");

        item.innerHTML = `
            <strong>${technician.name}</strong><br>
            Skill: ${technician.skill}
            <hr>
        `;

        list.appendChild(item);
    });
}

// Display Service Jobs
function displayServiceJobs() {
    const list = document.getElementById("serviceJobList");

    if (!list) return;

    list.innerHTML = "";

    serviceJobs.forEach((job) => {
        const item = document.createElement("div");

        item.innerHTML = `
            <strong>Customer:</strong> ${job.customerName}<br>
            <strong>Service:</strong> ${job.serviceType}<br>
            <strong>Date:</strong> ${job.serviceDate}<br>
            <strong>Technician:</strong> ${job.technicianName}
            <hr>
        `;

        list.appendChild(item);
    });
}

// Load Customer Dropdown
function loadCustomerOptions() {
    const select = document.getElementById("jobCustomer");

    if (!select) return;

    select.innerHTML = `<option value="">Select Customer</option>`;

    customers.forEach((customer) => {
        const option = document.createElement("option");

        option.value = customer.name;
        option.textContent = customer.name;

        select.appendChild(option);
    });
}

// Load Technician Dropdown
function loadTechnicianOptions() {
    const select = document.getElementById("jobTechnician");

    if (!select) return;

    select.innerHTML = `<option value="">Select Technician</option>`;

    technicians.forEach((technician) => {
        const option = document.createElement("option");

        option.value = technician.name;
        option.textContent = technician.name;

        select.appendChild(option);
    });
}

// Dashboard
function updateDashboard() {
    const customerCount = document.getElementById("customerCount");
    const technicianCount = document.getElementById("technicianCount");
    const serviceJobCount = document.getElementById("serviceJobCount");

    if (customerCount) {
        customerCount.textContent = customers.length;
    }

    if (technicianCount) {
        technicianCount.textContent = technicians.length;
    }

    if (serviceJobCount) {
        serviceJobCount.textContent = serviceJobs.length;
    }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", function () {
    displayCustomers();
    displayTechnicians();
    displayServiceJobs();

    loadCustomerOptions();
    loadTechnicianOptions();

    updateDashboard();
});
