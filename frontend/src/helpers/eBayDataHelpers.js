import { baseUrl } from '../config';
import { getData } from './apiHelpers';

export async function getEBayData () {
    const manga = await getData("manga")

    const responseArr = [];

    manga.forEach(async (book) => {
        const series_id = book.series_id;
        const author_id = book.author_id;

        let volume = book.volume;
        let price = book.price;
        let series_name = book.title;
        // let series_name = series.find((ser) => ser._id === series_id).name;
        console.log(series_name)
        // let author_name = authors.find((auth) => auth._id === author_id);
        // author_name = author_name.first + " " + author_name.last;

        try {
            let response = await fetch(`${baseUrl}/getManga`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    series_name, volume, price
                    // series_name, author_name, volume, price
                }),
            })
            response = await response.json();
            console.log(response)
            responseArr.push(response)
            // console.log(response);
            // await findDeals(response.itemSummaries, book, series_name);
        } catch (error) {
            console.log(error);
        }
    }); 

    return responseArr;
}

export function filterEbayData (responseArr) {
    console.log(responseArr);
    responseArr.map(item => console.log(item))
    return
}