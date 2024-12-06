import { baseUrl } from '../config';
import { getData } from './apiHelpers';

export async function getEBayData () {

    let manga = await getData("manga");

    console.log(manga)

    return await Promise.all(manga.map(async (book) => {
        let volume = book.volume;
        let price = book.price;
        let series_name = book.title;
        let author_names = book.authors.map((auth) => auth);

        try {
            let response = await fetch(`${baseUrl}/getManga`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    series_name, volume, price
                }),
            })
            
            response = await response.json();

            response.name = series_name
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
    // const item = mangaHits["2"];
    // findDeals(item.itemSummaries, item.name, item.volue, item.price);
    // mangaHits.forEach(item => findDeals(item.itemSummaries, item.name, item.volue, item.price))

}

export function findDeals(results, series_name, volume, price) {
    
    console.log("++++++++++++++++++++++++++");
    console.log("Series: " + series_name)
    console.log("Volume: " + volume);
    console.log("Price: " + price);
    console.log(results);
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
                series: series_name,
                volume: volume,
                total: total,
                price: hit.price.value,
                shipping: shipping,   
                url: hit.itemWebUrl,
                item: hit
            }
        })
        results = results.filter(hit => hit.total - price < 0 && 
            !hit.item.title.toLowerCase().includes('in japanese') && 
            hit.item.title.includes(volume) &&
            hit.item.condition !== "Acceptable").sort(compareTotals)
        console.log(results);
        console.log("\n\n")
    }
}

function compareTotals(a, b) {
    return a.total - b.total;
}