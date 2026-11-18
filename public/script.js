
// Send student details to the Node.js server

document.getElementById("studentForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    clearErrors();

    // Get values from the form
    let student = {
        name: document.getElementById("name").value,
        rollNo: document.getElementById("rollNo").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        course: document.getElementById("course").value
    };

    try {

        // Send data to the server
        let response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        let result = await response.json();

        if (response.ok) {

            document.getElementById("message").textContent =
                result.message;

            document.getElementById("message").className = "success";

            document.getElementById("studentForm").reset();

            loadStudents();

        } else {

            // Display errors received from the server
            showErrors(result.errors);

            document.getElementById("message").textContent =
                "Please correct the errors.";

            document.getElementById("message").className = "failure";
        }

    } catch (error) {

        document.getElementById("message").textContent =
            "Server connection failed.";

        document.getElementById("message").className = "failure";
    }
});


// Display validation errors
function showErrors(errors) {

    for (let field in errors) {

        document.getElementById(field + "Error").textContent =
            errors[field];

    }
}


// Clear old error messages
function clearErrors() {

    let fields = ["name", "rollNo", "email", "phone", "course"];

    fields.forEach(function(field) {

        document.getElementById(field + "Error").textContent = "";

    });

    document.getElementById("message").textContent = "";
}


// Load registered students from the server
async function loadStudents() {

    let response = await fetch("/students");

    let students = await response.json();

    let list = document.getElementById("studentList");

    list.innerHTML = "";

    if (students.length === 0) {

        list.innerHTML =
            '<tr><td colspan="5">No students registered yet.</td></tr>';

        return;
    }

    students.forEach(function(student) {

        let row = document.createElement("tr");

        [student.name, student.rollNo, student.email,
         student.phone, student.course].forEach(function(value) {

            let cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });

        list.appendChild(row);

    });
}


// Load records when the page opens
loadStudents();
