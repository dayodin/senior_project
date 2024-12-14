import db from "../../db/mongo_config.js";
import { ObjectId } from "mongodb";

import { ebayCall } from "./ebay_get_data_helpers.js";
import { sendEmail } from "../../routes/email/email.js";

// const TIMEOUT = 60 * 1000;
const EMAIL_TIMER = 15 * 60 * 1000
// const EMAIL_TIMER = 4 * 60 * 1000

export async function setUpDeals () {
    await deals();
    setInterval(deals, EMAIL_TIMER)
}

async function deals () {

    const hits = await getEBayData();
    
    let allResults = [];        

    for (let i = 0; i < hits.length; i++) allResults.push(...hits[i]);

    allResults.sort((a, b) => b.profit - a.profit)

    // await sendEmail(allResults);
}

async function getEBayData () {

    let collection = db.collection("manga");
    
    let manga = await collection.find({}).toArray()

    let hits = await Promise.all(manga.map(async (book) => {
        let volume = book.volume;
        let market_value = book.market_value;
        let book_title = book.title;


        // var oid = new ObjectId(book.series_id)
        // const query = { _id: oid };
    
        // const collection = db.collection("series");
        // let series = await collection.findOne(query);

        // console.log(series);

        try {
            let response = await ebayCall(book_title, volume, market_value)
            
            let filtered = findDeals(response.itemSummaries, book_title, volume, market_value);

            return filtered;
        } catch (error) {
            console.log(error.response.data);
        }
    }))

    hits = hits.filter(hit => {if (hit !== undefined) return hit})

    return hits
}

function findDeals(results, book_title, volume, market_value, series) {

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
            hit.profit > 5 && 
            !hit.item.title.toLowerCase().includes('in japanese') && 
            !hit.item.title.toLowerCase().includes('japanese edition') && 
            !hit.item.title.toLowerCase().includes('japanese language') && 
            !hit.item.title.toLowerCase().includes('japanese version') && 
            !hit.item.title.toLowerCase().includes("figure") &&
            // hit.item.title.includes(series.name.toLowerCase()) &&
            hit.item.title.includes(volume) &&
            hit.item.condition !== "Acceptable" &&
            (
                hit.item.title.includes(` ${volume} `)  || 
                hit.item.title.includes(` ${volume}:`)  || 
                hit.item.title.endsWith(` ${volume}`)   || 
                hit.item.title.includes(` ${volume}-`)  || 
                hit.item.title.includes(`-${volume}-`)  || 
                hit.item.title.includes(`-${volume} `)  || 
                hit.item.title.endsWith(`-${volume}`)   ||
                hit.item.title.includes( `(${volume})`)
            )).sort(compareTotals)
    }

    if (results !== undefined && results[0] !== undefined) return results;
}

function compareTotals(a, b) {
    return a.total - b.total;
}