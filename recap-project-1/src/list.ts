import { fetchBooks } from "./api.js";
import type { Book } from "./types.js";

const bookList = document.getElementById("book-list");
const bookCount = document.getElementById("book-count");
const searchInput = document.getElementById("search");
const publisherSelect = document.getElementById("by-publisher");
const bookTable = document.getElementById("book-table");

function createCell(text: string): HTMLTableCellElement {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

function createRow(book: Book): HTMLTableRowElement {
  const row = document.createElement("tr");


  const favCell = document.createElement("td");
  const detailCell = document.createElement("td");
  const detailLink = document.createElement("a");
  detailLink.href = `detail.html?isbn=${book.isbn}`;
  detailLink.className = "button";
  detailLink.textContent = "Detail";
  detailCell.append(detailLink);

  row.append(
    favCell,
    createCell(book.title),
    createCell(book.isbn),
    createCell(book.author),
    createCell(book.publisher),
    detailCell,
  );
  return row;
}

function renderBooks(books: Book[]): void {
  if (!(bookList instanceof HTMLTableSectionElement)) return;
  if (!(bookCount instanceof HTMLHeadingElement)) return;

  bookList.replaceChildren(...books.map(createRow));
  bookCount.textContent = `${books.length} Books displayed`;
}

function renderPublishers(books: Book[]): void {
  if (!(publisherSelect instanceof HTMLSelectElement)) return;

  const publishers = [...new Set(books.map((book) => book.publisher))].sort(
    (a, b) => a.localeCompare(b),
  );
  const options = publishers.map(
    (publisher) => new Option(publisher, publisher),
  );
  publisherSelect.replaceChildren(new Option("-", "-"), ...options);
}

function showError(message: string): void {
  if (!(bookTable instanceof HTMLTableElement)) return;
  if (!(bookCount instanceof HTMLHeadingElement)) return;

  const error = document.createElement("p");
  error.textContent = message;
  bookTable.replaceWith(error);
  bookCount.textContent = "No books displayed";
}

let books: Book[] = [];

try {
  books = await fetchBooks();
  renderBooks(books);
  renderPublishers(books);
} catch (error) {
  console.error(error);
  showError("Books could not be loaded. Please try again later.");
}

function applyFilters(): void {
  if (!(searchInput instanceof HTMLInputElement)) return;
  if (!(publisherSelect instanceof HTMLSelectElement)) return;

  const search = searchInput.value.trim().toLowerCase();
  const publisher = publisherSelect.value;

  const filtered = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search) &&
      (publisher === "-" || book.publisher === publisher),
  );
  renderBooks(filtered);
}

if (searchInput instanceof HTMLInputElement) {
    console.log('---------------------')
    searchInput.addEventListener("input", applyFilters);
    searchInput.form?.addEventListener("submit", (event) => {
        event.preventDefault();
    });
}

if (publisherSelect instanceof HTMLSelectElement) {
    console.log('***************')
  publisherSelect.addEventListener("change", applyFilters);
}