/**
 * User Dashboard functionality
 * Allows regular users to view and edit their own profile
 * Admins are redirected to admin panel
 */

document.addEventListener("DOMContentLoaded", () => {
    // Get logged-in user from sessionStorage
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    // If no user is logged in, redirect to login page
    if (!loggedInUser) {
        alert("Please login first");
        window.location.href = "index.html";
        return;
    }

    // If user is admin, redirect to admin panel
    if (loggedInUser.role === "admin") {
        window.location.href = "admin.html";
        return;
    }

    // Display welcome message
    const welcomeMsg = document.getElementById("welcomeMsg");
    welcomeMsg.innerText = `Welcome, ${loggedInUser.username}!`;

    // Populate profile form with current user data
    document.getElementById("username").value = loggedInUser.username;
    document.getElementById("password").value = loggedInUser.password;
    document.getElementById("role").value = loggedInUser.role;

    // Handle profile update
    const profileForm = document.getElementById("profileForm");
    profileForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newUsername = document.getElementById("username").value.trim();
        const newPassword = document.getElementById("password").value.trim();
        const updateMsg = document.getElementById("updateMsg");

        // Validate inputs
        if (newUsername === "" || newPassword === "") {
            updateMsg.innerText = "Username and password cannot be empty";
            updateMsg.style.color = "red";
            return;
        }

        if (newPassword.length < 4) {
            updateMsg.innerText = "Password must be at least 4 characters";
            updateMsg.style.color = "red";
            return;
        }

        // Load all users from localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if new username already exists (but allow if it's the user's current username)
        const existingUser = users.find(u => u.username === newUsername && u.username !== loggedInUser.username);

        if (existingUser) {
            updateMsg.innerText = "Username already taken by another user";
            updateMsg.style.color = "red";
            return;
        }

        // Find and update current user in the users array
        const userIndex = users.findIndex(u => u.username === loggedInUser.username);

        if (userIndex !== -1) {
            users[userIndex].username = newUsername;
            users[userIndex].password = newPassword;

            // Save updated users array to localStorage
            localStorage.setItem("users", JSON.stringify(users));

            // Update sessionStorage with new user data
            loggedInUser.username = newUsername;
            loggedInUser.password = newPassword;
            sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

            // Update welcome message
            welcomeMsg.innerText = `Welcome, ${newUsername}!`;

            // Success message
            updateMsg.innerText = "Profile updated successfully!";
            updateMsg.style.color = "green";
        } else {
            updateMsg.innerText = "Error updating profile";
            updateMsg.style.color = "red";
        }
    });

    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("loggedInUser");
        alert("Logged out successfully");
        window.location.href = "index.html";
    });
});