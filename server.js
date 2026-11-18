
// Import Express
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Array to store student details
let students = [];

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Receive student details
app.post("/register", function(req, res) {

    let name = (req.body.name || "").trim();
    let rollNo = (req.body.rollNo || "").trim();
    let email = (req.body.email || "").trim();
    let phone = (req.body.phone || "").trim();
    let course = (req.body.course || "").trim();

    let errors = {};

    // Validate name
    if (name === "") {
        errors.name = "Name is required";
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
        errors.name = "Name should contain only letters";
    }

    // Validate roll number
    if (rollNo === "") {
        errors.rollNo = "Roll number is required";
    } else if (students.some(s => s.rollNo.toLowerCase() === rollNo.toLowerCase())) {
        errors.rollNo = "Roll number already exists";
    }

    // Validate email
    if (email === "") {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Enter a valid email";
    }

    // Validate phone
    if (!/^\d{10}$/.test(phone)) {
        errors.phone = "Enter a valid 10-digit phone number";
    }

    // Validate course
    let courses = ["AIML", "Data Science", "Cyber Security"];

    if (!courses.includes(course)) {
        errors.course = "Please select a valid course";
    }

    // Send errors if validation fails
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    // Save student details
    let student = {
        name,
        rollNo,
        email,
        phone,
        course
    };

    students.push(student);

    res.status(201).json({
        success: true,
        message: "Student registered successfully!"
    });
});

// Display registered students
app.get("/students", function(req, res) {
    res.json(students);
});

// Start server
app.listen(PORT, function() {
    console.log("Server running at http://localhost:" + PORT);
});
