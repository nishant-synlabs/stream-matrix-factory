import { createContext, useContext, useState, useEffect } from 'react';

/* ─── Hard-coded admin credentials ─────────────────────────────────────── */
const ADMIN_EMAIL    = 'imaginebo81@gmail.com';
const ADMIN_PASSWORD = '1234567890';

/* ─── Simulated user database (persisted to localStorage) ──────────────── */
function loadUsers() {
  try {
    const raw = localStorage.getItem('nc_users');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem('nc_users', JSON.stringify(users));
}

function loadSession() {
  try {
    const raw = localStorage.getItem('nc_session');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(user) {
  if (user) {
    localStorage.setItem('nc_session', JSON.stringify(user));
  } else {
    localStorage.removeItem('nc_session');
  }
}

/* ─── Context ───────────────────────────────────────────────────────────── */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => loadSession());

  useEffect(() => {
    saveSession(currentUser);
  }, [currentUser]);

  /* Login — checks admin credentials first, then local user DB */
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const normalised = email.trim().toLowerCase();

        // Admin check
        if (
          normalised === ADMIN_EMAIL.toLowerCase() &&
          password === ADMIN_PASSWORD
        ) {
          const adminUser = {
            id: 'admin-001',
            name: 'Admin',
            email: ADMIN_EMAIL,
            role: 'admin',
          };
          setCurrentUser(adminUser);
          resolve(adminUser);
          return;
        }

        // Regular user check
        const users = loadUsers();
        const found = users.find(
          (u) =>
            u.email.toLowerCase() === normalised && u.password === password
        );

        if (found) {
          const user = { id: found.id, name: found.name, email: found.email, role: 'user' };
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 400);
    });
  };

  /* Signup — adds to local user DB */
  const signup = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const normalised = email.trim().toLowerCase();

        // Block admin email from being re-registered
        if (normalised === ADMIN_EMAIL.toLowerCase()) {
          reject(new Error('This email is reserved. Please use a different one.'));
          return;
        }

        const users = loadUsers();
        if (users.find((u) => u.email.toLowerCase() === normalised)) {
          reject(new Error('An account with this email already exists.'));
          return;
        }

        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email: normalised,
          password,
          role: 'user',
        };
        saveUsers([...users, newUser]);

        const session = { id: newUser.id, name: newUser.name, email: newUser.email, role: 'user' };
        setCurrentUser(session);
        resolve(session);
      }, 500);
    });
  };

  /* Logout */
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
