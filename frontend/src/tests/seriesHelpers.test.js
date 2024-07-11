import { expect, test } from '@jest/globals';
import { seriesExists, addSeries } from '../helpers/seriesHelpers';
import { deleteData } from '../helpers/apiHelpers';


test('seriesHelper.js -- seriesExist()', async () => {
    const result1 = await seriesExists("One Piece")
    const result2 = await seriesExists("Elfen Leid")
  
    expect(result1).toBe("668e3a9bab73adebac9ba9ce")
    expect(result2).toBeFalsy()
})

test('authorHelpers.js -- addSeries()', async () => {
    const test_series = "Test Series"
    const test_author_id1 = "Test Author1"
    const test_author_id2 = "Test Author2"

    const result1 = await addSeries("One Piece", "fake_id")
    const result2 = await addSeries(test_series, [test_author_id1, test_author_id2])
    const result3 = await addSeries(test_series, [test_author_id1, test_author_id2])

    expect(result1).toBeFalsy()
    expect(result2).not.toBeFalsy()
    expect(result3).toBeFalsy()

    const test_series_id = await seriesExists(test_series)

    expect(test_series_id).not.toBeFalsy()

    await deleteData(`series/${test_series_id}`)
})