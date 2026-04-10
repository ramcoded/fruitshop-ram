const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "Request failed");
  }
  if (res.status === 204) return null as T;
  return res.json();
}

export interface Fruit {
  id?: number;
  name: string;
  weight: number;
  price: number;
}

export interface AuthResponse {
  token: string;
}

export const api = {
  auth: {
    login: (username: string, password: string) =>
      request<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }),
    register: (username: string, password: string) =>
      request<{ message: string }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }),
  },
  fruits: {
    getAll: () => request<Fruit[]>("/api/fruits"),
    getById: (id: number) => request<Fruit>(`/api/fruits/${id}`),
    create: (fruit: Omit<Fruit, "id">) =>
      request<Fruit>("/api/fruits", { method: "POST", body: JSON.stringify(fruit) }),
    update: (id: number, fruit: Omit<Fruit, "id">) =>
      request<Fruit>(`/api/fruits/${id}`, { method: "PUT", body: JSON.stringify(fruit) }),
    delete: (id: number) =>
      request<null>(`/api/fruits/${id}`, { method: "DELETE" }),
  },
};
