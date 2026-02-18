/**
 * Registration functionality
 * Allows new users to register and saves data to localStorage
 * Validates for duplicate usernames and redirects to login after success
 */

document.addEventListener("DOMContentLoaded", () => {
    // Fixed form ID reference (was "registerFrom", now "registerForm")
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get input values and trim whitespace
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validate empty fields
        if (username === "" || password === "") {
            document.getElementById("msg").innerText = "Please enter username and password";
            document.getElementById("msg").style.color = "red";
            return;
        }

        // Validate minimum password length
        if (password.length < 4) {
            document.getElementById("msg").innerText = "Password must be at least 4 characters";
            document.getElementById("msg").style.color = "red";
            return;
        }

        // Load existing users from localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if username already exists (FIXED: was using undefined variables userId and Password)
        const existingUser = users.find(
            u => u.username === username
        );

        if (existingUser) {
            // User already exists
            document.getElementById("msg").innerText = "Username already exists! Please choose another.";
            document.getElementById("msg").style.color = "red";
        }
        else {
            // Register new user
            users.push({
                username: username,
                password: password,
                role: "student"  // Default role for new users
            });

            // Save updated users array to localStorage
            localStorage.setItem("users", JSON.stringify(users));

            // Success message
            document.getElementById("msg").innerText = "Registration successful! Redirecting to login...";
            document.getElementById("msg").style.color = "green";

            // Auto-redirect to login page after 1.5 seconds
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        }
    });
});