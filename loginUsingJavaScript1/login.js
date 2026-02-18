/**
 * Login functionality
 * Validates user credentials against localStorage data
 * Redirects to user dashboard on successful login
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate empty fields
    if (username === "" || password === "") {
      alert("Please enter ID and Password");
      return;
    }

    // Load users from localStorage (always get fresh data)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      // Login successful
      document.getElementById("msg").innerText = "Login Successful! Redirecting...";
      document.getElementById("msg").style.color = "green";

      // Store logged-in user info in sessionStorage for the dashboard
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));

      // Role-based redirect: admins go to admin panel, students to user dashboard
      setTimeout(() => {
        if (user.role === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "user.html";
        }
      }, 1000);
    }
    else {
      // Login failed
      document.getElementById("msg").innerText = "Invalid username or password";
      document.getElementById("msg").style.color = "red";
    }
  });
});
