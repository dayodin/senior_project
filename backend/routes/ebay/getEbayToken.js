import EbayAuthToken from 'ebay-oauth-nodejs-client';

const ebayAuthToken = new EbayAuthToken({
    clientId: 'KarstenD-mb-PRD-a6e6e405f-7235f523',
    clientSecret: 'PRD-6e6e405fb6e9-85c1-4788-8f4e-a5ea',
    redirectUri: 'Karsten_Dinsmor-KarstenD-mb-PRD-dqvpnq'
});

(async () => {
    const token = await ebayAuthToken.getApplicationToken('PRODUCTION');
    console.log(token);
})();

export default token;

