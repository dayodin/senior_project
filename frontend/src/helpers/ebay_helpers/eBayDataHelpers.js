import { baseUrl } from '../../config';
import { getData } from '../apiHelpers';

export async function getEBayData () {

    let manga = await getData("manga");

    let hits = await Promise.all(manga.map(async (book) => {
        
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
            
            let filtered = findDeals(response.itemSummaries, book_title, volume, price);

            return filtered;
        } catch (error) {
            console.log(error);
        }
    }))

    hits = hits.filter(hit => hit !== undefined)

    return hits
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
                profit: (price - total).toFixed(2),
                total: total,
                price: hit.price.value,
                shipping: shipping,   
                url: hit.itemWebUrl,
                item: hit,
                market_value: price
            }
        })
        
        results = results.filter(hit => hit.profit > 5 && 
            !hit.item.title.toLowerCase().includes('in japanese') && 
            hit.item.title.includes(volume) &&
            hit.item.condition !== "Acceptable").sort(compareTotals)
    }

    if (results !== undefined && results[0] !== undefined) return results;
}

function compareTotals(a, b) {
    return a.total - b.total;
}