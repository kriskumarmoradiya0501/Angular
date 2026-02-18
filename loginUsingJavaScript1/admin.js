/**
 * Admin Dashboard functionality
 * Complete user management system for admins
 * - View all users
 * - Add new users
 * - Delete users
 * - Change user roles
 */

document.addEventListener("DOMContentLoaded", () => {
    // Get logged-in user from sessionStorage
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    // Access control: only admins can access this page
    if (!loggedInUser) {
        alert("Please login first");
        window.location.href = "index.html";
        return;
    }

    if (loggedInUser.role !== "admin") {
        alert("Access denied. Admins only.");
        window.location.href = "user.html";
        return;
    }

    // Display welcome message
    const welcomeMsg = document.getElementById("welcomeMsg");
    welcomeMsg.innerText = `Admin Dashboard - Welcome, ${loggedInUser.username}!`;

    // Function to load and display all users
    function loadUsers() {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const tableBody = document.getElementById("usersTableBody");
        tableBody.innerHTML = ""; // Clear existing rows

        if (users.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='4'>No users found</td></tr>";
            return;
        }

        users.forEach((user, index) => {
            const row = document.createElement("tr");

            // Determine if this is the current logged-in admin
            const isCurrentUser = user.username === loggedInUser.username;

            row.innerHTML = `
                <td>${user.username}</td>
                <td>${"*".repeat(user.password.length)}</td>
                <td>${user.role}</td>
                <td>
                    <button class="role-btn" onclick="changeRole(${index})" ${isCurrentUser ? 'disabled' : ''}>
                        Change to ${user.role === 'admin' ? 'Student' : 'Admin'}
                    </button>
                    <button class="delete-btn" onclick="deleteUser(${index})" ${isCurrentUser ? 'disabled' : ''}>
                        Delete
                    </button>
                    ${isCurrentUser ? '(You)' : ''}
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    // Add new user
    const newUserForm = document.getElementById("newUserForm");
    newUserForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("newUsername").value.trim();
        const password = document.getElementById("newPassword").value.trim();
        const role = document.getElementById("newRole").value;
        const addMsg = document.getElementById("addMsg");

        // Validation
        if (username === "" || password === "") {
            addMsg.innerText = "Username and password are required";
            addMsg.style.color = "red";
            return;
        }

        if (password.length < 4) {
            addMsg.innerText = "Password must be at least 4 characters";
            addMsg.style.color = "red";
            return;
        }

        // Load users
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check for duplicate username
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            addMsg.innerText = "Username already exists";
            addMsg.style.color = "red";
            return;
        }

        // Add new user
        users.push({
            username: username,
            password: password,
            role: role
        });

        // Save to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Success message
        addMsg.innerText = `User '${username}' added successfully!`;
        addMsg.style.color = "green";

        // Clear form
        newUserForm.reset();

        // Reload users table
        loadUsers();

        // Clear success message after 3 seconds
        setTimeout(() => {
            addMsg.innerText = "";
        }, 3000);
    });

    // Delete user function (made global so it can be called from HTML)
    window.deleteUser = function (index) {
        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const deletedUser = users[index];

        // Prevent admin from deleting themselves
        if (deletedUser.username === loggedInUser.username) {
            alert("You cannot delete yourself!");
            return;
        }

        // Remove user
        users.splice(index, 1);

        // Save to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Reload users table
        loadUsers();

        alert(`User '${deletedUser.username}' deleted successfully`);
    };

    // Change user role function (made global so it can be called from HTML)
    window.changeRole = function (index) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users[index];

        // Prevent admin from changing their own role
        if (user.username === loggedInUser.username) {
            alert("You cannot change your own role!");
            return;
        }

        // Toggle role
        user.role = user.role === "admin" ? "student" : "admin";

        // Save to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Reload users table
        loadUsers();

        alert(`User '${user.username}' role changed to '${user.role}'`);
    };

    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("loggedInUser");
        alert("Logged out successfully");
        window.location.href = "index.html";
    });

    // Initial load of users
    loadUsers();
});
