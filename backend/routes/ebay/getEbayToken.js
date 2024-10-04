import EbayAuthToken from 'ebay-oauth-nodejs-client';

// Generates a new access_token
export async function NewEbayAuthToken() {
    const ebayAuthToken = new EbayAuthToken({
        clientId: process.env.EBAY_CLIENTID,
        clientSecret: process.env.EBAY_CLIENTSECRET,
        redirectUri: process.env.EBAY_REDIRECTURL
    });

    let token = await ebayAuthToken.getApplicationToken('PRODUCTION');
    token = token.split(":")[1].split(",")[0];

    return token;
}
// console.log(token)

// export default token;

