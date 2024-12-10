import { getData, postData } from "../apiHelpers";

export async function addManga (manga) {

    if (!manga.isbn && !manga.isbn10 && !manga.isbn13) return false

    if (await mangaExists(manga)) return false

    const manga_id = await postData('manga', manga);

    return manga_id.insertedId;
}

export async function mangaExists (manga) {

    const mangaData = await getData("manga")

    const filteredMangaData = mangaData.filter(item => isMangaEqual(manga, item))

    return filteredMangaData[0] !== undefined ? filteredMangaData[0]._id : false; 
}

export async function getOrAddManga (manga, series_id, author_ids, volume, market_value) {
    
    let updated_manga = {...manga, series_id: series_id, author_ids: author_ids, volume: volume, market_value: market_value}

    let manga_id = await mangaExists(updated_manga)

    return manga_id ? manga_id : await addManga(updated_manga);
}

export function isMangaEqual (givenData, itemData) {
    
    if (
        !givenData              || !itemData            || !givenData.volume || 
        !itemData.volume        || !givenData.series_id || !itemData.series_id || 
        !givenData.author_ids   || !itemData.author_ids
       ) return false

    const volumesEqual = itemData.volume === givenData.volume
    const series_idEqual = itemData.series_id === givenData.series_id
    const author_idsEqual = arraysEqual(itemData.author_ids.sort(), givenData.author_ids.sort())
    const basicDataEqual = volumesEqual && series_idEqual && author_idsEqual

    if (!basicDataEqual) return false

    const isbnsExist = givenData.isbn && itemData.isbn
    const isbn10sExist = givenData.isbn10 && itemData.isbn10
    const isbn13sExist = givenData.isbn13 && itemData.isbn13

    if (isbnsExist) { 
        return givenData.isbn === itemData.isbn
    } else if (isbn10sExist) {
        return givenData.isbn10 === itemData.isbn10
    } else if (isbn13sExist) {
        return givenData.isbn13 === itemData.isbn13
    }

    return false
}

function arraysEqual (a, b) {

    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }