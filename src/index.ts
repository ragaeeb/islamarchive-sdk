import type { Book, Bookmark, Page } from './types.js';

import { getBookPage, getBookTree } from './api.js';

export const getBook = async (id: number): Promise<Book> => {
    const result = await getBookPage(id);

    return {
        firstPageId: Number(result.firstid),
        id: Number(result.ibook_id),
        lastPageId: Number(result.lastid),
        name: result.bk,
    };
};

export const getPage = async (book: number, page: number): Promise<Page> => {
    const result = await getBookPage(book, page);

    return {
        id: Number(result.id),
        ...(result.hno && { index: Number(result.hno) }),
        text: result[2],
        title: result.tit,
    };
};

export const getBookmarks = async (book: number): Promise<Bookmark[]> => {
    const result = await getBookTree(book);
    return result.map((r) => ({
        id: r.id,
        link: r.a_attr.GetData,
        text: r.text,
        ...(r.parent && r.parent !== '#' && { parent: r.parent }),
    }));
};
