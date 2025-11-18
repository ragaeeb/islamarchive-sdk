import { getBookPage, getBookTree } from "./api.js";
import type { Book, Bookmark, Page } from "./types.js";

/**
 * Retrieve metadata for a book from islamarchive.
 *
 * @param id Unique identifier of the book.
 * @returns Normalised book metadata including page boundaries.
 */
export const getBook = async (id: number): Promise<Book> => {
    const result = await getBookPage(id);

    return {
        firstPageId: Number(result.firstid),
        id: Number(result.ibook_id),
        lastPageId: Number(result.lastid),
        name: result.bk,
    };
};

/**
 * Retrieve and normalise a page from a book.
 *
 * @param book Identifier of the book containing the page.
 * @param page Identifier of the page to fetch.
 * @returns The page content including optional hadith index when provided by the API.
 */
export const getPage = async (book: number, page: number): Promise<Page> => {
    const result = await getBookPage(book, page);

    return {
        id: Number(result.id),
        ...(result.hno && { index: Number(result.hno) }),
        text: result[2],
        title: result.tit,
    };
};

/**
 * Retrieve the bookmark tree for a book.
 *
 * @param book Identifier of the book whose bookmarks should be fetched.
 * @returns A list of bookmarks including optional parent relationships.
 */
export const getBookmarks = async (book: number): Promise<Bookmark[]> => {
    const result = await getBookTree(book);
    return result.map((r) => ({
        id: r.id,
        link: r.a_attr.GetData,
        text: r.text,
        ...(r.parent && r.parent !== "#" && { parent: r.parent }),
    }));
};
