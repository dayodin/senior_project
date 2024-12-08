import db from "../../db/mongoConfig.js";
import { ebayCall } from "../../helpers/getMangaHelpers.js";
import { sendEmail } from "../../helpers/emailHelpers.js";
import { all } from "axios";

const TIMEOUT = 10 * 1000;
// const TIMEOUT = 2 * 60 * 60 * 1000;

export async function setUpDeals () {
    await deals();
    // setInterval(deals, TIMEOUT)
}

export async function deals () {
    const hits = await getEBayData();

    let allResults = [];        

    for (let i = 0; i < hits.length; i++) allResults.push(...hits[i]);

    allResults.sort((a, b) => b.profit - a.profit)

    console.log(allResults.length)

    let book1 = allResults[0];

    let template_params = {
        title : book1.title,
        price : book1.total,
        message : "PROFIT: $" + book1.profit
    }

    await sendEmail(template_params);
}

export async function getEBayData () {

    let collection = db.collection("manga");
    
    let manga = await collection.find({}).toArray()

    // console.log(manga)

    let hits = await Promise.all(manga.map(async (book) => {
        let volume = book.volume;
        let price = book.price;
        let book_title = book.title;

        let author_names = book.authors.map((auth) => auth);

        try {
            let response = await ebayCall(book_title, volume, price)

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

    hits = hits.filter(hit => {if (hit !== undefined) return hit})

    return hits
}

export function findDeals(results, book_title, volume, price) {

    // console.log(results)

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