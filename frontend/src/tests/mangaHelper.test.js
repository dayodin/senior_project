import { expect, test } from '@jest/globals';
import { mangaExists, addManga, isMangaEqual } from "../helpers/mangaHelpers"
import { deleteData } from '../helpers/apiHelpers';

const testMangaData1 = {
    series_id: "series_id1",
    author_ids: ["author_id1", "author_id2"],
    volume: 1,
    isbn: "1234",
    isbn10: "123456",
    isbn13: "12345678"
}

const testMangaData2 = {
    series_id: "series_id1",
    author_ids: ["author_id1", "author_id2"],
    volume: 1,
    isbn10: "123456",
    isbn13: "12345678"
}

const testMangaData3 = {
    series_id: "series_id1",
    author_ids: ["author_id1", "author_id2"],
    volume: 1,
    isbn13: "12345678"
}

const testMangaData4 = {
    series_id: "series_id1",
    author_ids: ["author_id1", "author_id2"],
    volume: 1,
}

const testMangaData5 = {
    series_id: "series_id1",
    author_ids: ["author_id1", "author_id2"],
    volume: 1,
    isbn13: "87654321"
}

const testMangaData6 = {
    series_id: "series_id1",
    author_ids: ["author_id2", "author_id1"],
    volume: 1,
    isbn13: "12345678"
}

test('mangaHelpers.js -- addManga()', async () => {
    const result1 = await addManga(testMangaData1)
    const result2 = await addManga(testMangaData1)
    const result3 = await addManga(testMangaData4)

    expect(result1).not.toBeFalsy()
    expect(result2).toBeFalsy()
    expect(result3).toBeFalsy()

    const test_manga_id = await mangaExists(testMangaData1)

    expect(test_manga_id).not.toBeFalsy()

    await deleteData(`manga/${test_manga_id}`)
})

// test('mangaHelpers.js -- mangaExists()', async () => {
//     const result1 = await mangaExists("One")
//     // const result2 = await authorExists("Eiichiro Oda")
//     // const result3 = await authorExists("Eiichiro, Oda")
//     // const result4 = await authorExists("Eliska Martinez")
//     // const result5 = await authorExists("Christ, Jesus")
  
//     // expect(result1).toBe("667e05b9ef0f3228d39888ce")
//     // expect(result2).toBe("667e05b9ef0f3228d39888ce")
//     // expect(result3).toBeFalsy()
//     // expect(result4).toBeFalsy()
//     // expect(result5).toBe("667f27c9f8b0c1f741d90eeb")
// })

test('mangaHelpers.js -- isMangaEqual()', () => {
    const result1 = isMangaEqual(testMangaData1, testMangaData1)
    const result2 = isMangaEqual(testMangaData2, testMangaData1)
    const result3 = isMangaEqual(testMangaData3, testMangaData1)
    const result4 = isMangaEqual(testMangaData4, testMangaData1)
    const result5 = isMangaEqual(testMangaData5, testMangaData1)
    const result6 = isMangaEqual(testMangaData6, testMangaData1)

    expect(result1).toBeTruthy()
    expect(result2).toBeTruthy()
    expect(result3).toBeTruthy()
    expect(result4).toBeFalsy()
    expect(result5).toBeFalsy()
    expect(result6).toBeTruthy()
})