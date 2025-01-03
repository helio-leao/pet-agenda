const KEY = "session";

export function getLocalStorageSession() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

export function setLocalStorageSession(data: any) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function removeLocalStorageSession() {
  localStorage.removeItem(KEY);
}
