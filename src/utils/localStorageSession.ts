import { Session } from "react-router-dom";

const KEY = "session";

export function getLocalStorageSession() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

export function setLocalStorageSession(data: Session) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function removeLocalStorageSession() {
  localStorage.removeItem(KEY);
}
