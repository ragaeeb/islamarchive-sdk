import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";

import { getBook, getBookmarks, getPage } from "./index.js";

const originalFetch = globalThis.fetch;

const createJsonResponse = (data: unknown): Response =>
    new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });

describe("index", () => {
    beforeEach(() => {
        globalThis.fetch = originalFetch;
    });

    afterEach(() => {
        globalThis.fetch = originalFetch;
    });

    describe("getBook", () => {
        it("should get the book info", async () => {
            const payload = {
                2: "page text",
                bk: "الوجيز في أسباب ونتائج قتل عثمان",
                firstid: "1310008",
                ibook_id: "2034",
                id: "1310008",
                lastid: "1310139",
                page: "1",
                part: "1",
                seal: "",
                tit: "ignored",
            };

            const fetchMock = mock(async () => createJsonResponse(payload));
            globalThis.fetch = fetchMock as typeof fetch;

            const actual = await getBook(2034);
            expect(actual).toEqual({
                firstPageId: 1310008,
                id: 2034,
                lastPageId: 1310139,
                name: "الوجيز في أسباب ونتائج قتل عثمان",
            });

            expect(fetchMock.mock.calls.length).toBe(1);
            const [request] = fetchMock.mock.calls[0] ?? [];
            const url = new URL(request.toString());
            expect(url.searchParams.get("bookid")).toBe("2034");
            expect(url.searchParams.get("view")).toBe("book");
        });
    });

    describe("getBookmarks", () => {
        it("should get the tree", async () => {
            const payload = [
                {
                    a_attr: {
                        GetData: "1_5086294",
                        href: "#",
                    },
                    id: "5086294_33022",
                    parent: "#",
                    text: "مجموعة فتاوى ومؤيدات للكتاب",
                },
                {
                    a_attr: {
                        GetData: "52_5086295",
                        href: "#",
                    },
                    id: "5086295_33022",
                    parent: "5086294_33022",
                    text: "المقدمة",
                },
            ];

            const fetchMock = mock(async () => createJsonResponse(payload));
            globalThis.fetch = fetchMock as typeof fetch;

            const actual = await getBookmarks(33022);
            expect(actual).toEqual([
                {
                    id: "5086294_33022",
                    link: "1_5086294",
                    text: "مجموعة فتاوى ومؤيدات للكتاب",
                },
                {
                    id: "5086295_33022",
                    link: "52_5086295",
                    parent: "5086294_33022",
                    text: "المقدمة",
                },
            ]);

            expect(fetchMock.mock.calls.length).toBe(1);
            const [request] = fetchMock.mock.calls[0] ?? [];
            const url = new URL(request.toString());
            expect(url.searchParams.get("b")).toBe("33022");
            expect(url.searchParams.get("p")).toBe("Shamlaa_treee_book");
        });
    });

    describe("getPage", () => {
        it("should get the page with the index", async () => {
            const payload = {
                2: "2754 - حَدَّثَنَا ...",
                bk: "ignored",
                firstid: "4924701",
                hno: "2754",
                ibook_id: "1201",
                id: "4924708",
                lastid: "4924800",
                page: "10",
                part: "1",
                seal: "",
                tit: "58 - باب الوضوء مما غيرت النار",
            };

            const fetchMock = mock(async () => createJsonResponse(payload));
            globalThis.fetch = fetchMock as typeof fetch;

            const actual = await getPage(1201, 4924708);
            expect(actual).toEqual({
                id: 4924708,
                index: 2754,
                text: "2754 - حَدَّثَنَا ...",
                title: "58 - باب الوضوء مما غيرت النار",
            });

            expect(fetchMock.mock.calls.length).toBe(1);
            const [request] = fetchMock.mock.calls[0] ?? [];
            const url = new URL(request.toString());
            expect(url.searchParams.get("bookid")).toBe("1201");
            expect(url.searchParams.get("id")).toBe("4924708");
        });

        it("should get the page without an index", async () => {
            const payload = {
                2: "page without index",
                bk: "ignored",
                firstid: "1310008",
                ibook_id: "2034",
                id: "1310008",
                lastid: "1310139",
                page: "1",
                part: "1",
                seal: "",
                tit: "الوجيز المفيد في تبيان أسباب ونتائج قتل عثمان بن عفان",
            };

            const fetchMock = mock(async () => createJsonResponse(payload));
            globalThis.fetch = fetchMock as typeof fetch;

            const actual = await getPage(2034, 1310008);
            expect(actual).toEqual({
                id: 1310008,
                text: "page without index",
                title: "الوجيز المفيد في تبيان أسباب ونتائج قتل عثمان بن عفان",
            });

            expect(fetchMock.mock.calls.length).toBe(1);
            const [request] = fetchMock.mock.calls[0] ?? [];
            const url = new URL(request.toString());
            expect(url.searchParams.get("bookid")).toBe("2034");
            expect(url.searchParams.get("id")).toBe("1310008");
        });
    });
});
