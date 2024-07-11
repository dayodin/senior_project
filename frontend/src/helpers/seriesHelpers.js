import { getData, postData } from "./apiHelpers";

export async function addSeries (name, author_ids) {

    if (await seriesExists(name)) return false

    const body = { 
        name: name, 
        author_ids: author_ids 
    }

    const series_id = await postData('series', body);

    return series_id.insertedId;
}

// Checks if a series exists within MangaDB
export async function seriesExists (series) {
    const seriesData = await getData("series")

    let filteredSeriesData = seriesData.filter(item => item.name === series);

    return filteredSeriesData[0] !== undefined ? filteredSeriesData[0]._id : false; 
}