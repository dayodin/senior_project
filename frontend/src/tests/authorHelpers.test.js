import { expect, test } from '@jest/globals';
import { authorExists, splitName, addAuthor, isAuthorEqual } from "../helpers/authorHelpers"
import { deleteData } from '../helpers/apiHelpers';

test('authorHelpers.js -- authorExists()', async () => {
    const result1 = await authorExists("Oda, Eiichiro")
    const result2 = await authorExists("Eiichiro Oda")
    const result3 = await authorExists("Eiichiro, Oda")
    const result4 = await authorExists("Eliska Martinez")
    const result5 = await authorExists("Christ, Jesus")
  
    expect(result1).toBe("667e05b9ef0f3228d39888ce")
    expect(result2).toBe("667e05b9ef0f3228d39888ce")
    expect(result3).toBeFalsy()
    expect(result4).toBeFalsy()
    expect(result5).toBe("667f27c9f8b0c1f741d90eeb")
})

test('authorHelpers.js -- splitName()', async () => {
    const result1 = splitName("Oda, Eiichiro")
    const result2 = splitName("Eiichiro Oda")
    const result3 = splitName("One")
    const result4 = splitName("George W. Bush")
    const result5 = splitName("One Two Three")

    expect(result1).toEqual(["Eiichiro", "Oda"])
    expect(result2).toEqual(["Eiichiro", "Oda"])
    expect(result3).toEqual(["One"])
    expect(result4).toEqual(["George W.", "Bush"])
    expect(result5).toEqual(["One", "Two", "Three"])
})

test('authorHelpers.js -- addAuthor()', async () => {
    const test_name = "Test Author2"

    const result1 = await addAuthor("Oda, Eiichiro")
    const result2 = await addAuthor("Eiichiro Oda")
    const result3 = await addAuthor(test_name)
    const result4 = await addAuthor(test_name)

    expect(result1).toBeFalsy()
    expect(result2).toBeFalsy()
    expect(result3).not.toBeFalsy()
    expect(result4).toBeFalsy()

    const test_author_id = await authorExists(test_name)

    expect(test_author_id).not.toBeFalsy()

    await deleteData(`authors/${test_author_id}`)
})

test('authorHelpers.js -- isAuthorEqual()', async () => {
    const result1 = isAuthorEqual("Oda, Eiichiro", "Oda, Eiichiro")
    const result2 = isAuthorEqual("Eiichiro, Oda", "Eiichiro Oda")
    const result3 = isAuthorEqual("Oda, Eiichiro", "Eiichiro Oda")
    const result4 = isAuthorEqual("One", "One")
    const result5 = isAuthorEqual("One Two Three", "One Two Three")
    const result6 = isAuthorEqual("One Two", "One Two Three")
    const result7 = isAuthorEqual("George W. Bush", "Bush, George W.")

    expect(result1).toBeTruthy()
    expect(result2).toBeFalsy()
    expect(result3).toBeTruthy()
    expect(result4).toBeTruthy()
    expect(result5).toBeTruthy()
    expect(result6).toBeFalsy()
    expect(result7).toBeTruthy()
})