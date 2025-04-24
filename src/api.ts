import { URL, URLSearchParams } from 'node:url';

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

const doGetRequest = async <T extends Record<string, any>>(queryParams: Record<string, any> = {}): Promise<T> => {
    const url = new URL(`https://islamarchive.cc/actions.php`);

    if (Object.keys(queryParams).length > 0) {
        const params = new URLSearchParams();

        Object.entries(queryParams).forEach(([key, value]) => {
            params.append(key, value.toString());
        });

        url.search = params.toString();
    }

    const response = await fetch(url);
    return response.json();
};

export const getBookPage = async (bookId: number, pageId?: number): Promise<ShamlaaBookResponse> => {
    return doGetRequest({ bookid: bookId, ...(pageId && { id: pageId }), p: 'Shamlaa_books', view: 'book' });
};

export const getBookTree = async (bookId: number): Promise<ShamlaaTreeNode[]> => {
    return doGetRequest({ b: bookId, p: 'Shamlaa_treee_book' });
};
