import db from "../db/mongoConfig.js";
import { ObjectId } from "mongodb";
import EbayAuthToken from 'ebay-oauth-nodejs-client';

// Generates a new access_token
export async function newEbayAuthToken() {
    const ebayAuthToken = new EbayAuthToken({
        clientId: process.env.EBAY_CLIENTID,
        clientSecret: process.env.EBAY_CLIENTSECRET,
        redirectUri: process.env.EBAY_REDIRECTURL
    }); 

    let token = await ebayAuthToken.getApplicationToken('PRODUCTION');

    token = token.split(":")[1].split(",")[0];
    token = token.match(/"(.*?)"/)[1]

    await setTokenTimestamp();
    await setEbayToken(token);
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

export async function getTokenTimestamp() {
    let collection = db.collection("token");
    let result = await collection.find({}).toArray();

    result = result[0].ts;

    return result;
}

export async function getTokenTSDiff() {
    let token_ts = await getTokenTimestamp();
    let now = Date.now();

    return now - token_ts;
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

export async function getEbayToken() {
    let collection = db.collection("token");
    let result = await collection.find({}).toArray();

    result = result[0].access_token

    return "bearer " +  result;
}