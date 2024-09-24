import EbayAuthToken from 'ebay-oauth-nodejs-client';

const ebayAuthToken = new EbayAuthToken({
    clientId: 'KarstenD-mb2-PRD-f941052cf-9b3bb774',
    clientSecret: 'PRD-941052cf5d08-257d-412f-b98b-e2d3',
    redirectUri: 'Karsten_Dinsmor-KarstenD-mb2-PR-mqcjymk'
});

let token = await ebayAuthToken.getApplicationToken('PRODUCTION');
token = token.split(":")[1].split(",")[0];

// console.log(token)

export default token;

