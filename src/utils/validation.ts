const required = (v: string) => v.trim().length > 0;
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const minLen = (v: string, n: number) => v.trim().length >= n;

export function validateSignIn({ email, password }: { email: string; password: string }) {
  const e: { email?: string; password?: string } = {};
  if (!isEmail(email)) e.email = 'Enter a valid email';
  if (!required(password)) e.password = 'Password is required';
  return e;
}

export function validateSignUp({ fullName, email, password }: { fullName: string; email: string; password: string }) {
  const e: { name?: string; email?: string; password?: string } = {};
  if (!required(fullName)) e.name = 'Full name is required';
  if (!isEmail(email)) e.email = 'Enter a valid email';
  if (!minLen(password, 6)) e.password = 'Min 6 characters';
  return e;
}
