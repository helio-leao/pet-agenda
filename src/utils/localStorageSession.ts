import Session from "../types/Session";

const KEY = "session";

export function getLocalStorageSession(): Session | null {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

export function setLocalStorageSession(data: Session) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function removeLocalStorageSession() {
  localStorage.removeItem(KEY);
}
