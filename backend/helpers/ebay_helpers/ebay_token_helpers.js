import EbayAuthToken from 'ebay-oauth-nodejs-client';
import { setEbayToken, getTokenTimestamp, setTokenTimestamp } from '../../routes/ebay/ebay_token.js';

const TIMEOUT = 115 * 60 * 1000;

export async function tokenInterval() {
    const token_ts_diff = await getTokenTSDiff();

    console.log(token_ts_diff / 1000);

    if (token_ts_diff > TIMEOUT) {
        await newEbayAuthToken();
        setInterval(async () => await newEbayAuthToken(), TIMEOUT)
    } else {
        setTimeout(tokenInterval, TIMEOUT - token_ts_diff); 
    }
}

// Generates a new access_token
export async function newEbayAuthToken() {
    console.log("hi")

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

export async function getTokenTSDiff() {

    let token_ts = await getTokenTimestamp();
    
    let now = Date.now();

    return now - token_ts;
}