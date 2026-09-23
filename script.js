// Field Service Scheduling App

let customers = [];
let technicians = [];
let jobs = [];

// CUSTOMER
document.getElementById("customerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    if (name === "" || phone === "" || address === "") {
        alert("Please fill all customer details.");
        return;
    }

    customers.push({
        name: name,
        phone: phone,
        address: address
    });

    alert("Customer added successfully!");

    this.reset();
    displayCustomers();
    updateDashboard();
});


// TECHNICIAN
document.getElementById("technicianForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("technicianName").value.trim();
    const skill = document.getElementById("technicianSkill").value.trim();

    if (name === "" || skill === "") {
        alert("Please fill all technician details.");
        return;
    }

    technicians.push({
        name: name,
        skill: skill
    });

    alert("Technician added successfully!");

    this.reset();
    displayTechnicians();
    updateDashboard();
});


// SERVICE JOB
document.getElementById("jobForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const customer = document.getElementById("jobCustomer").value.trim();
    const service = document.getElementById("serviceType").value.trim();
    const date = document.getElementById("serviceDate").value;
    const technician = document.getElementById("jobTechnician").value.trim();

    if (customer === "" || service === "" || date === "" || technician === "") {
        alert("Please fill all service job details.");
        return;
    }

    jobs.push({
        customer: customer,
        service: service,
        date: date,
        technician: technician,
        status: "Scheduled"
    });

    alert("Service job scheduled successfully!");

    this.reset();
    displayJobs();
    updateDashboard();
});


// DISPLAY CUSTOMERS
function displayCustomers() {
    const list = document.getElementById("customerList");

    list.innerHTML = "";

    customers.forEach(function(customer) {
        list.innerHTML += `
            <div class="item">
                <h3>${customer.name}</h3>
                <p>Phone: ${customer.phone}</p>
                <p>Address: ${customer.address}</p>
            </div>
        `;
    });
}


// DISPLAY TECHNICIANS
function displayTechnicians() {
    const list = document.getElementById("technicianList");

    list.innerHTML = "";

    technicians.forEach(function(technician) {
        list.innerHTML += `
            <div class="item">
                <h3>${technician.name}</h3>
                <p>Skill: ${technician.skill}</p>
            </div>
        `;
    });
}


// DISPLAY SERVICE JOBS
function displayJobs() {
    const list = document.getElementById("jobList");

    list.innerHTML = "";

    jobs.forEach(function(job) {
        list.innerHTML += `
            <div class="item">
                <h3>${job.customer}</h3>
                <p>Service: ${job.service}</p>
                <p>Date: ${job.date}</p>
                <p>Technician: ${job.technician}</p>
                <p>Status: ${job.status}</p>
            </div>
        `;
    });
}


// DASHBOARD
function updateDashboard() {

    document.getElementById("customerCount").textContent =
        customers.length;

    document.getElementById("technicianCount").textContent =
        technicians.length;

    document.getElementById("jobCount").textContent =
        jobs.length;

    document.getElementById("completedCount").textContent =
        jobs.filter(function(job) {
            return job.status === "Completed";
        }).length;
}
