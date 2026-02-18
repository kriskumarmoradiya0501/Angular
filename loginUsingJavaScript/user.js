document.addEventListener("DOMContentLoaded", () => {

  const userName = sessionStorage.getItem("currentUser");
  const profile = document.getElementById("profile");
  const msg = document.getElementById("msg");

  function showMessage(text, color) {
    msg.innerText = text;
    msg.style.color = color;
  }

  // Not logged in → go back
  if (!userName) {
    window.location.href = "index.html";
    return;
  }

  const users = window.USERS || [];
  const user = users.find(u => u.username === userName);

  if (!user) {
    showMessage("User not found", "red");
    return;
  }

  // Show profile info
  profile.innerHTML = `
    <p><b>Username:</b> ${user.username}</p>
    <p><b>Role:</b> ${user.role || "student"}</p>
  `;

  // Change password
  document.getElementById("pwForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("newPw").value;

    if (newPassword === "") {
      showMessage("Enter new password", "red");
      return;
    }

    // update in-memory store
    const users2 = window.USERS || [];
    const idx = users2.findIndex(u => u.username === userName);
    if (idx === -1) { showMessage("User not found.", "red"); return; }
    users2[idx].password = newPassword;
    window.USERS = users2;

    showMessage("Password updated", "green");
    e.target.reset();
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
  });

});
