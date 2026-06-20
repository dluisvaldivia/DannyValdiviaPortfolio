const AUTH_KEY = 'admin_auth';

export function login(user: string, pass: string): boolean {
  const validUser = import.meta.env.VITE_ADMIN_USER;
  const validPass = import.meta.env.VITE_ADMIN_PASS;
  if (user === validUser && pass === validPass) {
    sessionStorage.setItem(AUTH_KEY, '1');
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === '1';
}
