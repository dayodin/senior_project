import { baseUrl } from '../../config';
import { getData } from '../apiHelpers';

export async function getEBayData (book) {

    let volume = book.volume;
    let market_value = book.market_value;
    let book_title = book.title;

    let series = await getData(`series/${book.series_id}`)

    let author_names = book.authors.map((auth) => auth);

    try {
        let response = await fetch(`${baseUrl}/getManga`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                book_title, volume, market_value
            }),
        })
        
        response = await response.json();

        response.title = book_title
        response.authors = author_names
        response.volume = volume
        response.market_value = market_value
        
        let filtered = findDeals(response.itemSummaries, book_title, volume, market_value, series.name);

        return filtered;
    } catch (error) {
        console.log(error);
    }
}

export function findDeals(results, book_title, volume, market_value, series) {

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
                title: book_title,
                volume: volume,
                profit: (market_value - total).toFixed(2),
                total: total,
                price: hit.price.value,
                shipping: shipping,   
                url: hit.itemWebUrl,
                item: hit,
                market_value: market_value
            }
        })
        
        results = results.filter(hit => 
            hitsFilter(hit.profit, hit.item.title, book_title, volume, hit.item.condition, series)
        ).sort(compareTotals)
    }

    if (results !== undefined && results[0] !== undefined) return results;
}

function hitsFilter (profit, hit_title, book_title, volume, condition, series) {

    if (
        profit > 5 && 
        !hit_title.toLowerCase().includes('in japanese') && 
        !hit_title.toLowerCase().includes('japanese edition') && 
        !hit_title.toLowerCase().includes('japanese version') && 
        !hit_title.toLowerCase().includes('japanese language') && 
        !hit_title.toLowerCase().includes("figure") &&
        hit_title.toLowerCase().includes(series.toLowerCase()) &&
        hit_title.includes(volume) &&
        condition !== "Acceptable" &&
        (
            hit_title.includes(` ${volume} `)  || 
            hit_title.includes(` ${volume}:`)  || 
            hit_title.endsWith(` ${volume}`)   || 
            hit_title.includes(` ${volume}-`)  || 
            hit_title.includes(`-${volume}-`)  || 
            hit_title.includes(`-${volume} `)  || 
            hit_title.endsWith(`-${volume}`)   ||
            hit_title.includes( `(${volume})`)
    )) return true
}

function compareTotals(a, b) {
    return a.total - b.total;
}