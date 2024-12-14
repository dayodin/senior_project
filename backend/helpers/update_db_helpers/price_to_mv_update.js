import db from "../../db/mongo_config.js";
import { ObjectId } from "mongodb";


export async function updatePriceToMarketValue () {

    let collection = await db.collection("manga").updateMany(
        { "price": { $ne: null } },
        { $rename: { "price": "market_value" } });
    // // let results = await collection.find({}).toArray();

    // // results.forEach(item => theUpdate(item))
    
}