// Simple login script - client-side demo only
// Admin credentials: admin / admin

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const message = document.getElementById('message');

  function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color || 'black';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = (document.getElementById('username').value || '').trim();
    const password = (document.getElementById('password').value || '');

    // validation
    if (!username || !password) {
      showMessage('Please enter both username and password.', 'red');
      return;
    }
    if (username.length < 3 || password.length < 4) {
      showMessage('Username must be at least 3 chars and password at least 4 chars.', 'red');
      return;
    }

    // admin login
    if (username === 'admin' && password === 'admin') {
      showMessage('Login successful (admin). Redirecting...', 'green');
      sessionStorage.setItem('isAdmin', 'true');
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 600);
      return;
    }

    // check users from in-memory USERS array
    const users = window.USERS || [];
    const matched = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    if (matched) {
      showMessage('Login successful. Redirecting to your profile...', 'green');
      sessionStorage.setItem('currentUser', matched.username);
      sessionStorage.setItem('currentUserRole', matched.role || 'student');
      setTimeout(() => { window.location.href = 'user.html'; }, 600);
    } else {
      showMessage('Invalid username or password.', 'red');
    }
  });
});