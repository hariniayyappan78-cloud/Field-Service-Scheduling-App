let customerCount = 0;
let technicianCount = 0;
let jobCount = 0;
let completedCount = 0;


// ==================== CUSTOMER ====================

document.getElementById("customerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let name = document.getElementById("customerName").value;
    let phone = document.getElementById("customerPhone").value;
    let address = document.getElementById("customerAddress").value;

    const customer = {
        name: name,
        phone: phone,
        address: address
    };

    try {
        const response = await fetch("http://localhost:3000/api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        });

        const data = await response.json();

        customerCount++;
        document.getElementById("customerCount").innerText = customerCount;

        let customerItem = document.createElement("div");
        customerItem.className = "item";

        customerItem.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
            <button type="button" class="edit-customer">Edit Customer</button>
            <button type="button" class="delete-customer">Delete Customer</button>
        `;

        document.getElementById("customerList").appendChild(customerItem);

        customerItem.querySelector(".edit-customer").addEventListener("click", function() {
            let newName = prompt("Enter new customer name:", name);
            if (newName === null) return;

            let newPhone = prompt("Enter new phone number:", phone);
            if (newPhone === null) return;

            let newAddress = prompt("Enter new address:", address);
            if (newAddress === null) return;

            customerItem.querySelector("h3").innerText = newName;

            customerItem.querySelector("p:nth-of-type(1)").innerHTML =
                `<strong>Phone:</strong> ${newPhone}`;

            customerItem.querySelector("p:nth-of-type(2)").innerHTML =
                `<strong>Address:</strong> ${newAddress}`;

            name = newName;
            phone = newPhone;
            address = newAddress;

            alert("Customer updated successfully!");
        });

        customerItem.querySelector(".delete-customer").addEventListener("click", function() {
            customerItem.remove();
            customerCount--;
            document.getElementById("customerCount").innerText = customerCount;
        });

        alert(data.message);
        document.getElementById("customerForm").reset();

    } catch (error) {
        alert("Customer could not be added. Make sure the backend server is running.");
        console.error(error);
    }
});


// ==================== TECHNICIAN ====================

document.getElementById("technicianForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let name = document.getElementById("technicianName").value;
    let skill = document.getElementById("technicianSkill").value;

    const technician = {
        name: name,
        skill: skill
    };

    try {
        const response = await fetch("http://localhost:3000/api/technicians", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(technician)
        });

        const data = await response.json();

        technicianCount++;
        document.getElementById("technicianCount").innerText = technicianCount;

        document.getElementById("technicianList").innerHTML += `
            <div class="item">
                <h3>${name}</h3>
                <p><strong>Skill:</strong> ${skill}</p>
            </div>
        `;

        alert(data.message);
        document.getElementById("technicianForm").reset();

    } catch (error) {
        alert("Technician could not be added. Make sure the backend server is running.");
        console.error(error);
    }
});


// ==================== SERVICE JOB ====================

document.getElementById("jobForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let customer = document.getElementById("jobCustomer").value;
    let service = document.getElementById("serviceType").value;
    let date = document.getElementById("serviceDate").value;
    let technician = document.getElementById("jobTechnician").value;

    const job = {
        customer: customer,
        service: service,
        date: date,
        technician: technician,
        status: "Scheduled"
    };

    try {
        const response = await fetch("http://localhost:3000/api/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(job)
        });

        const data = await response.json();

        jobCount++;
        document.getElementById("jobCount").innerText = jobCount;

        let jobItem = document.createElement("div");
        jobItem.className = "item";

        jobItem.innerHTML = `
            <h3>${service}</h3>
            <p><strong>Customer:</strong> ${customer}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Technician:</strong> ${technician}</p>
            <p><strong>Status:</strong> <span class="job-status">Scheduled</span></p>

            <button type="button" class="complete-job">
                Mark as Completed
            </button>
        `;

        document.getElementById("jobList").appendChild(jobItem);

        jobItem.querySelector(".complete-job").addEventListener("click", function() {
            completedCount++;

            document.getElementById("completedCount").innerText = completedCount;

            jobItem.querySelector(".job-status").innerText = "Completed";

            this.innerText = "Completed";
            this.disabled = true;

            alert("Job marked as completed!");
        });

        alert(data.message);
        document.getElementById("jobForm").reset();

    } catch (error) {
        alert("Service job could not be scheduled. Make sure the backend server is running.");
        console.error(error);
    }
});