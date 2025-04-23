// Centralized API for backend calls
const API_BASE = import.meta.env.VITE_API_URL;

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
  return res.json();
}

export async function signup({ name, email, password, role, manager, phone }) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role, manager, phone })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Signup failed');
  return res.json();
}

export function setToken(token) {
  localStorage.setItem('fintrak_token', token);
}

export function getToken() {
  return localStorage.getItem('fintrak_token');
}

export function logout() {
  localStorage.removeItem('fintrak_token');
}

export async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  return fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Authorization': `Bearer ${token}`
    }
  });
}

export async function updateProfile({ name, password }) {
  const token = getToken();
  const res = await fetch(`${API_BASE}/users/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, password })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Profile update failed');
  return res.json();
}

export async function getMyExpenses() {
  const res = await fetchWithAuth('/expenses/mine');
  if (!res.ok) throw new Error('Failed to fetch expenses');
  return res.json();
}

export async function getManagers() {
  const res = await fetch(`${API_BASE}/users/managers`);
  if (!res.ok) throw new Error('Failed to fetch managers');
  return res.json();
}

export async function createExpense({ date, category, amount, description }) {
  const res = await fetchWithAuth('/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, category, amount, description })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Expense creation failed');
  return res.json();
}

export async function getTeamExpenses() {
  const res = await fetchWithAuth('/expenses/team');
  if (!res.ok) throw new Error('Failed to fetch team expenses');
  return res.json();
}

export async function getAllExpenses() {
  const res = await fetchWithAuth('/expenses');
  if (!res.ok) throw new Error('Failed to fetch all expenses');
  return res.json();
}

export async function getAllEmployees() {
  const res = await fetchWithAuth('/users');
  if (!res.ok) throw new Error('Failed to fetch employees');
  const users = await res.json();
  return users.filter(u => u.role === 'employee');
}
