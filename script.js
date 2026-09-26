// Field Service Scheduling App

let customers = [];
let technicians = [];
let jobs = [];

// API URLs
const CUSTOMER_API = "/api/customers";
const TECHNICIAN_API = "/api/technicians";
const JOB_API = "/api/jobs";

// ====================
// CUSTOMER
// ====================

async function addCustomer() {
    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const address = document.getElementById("customerAddress").value;
    const service = document.getElementById("serviceRequirement").value;

    if (!name || !phone || !address || !service) {
        alert("Please fill all customer details.");
        return;
    }

    const customer = {
        name: name,
        phone: phone,
        address: address,
        service: service
    };

    try {
        const response = await fetch(CUSTOMER_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Customer could not be added");
        }

        alert("Customer added successfully!");

        document.getElementById("customerName").value = "";
        document.getElementById("customerPhone").value = "";
        document.getElementById("customerAddress").value = "";
        document.getElementById("serviceRequirement").value = "";

        loadCustomers();

    } catch (error) {
        console.error(error);
        alert("Could not add customer. Please try again.");
    }
}


// ====================
// LOAD CUSTOMERS
// ====================

async function loadCustomers() {
    try {
        const response = await fetch(CUSTOMER_API);
        customers = await response.json();

        displayCustomers();
        updateDashboard();

    } catch (error) {
        console.error("Error loading customers:", error);
    }
}


// ====================
// DISPLAY CUSTOMERS
// ====================

function displayCustomers() {
    const list = document.getElementById("customerList");

    if (!list) return;

    list.innerHTML = "";

    customers.forEach((customer, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <strong>${customer.name}</strong><br>
            Phone: ${customer.phone}<br>
            Address: ${customer.address}<br>
            Service: ${customer.service || ""}<br>
            <button onclick="editCustomer(${index})">Edit</button>
            <button onclick="deleteCustomer(${index})">Delete</button>
            <hr>
        `;

        list.appendChild(div);
    });
}


// ====================
// EDIT CUSTOMER
// ====================

function editCustomer(index) {
    const customer = customers[index];

    const name = prompt("Customer Name:", customer.name);
    if (name === null) return;

    const phone = prompt("Phone Number:", customer.phone);
    if (phone === null) return;

    const address = prompt("Address:", customer.address);
    if (address === null) return;

    customer.name = name;
    customer.phone = phone;
    customer.address = address;

    alert("Customer updated successfully!");

    displayCustomers();
}


// ====================
// DELETE CUSTOMER
// ====================

function deleteCustomer(index) {
    if (confirm("Are you sure you want to delete this customer?")) {
        customers.splice(index, 1);

        displayCustomers();
        updateDashboard();

        alert("Customer deleted successfully!");
    }
}


// ====================
// TECHNICIAN
// ====================

async function addTechnician() {
    const name = document.getElementById("technicianName").value;
    const skill = document.getElementById("technicianSkill").value;

    if (!name || !skill) {
        alert("Please fill all technician details.");
        return;
    }

    const technician = {
        name: name,
        skill: skill
    };

    try {
        const response = await fetch(TECHNICIAN_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(technician)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Technician could not be added");
        }

        alert("Technician added successfully!");

        document.getElementById("technicianName").value = "";
        document.getElementById("technicianSkill").value = "";

        loadTechnicians();

    } catch (error) {
        console.error(error);
        alert("Could not add technician. Please try again.");
    }
}


// ====================
// LOAD TECHNICIANS
// ====================

async function loadTechnicians() {
    try {
        const response = await fetch(TECHNICIAN_API);
        technicians = await response.json();

        displayTechnicians();
        updateDashboard();

    } catch (error) {
        console.error("Error loading technicians:", error);
    }
}


// ====================
// DISPLAY TECHNICIANS
// ====================

function displayTechnicians() {
    const list = document.getElementById("technicianList");

    if (!list) return;

    list.innerHTML = "";

    technicians.forEach((technician) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <strong>${technician.name}</strong><br>
            Skill: ${technician.skill}
            <hr>
        `;

        list.appendChild(div);
    });
}


// ====================
// SERVICE JOB
// ====================

async function addJob() {
    const customer = document.getElementById("jobCustomer").value;
    const serviceType = document.getElementById("jobServiceType").value;
    const serviceDate = document.getElementById("jobDate").value;
    const technician = document.getElementById("jobTechnician").value;

    if (!customer || !serviceType || !serviceDate || !technician) {
        alert("Please fill all service job details.");
        return;
    }

    const job = {
        customer: customer,
        serviceType: serviceType,
        serviceDate: serviceDate,
        technician: technician,
        status: "Completed"
    };

    try {
        const response = await fetch(JOB_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(job)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Service job could not be scheduled");
        }

        alert("Service job scheduled successfully!");

        document.getElementById("jobCustomer").value = "";
        document.getElementById("jobServiceType").value = "";
        document.getElementById("jobDate").value = "";
        document.getElementById("jobTechnician").value = "";

        loadJobs();

    } catch (error) {
        console.error(error);
        alert("Could not schedule service job. Please try again.");
    }
}


// ====================
// LOAD JOBS
// ====================

async function loadJobs() {
    try {
        const response = await fetch(JOB_API);
        jobs = await response.json();

        displayJobs();
        updateDashboard();

    } catch (error) {
        console.error("Error loading jobs:", error);
    }
}


// ====================
// DISPLAY JOBS
// ====================

function displayJobs() {
    const list = document.getElementById("jobList");

    if (!list) return;

    list.innerHTML = "";

    jobs.forEach((job) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <strong>Customer:</strong> ${job.customer}<br>
            <strong>Service:</strong> ${job.serviceType}<br>
            <strong>Date:</strong> ${job.serviceDate}<br>
            <strong>Technician:</strong> ${job.technician}<br>
            <strong>Status:</strong> ${job.status || "Scheduled"}
            <hr>
        `;

        list.appendChild(div);
    });
}


// ====================
// DASHBOARD
// ====================

function updateDashboard() {
    const customerCount = document.getElementById("customerCount");
    const technicianCount = document.getElementById("technicianCount");
    const scheduledCount = document.getElementById("scheduledCount");
    const completedCount = document.getElementById("completedCount");

    if (customerCount) {
        customerCount.textContent = customers.length;
    }

    if (technicianCount) {
        technicianCount.textContent = technicians.length;
    }

    if (scheduledCount) {
        scheduledCount.textContent = jobs.length;
    }

    if (completedCount) {
        completedCount.textContent =
            jobs.filter(job => job.status === "Completed").length;
    }
}


// ====================
// PAGE LOAD
// ====================

document.addEventListener("DOMContentLoaded", () => {
    loadCustomers();
    loadTechnicians();
    loadJobs();
});