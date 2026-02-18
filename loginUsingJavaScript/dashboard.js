document.addEventListener('DOMContentLoaded', () => {
  // Admin check
  if (sessionStorage.getItem('isAdmin') !== 'true') {
    window.location.href = 'index.html';
    return;
  }

  const userList = document.getElementById('userList');
  const addForm = document.getElementById('addForm');
  const searchInput = document.getElementById('searchInput');
  const messageEl = document.getElementById('message');

  function getUsers() { return window.USERS || []; }
  function saveUsers(users) { window.USERS = users; }
  function showMessage(text, color) { if (messageEl) { messageEl.textContent = text; messageEl.style.color = color || 'black'; } }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;' }[c]));
  }

  function render(filter='') {
    const users = getUsers().filter(u => u.username.toLowerCase().includes(filter.toLowerCase()));
    userList.innerHTML = '';
    if (!users.length) {
      userList.innerHTML = '<tr><td colspan="4">No users found.</td></tr>';
      return;
    }

    users.forEach((u, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${escapeHtml(u.username)}</td>
        <td>${escapeHtml(u.role || 'student')}</td>
        <td>
          <button class="editBtn" data-username="${escapeHtml(u.username)}">Edit</button>
          <button class="deleteBtn" data-username="${escapeHtml(u.username)}">Delete</button>
        </td>
      `;
      userList.appendChild(tr);
    });
  }

  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = (document.getElementById('newUsername').value || '').trim();
    const password = (document.getElementById('newPassword').value || '');
    const role = (document.getElementById('newRole').value || 'student');

    if (!username || !password) { showMessage('Please enter both username and password.', 'red'); return; }
    if (username.length < 3 || password.length < 4) { showMessage('Username must be at least 3 chars and password at least 4 chars.', 'red'); return; }
    if (username.toLowerCase() === 'admin') { showMessage('Cannot create user with reserved name "admin".', 'red'); return; }

    const users = getUsers();
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) { showMessage('Username already exists.', 'red'); return; }

    users.push({ username, password, role });
    saveUsers(users);
    showMessage('User added.', 'green');
    addForm.reset();
    render(searchInput.value);
  });

  userList.addEventListener('click', (e) => {
    if (e.target && e.target.matches('button.deleteBtn')) {
      const username = e.target.getAttribute('data-username');
      if (username === 'admin') { showMessage('Cannot delete admin account.', 'red'); return; }
      if (!confirm(`Delete user "${username}"?`)) return;
      let users = getUsers();
      users = users.filter(u => u.username !== username);
      saveUsers(users);
      showMessage('User deleted.', 'green');
      render(searchInput.value);
    }

    if (e.target && e.target.matches('button.editBtn')) {
      const username = e.target.getAttribute('data-username');
      const tr = e.target.closest('tr');
      const users = getUsers();
      const idx = users.findIndex(u => u.username === username);
      if (idx === -1) return;

      // replace row with edit inputs
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td><input class="editUsername" value="${escapeHtml(users[idx].username)}" /></td>
        <td>
          <input class="editPassword" placeholder="New password or leave" />
          <select class="editRole">
            <option value="student">student</option>
            <option value="admin">admin</option>
          </select>
        </td>
        <td>
          <button class="saveBtn">Save</button>
          <button class="cancelBtn">Cancel</button>
        </td>
      `;
      // set current role selected
      tr.querySelector('.editRole').value = users[idx].role || 'student';

      tr.querySelector('.cancelBtn').addEventListener('click', () => render(searchInput.value));

      tr.querySelector('.saveBtn').addEventListener('click', () => {
        const newUsername = (tr.querySelector('.editUsername').value || '').trim();
        const newPassword = tr.querySelector('.editPassword').value;
        const newRole = tr.querySelector('.editRole').value;

        if (!newUsername) { showMessage('Username cannot be empty.', 'red'); return; }
        if (newUsername.length < 3) { showMessage('Username must be at least 3 characters.', 'red'); return; }
        if (newUsername.toLowerCase() === 'admin') { showMessage('Cannot use reserved username "admin".', 'red'); return; }

        // check duplicate username (excluding current)
        const duplicate = getUsers().some((u, i) => i !== idx && u.username.toLowerCase() === newUsername.toLowerCase());
        if (duplicate) { showMessage('Another user with this username already exists.', 'red'); return; }

        const users2 = getUsers();
        users2[idx].username = newUsername;
        if (newPassword) {
          if (newPassword.length < 4) { showMessage('Password must be at least 4 characters.', 'red'); return; }
          users2[idx].password = newPassword;
        }
        users2[idx].role = newRole;
        saveUsers(users2);
        showMessage('User updated.', 'green');
        render(searchInput.value);
      });
    }
  });

  searchInput.addEventListener('input', () => render(searchInput.value));

  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
  });

  // initial render
  render();
});
