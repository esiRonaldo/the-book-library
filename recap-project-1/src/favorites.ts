import { isFavoriteBook, type FavoriteBook } from "./types.js";

const STORAGE_KEY = "favorites";

const REMOVE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="fav"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd"/></svg>`;

function loadFavorites(): FavoriteBook[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (typeof stored !== "string") return [];

    const data: unknown = JSON.parse(stored);
    if (!Array.isArray(data)) return [];

    return data.filter(isFavoriteBook);
  } catch (error) {
    console.error(error);
    return [];
  }
}

let favorites: FavoriteBook[] = loadFavorites();

function saveFavorites(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error(error);
  }
}

export function isFavorite(isbn: string): boolean {
  return favorites.some((favorite) => favorite.isbn === isbn);
}

export function renderFavoriteCount(): void {
  const count = document.getElementById("favorite-count");
  if (!(count instanceof HTMLSpanElement)) return;

  count.textContent = String(favorites.length);
}

export function toggleFavorite(book: FavoriteBook): void {
  if (isFavorite(book.isbn)) {
    favorites = favorites.filter((favorite) => favorite.isbn !== book.isbn);
  } else {
    const favorite: FavoriteBook = {
      title: book.title,
      isbn: book.isbn,
      author: book.author,
      publisher: book.publisher,
    };
    favorites = [...favorites, favorite];
  }
  saveFavorites();
}

function createCell(text: string): HTMLTableCellElement {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

function createFavoriteRow(favorite: FavoriteBook): HTMLTableRowElement {
  const row = document.createElement("tr");

  const removeCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.className = "button button-clear fav-btn";
  removeButton.innerHTML = REMOVE_ICON;
  removeButton.addEventListener("click", () => {
    toggleFavorite(favorite);
    renderFavoriteList();
    renderFavoriteCount();
  });
  removeCell.append(removeButton);

  const detailCell = document.createElement("td");
  const detailLink = document.createElement("a");
  detailLink.href = `detail.html?isbn=${favorite.isbn}`;
  detailLink.className = "button";
  detailLink.textContent = "Detail";
  detailCell.append(detailLink);

  row.append(
    removeCell,
    createCell(favorite.title),
    createCell(favorite.isbn),
    createCell(favorite.author),
    createCell(favorite.publisher),
    detailCell,
  );
  return row;
}

function renderFavoriteList(): void {
  const favoriteList = document.getElementById("favorite-list");
  const favoriteHeading = document.getElementById("favorite-heading");
  if (!(favoriteList instanceof HTMLTableSectionElement)) return;
  if (!(favoriteHeading instanceof HTMLHeadingElement)) return;

  favoriteList.replaceChildren(...favorites.map(createFavoriteRow));
  favoriteHeading.textContent = `${favorites.length} Favorites on your list`;
}

console.log("favorite.ts loaded");

renderFavoriteCount();
renderFavoriteList();
