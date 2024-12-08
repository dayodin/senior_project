import { baseUrl } from '../config';
import { getData } from './apiHelpers';

export async function getEBayData () {

    let manga = await getData("manga");

    return await Promise.all(manga.map(async (book) => {
        let volume = book.volume;
        let price = book.price;
        let book_title = book.title;

        let author_names = book.authors.map((auth) => auth);

        try {
            let response = await fetch(`${baseUrl}/getManga`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    book_title, volume, price
                }),
            })
            
            response = await response.json();

            response.title = book_title
            response.authors = author_names
            response.volume = volume
            response.price = price
 
            return response;
        } catch (error) {
            console.log(error);
        }
    }))
}





export async function filterEbayData (mangaHits) {
    console.log(mangaHits);
    // console.log(mangaHits[0].value)
    mangaHits.forEach(item => console.log(item.value))

}

export function findDeals(results, book_title, volume, price) {

    if (results !== undefined){
        results = results.map(hit => {
            let shipping = 6;
            if (hit.shippingOptions !== undefined) {
                if (hit.shippingOptions[0].shippingCostType === "FIXED"){
                    shipping = parseFloat(hit.shippingOptions[0].shippingCost.value);
                } 
            }
            const total = (parseFloat(shipping) + parseFloat(hit.price.value)).toFixed(2)
            return {
                // series: 
                title: book_title,
                volume: volume,
                total: total,
                price: hit.price.value,
                shipping: shipping,   
                url: hit.itemWebUrl,
                item: hit,
                market_value: price
            }
        })
        
        results = results.filter(hit => hit.total - price < 0 && 
            !hit.item.title.toLowerCase().includes('in japanese') && 
            hit.item.title.includes(volume) &&
            hit.item.condition !== "Acceptable").sort(compareTotals)
    }

    return results;
}

function compareTotals(a, b) {
    return a.total - b.total;
}