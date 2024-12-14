import db from "../../db/mongo_config.js";
import { ObjectId } from "mongodb";

export async function getEbayToken() {

    let collection = db.collection("token");
    let result = await collection.find({}).toArray();

    result = result[0].access_token

    return "bearer " +  result;
}

export async function setEbayToken(token) {

    var oid = new ObjectId("674a319970f23124e4cb414a")
    const query = { _id: oid };

    const updates = {
        $set: { 
            access_token: token,
        }
    };

    let collection = db.collection("token");
    await collection.updateOne(query, updates);
}

export async function getTokenTimestamp() {

    let collection = db.collection("token");
    let result = await collection.find({}).toArray();

    result = result[0].ts;

    return result;
}

export async function setTokenTimestamp() {

    var oid = new ObjectId("674a319970f23124e4cb414a")
    const query = { _id: oid };
    const timestamp = Date.now();

    const updates = {
        $set: { 
            ts: timestamp,
        }
    };

    let collection = db.collection("token");
    let result = await collection.updateOne(query, updates);

    return result;
}