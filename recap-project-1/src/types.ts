export interface Book {
  title: string;
  subtitle?: string;
  isbn: string;
  abstract: string;
  author: string;
  publisher: string;
  numPages: number;
  cover: string;
}

export type FavoriteBook = Pick<Book, "title" | "isbn" | "author" | "publisher">;

export function isBook(value: unknown): value is Book {
  return (
    typeof value === "object" &&
    value !== null &&
    "title" in value &&
    typeof value.title === "string" &&
    (!("subtitle" in value) || typeof value.subtitle === "string") &&
    "isbn" in value &&
    typeof value.isbn === "string" &&
    "abstract" in value &&
    typeof value.abstract === "string" &&
    "author" in value &&
    typeof value.author === "string" &&
    "publisher" in value &&
    typeof value.publisher === "string" &&
    "numPages" in value &&
    typeof value.numPages === "number" &&
    "cover" in value &&
    typeof value.cover === "string"
  );
}

export function isFavoriteBook(value: unknown): value is FavoriteBook {
  return (
    typeof value === "object" &&
    value !== null &&
    "title" in value &&
    typeof value.title === "string" &&
    "isbn" in value &&
    typeof value.isbn === "string" &&
    "author" in value &&
    typeof value.author === "string" &&
    "publisher" in value &&
    typeof value.publisher === "string"
  );
}
