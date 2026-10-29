export interface Book {
  title: string;
  isbn: string;
  author: string;
  publisher: string;
}
//TODO: fetch all the property
export function isBook(value: unknown): value is Book {
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