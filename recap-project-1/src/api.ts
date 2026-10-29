import { isBook, type Book } from "./types.js";

const API_URL = "http://localhost:4730";

export async function fetchBooks(): Promise<Book[]> {
  const response = await fetch(`${API_URL}/books`);
  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Unexpected response format");
  }

  return data.filter(isBook);
}