document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("regForm");
  const message = document.getElementById("regMessage");

  function showMessage(text, color) {
    message.innerText = text;
    message.style.color = color;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;

    // Empty check
    if (username === "" || password === "") {
      showMessage("Enter username and password", "red");
      return;
    }

    // Prevent admin creation
    if (username === "admin") {
      showMessage("Username admin is not allowed", "red");
      return;
    }

    // Use in-memory users array
    const users = window.USERS || [];

    // Duplicate check
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      showMessage("Username already exists", "red");
      return;
    }

    // Save user (in-memory)
    users.push({ username, password, role });
    window.USERS = users;

    showMessage("Registration successful", "green");
    form.reset();
  });

});
