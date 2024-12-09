import db from "../../db/mongo_config.js";
import { ebayCall } from "./ebay_get_data_helpers.js";
import { sendEmail } from "../../routes/email/email.js";

const TIMEOUT = 10 * 1000;
// const TIMEOUT = 2 * 60 * 60 * 1000;

export async function setUpDeals () {
    await deals();
    // setInterval(deals, TIMEOUT)
}

async function deals () {

    const hits = await getEBayData();
    
    let allResults = [];        

    for (let i = 0; i < hits.length; i++) allResults.push(...hits[i]);

    allResults.sort((a, b) => b.profit - a.profit)

    console.log(allResults.length)

    // let book = allResults[0];

    // await sendEmail(book);
}

async function getEBayData () {

    let collection = db.collection("manga");
    
    let manga = await collection.find({}).toArray()

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

function findDeals(results, book_title, volume, price) {

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