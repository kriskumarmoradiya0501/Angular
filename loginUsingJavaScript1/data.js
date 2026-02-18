/**
 * Data initialization script
 * This file initializes the localStorage with default users if not already set
 * It runs on every page load to ensure a global 'users' variable is available
 */

// Get existing users from localStorage (or initialize with empty array)
let users = JSON.parse(localStorage.getItem("users")) || [];

// If localStorage is empty (first time), initialize with default users
if (users.length === 0) {
  // Default users array
  const defaultUsers = [
    { username: "admin", password: "admin@123", role: "admin" },
    { username: "john", password: "1234", role: "student" },
    { username: "kris", password: "1234", role: "student" }
  ];

  // Use spread operator to push all default users into the array
  users.push(...defaultUsers);

  // Save to localStorage for persistence
  localStorage.setItem("users", JSON.stringify(users));
}
