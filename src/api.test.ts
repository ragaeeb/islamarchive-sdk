import { describe, expect, it, mock } from "bun:test";

import { getBookPage, getBookTree } from "./api.js";

describe("api", () => {
    it("requests the expected page payload", async () => {
        const payload = {
            2: "content",
            bk: "Book name",
            firstid: "1",
            ibook_id: "99",
            id: "5",
            lastid: "10",
            page: "2",
            part: "part",
            seal: "seal",
            tit: "Title",
        };

        const fetchMock = mock(async (_input: RequestInfo | URL) => {
            return new Response(JSON.stringify(payload), {
                headers: { "Content-Type": "application/json" },
            });
        });

        const originalFetch = globalThis.fetch;
        globalThis.fetch = fetchMock as typeof fetch;

        try {
            const result = await getBookPage(42, 7);
            expect(result).toEqual(payload);

            expect(fetchMock.mock.calls.length).toBe(1);
            const [request] = fetchMock.mock.calls[0] ?? [];
            expect(request).toBeDefined();

            const requestUrl = new URL(request.toString());
            expect(requestUrl.searchParams.get("bookid")).toBe("42");
            expect(requestUrl.searchParams.get("id")).toBe("7");
            expect(requestUrl.searchParams.get("view")).toBe("book");
            expect(requestUrl.searchParams.get("p")).toBe("Shamlaa_books");
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    it("requests the bookmark tree", async () => {
        const payload = [
            {
                a_attr: {
                    GetData: "data",
                    href: "#",
                },
                id: "node-1",
                parent: "#",
                text: "Node",
            },
        ];

        const fetchMock = mock(async () => {
            return new Response(JSON.stringify(payload), {
                headers: { "Content-Type": "application/json" },
            });
        });

        const originalFetch = globalThis.fetch;
        globalThis.fetch = fetchMock as typeof fetch;

        try {
            const result = await getBookTree(55);
            expect(result).toEqual(payload);

            expect(fetchMock.mock.calls.length).toBe(1);
            const [request] = fetchMock.mock.calls[0] ?? [];
            const requestUrl = new URL(request.toString());
            expect(requestUrl.searchParams.get("b")).toBe("55");
            expect(requestUrl.searchParams.get("p")).toBe("Shamlaa_treee_book");
        } finally {
            globalThis.fetch = originalFetch;
        }
    });
});
