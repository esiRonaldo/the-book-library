import { fetchBook } from "./api.js";
import { renderFavoriteCount } from "./favorites.js";
import type { Book } from "./types.js";

const titleHeading = document.getElementById("book-title");
const abstractText = document.getElementById("book-abstract");
const authorText = document.getElementById("book-author");
const publisherText = document.getElementById("book-publisher");
const pagesText = document.getElementById("book-pages");
const coverImage = document.getElementById("book-cover");
const bookDetails = document.getElementById("book-details");

renderFavoriteCount();

function renderBook(book: Book): void {
  if (!(titleHeading instanceof HTMLHeadingElement)) return;
  if (!(abstractText instanceof HTMLParagraphElement)) return;
  if (!(authorText instanceof HTMLSpanElement)) return;
  if (!(publisherText instanceof HTMLSpanElement)) return;
  if (!(pagesText instanceof HTMLSpanElement)) return;
  if (!(coverImage instanceof HTMLImageElement)) return;

  titleHeading.replaceChildren(book.title);
  if (typeof book.subtitle === "string") {
    const subtitle = document.createElement("small");
    subtitle.textContent = book.subtitle;
    titleHeading.append(document.createElement("br"), subtitle);
  }

  abstractText.textContent = book.abstract;
  authorText.textContent = book.author;
  publisherText.textContent = book.publisher;
  pagesText.textContent = String(book.numPages);
  coverImage.src = book.cover;
  coverImage.alt = `Cover of ${book.title}`;
}

function showError(message: string): void {
  if (!(titleHeading instanceof HTMLHeadingElement)) return;
  if (!(bookDetails instanceof HTMLElement)) return;

  titleHeading.textContent = "Book not found";
  const error = document.createElement("p");
  error.textContent = message;
  bookDetails.replaceWith(error);
}

const params = new URLSearchParams(window.location.search);
const isbn = params.get("isbn");

if (typeof isbn === "string") {
  try {
    const book = await fetchBook(isbn);
    renderBook(book);
  } catch (error) {
    console.error(error);
    showError(`This book could not be loaded. Please check the ISBN. ${error}`);
  }
} else {
  showError("No ISBN was given.");
}
