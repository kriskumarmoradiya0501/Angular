// Shared in-memory users store (non-persistent).
// NOTE: This is an in-memory JSON array — data will NOT persist across page reloads.
// Pre-seeded demo user:
window.USERS = window.USERS || [
  { username: 'student1', password: '1234', role: 'student' }
];

// Admin is handled separately as a hard-coded credential: admin/admin
