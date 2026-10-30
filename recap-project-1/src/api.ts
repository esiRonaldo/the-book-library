import { isBook, type Book } from "./types.js";

const API_URL = "http://localhost:4730";

async function fetchJson<T>(
    path: string,
    isType: (value: unknown) => value is T,
): Promise<T> {
    const response = await fetch(`${API_URL}${path}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.status}`);
    }

    const data: unknown = await response.json();
    if (!isType(data)) {
        throw new Error("Unexpected response format");
    }

    return data;
}

function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

export async function fetchBooks(): Promise<Book[]> {
    const data = await fetchJson("/books", isArray);
    return data.filter(isBook);
}

export async function fetchBook(isbn: string): Promise<Book> {
    return fetchJson(`/books/${isbn}`, isBook);
}
