import { describe, expect, it } from 'bun:test';

import { getBook, getBookmarks, getPage } from './index';

describe('index', () => {
    describe('getBook', () => {
        it('should get the book info', async () => {
            const actual = await getBook(2034);
            expect(actual).toEqual({
                firstPageId: 1310008,
                id: 2034,
                lastPageId: 1310139,
                name: 'الوجيز في أسباب ونتائج قتل عثمان',
            });
        });
    });

    describe('getBookmarks', () => {
        it('should get the tree', async () => {
            const actual = await getBookmarks(33022);
            expect(actual).toEqual([
                {
                    id: '5086294_33022',
                    link: '1_5086294',
                    text: 'مجموعة فتاوى ومؤيدات للكتاب',
                },
                {
                    id: '5086295_33022',
                    link: '52_5086295',
                    text: 'المقدمة',
                },
                {
                    id: '5086296_33022',
                    link: '62_5086296',
                    text: 'الباب الأول: مطاعن عبدالرحمن عبدالخالق',
                },
                {
                    id: '5086297_33022',
                    link: '109_5086297',
                    text: 'الباب الثاني: تفنيد طعن عبدالرحمن',
                },
                {
                    id: '5086298_33022',
                    link: '121_5086298',
                    text: 'الباب الثالث: دفع مطاعن عبدالرحمن عبدالخالق',
                },
                {
                    id: '5086299_33022',
                    link: '176_5086299',
                    text: 'الخلاصة',
                },
            ]);
        });
    });

    describe('getPage', () => {
        it('should get the page with the index', async () => {
            const actual = await getPage(1201, 4924708);
            expect(actual).toEqual({
                id: 4924708,
                index: 2754,
                text: expect.stringContaining('2754 - حَدَّثَنَا'),
                title: '58 - باب الوضوء مما غيرت النار',
            });
        });

        it('should get the page without an index', async () => {
            const actual = await getPage(2034, 1310008);
            expect(actual).toEqual({
                id: 1310008,
                text: expect.any(String),
                title: 'الوجيز المفيد في تبيان أسباب ونتائج قتل عثمان بن عفان',
            });
        });
    });
});
