import { URL } from "node:url";

type QueryParamValue = string | number | boolean | undefined;

type ShamlaaBookResponse = {
    2: string; // page text
    bk: string;
    firstid: string;
    hno?: string;
    ibook_id: string;
    id: string;
    lastid: string;
    page: string;
    part: string;
    seal: string;
    tit: string;
};

type ShamlaaTreeNode = {
    a_attr: {
        GetData: string;
        href: string;
    };
    id: string;
    parent: string;
    text: string;
};

/**
 * Execute a JSON GET request against the islamarchive API.
 *
 * @template T The expected JSON response shape.
 * @param queryParams Optional query string parameters to append to the request.
 * @returns A promise resolving with the parsed JSON payload.
 */
const doGetRequest = async <T>(queryParams: Record<string, QueryParamValue> = {}): Promise<T> => {
    const url = new URL(`https://islamarchive.cc/actions.php`);

    Object.entries(queryParams).forEach(([key, value]) => {
        if (value === undefined) {
            return;
        }

        url.searchParams.set(key, String(value));
    });

    const response = await fetch(url);
    return response.json();
};

/**
 * Retrieve a specific page of a book from the islamarchive service.
 *
 * @param bookId Identifier of the requested book.
 * @param pageId Optional identifier of the page within the book. When omitted, the first page is returned.
 * @returns The raw Shamlaa API response for the requested page.
 */
export const getBookPage = async (bookId: number, pageId?: number): Promise<ShamlaaBookResponse> => {
    return doGetRequest({ bookid: bookId, ...(pageId && { id: pageId }), p: "Shamlaa_books", view: "book" });
};

/**
 * Retrieve the bookmark tree for a book from the islamarchive service.
 *
 * @param bookId Identifier of the requested book.
 * @returns A list of tree nodes describing the bookmark hierarchy.
 */
export const getBookTree = async (bookId: number): Promise<ShamlaaTreeNode[]> => {
    return doGetRequest({ b: bookId, p: "Shamlaa_treee_book" });
};
