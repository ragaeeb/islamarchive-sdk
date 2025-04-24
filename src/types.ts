export type Book = {
    firstPageId: number;
    id: number;
    lastPageId: number;
    name: string;
};

export type Bookmark = {
    id: string;
    link: string;
    parent?: string;
    text: string;
};

export type Page = {
    id: number;
    index?: number;
    text: string;
    title: string;
};
