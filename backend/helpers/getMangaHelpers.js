import EbayAuthToken from 'ebay-oauth-nodejs-client';

// export async function getEBayToken() {

//     const ebayAuthToken = new EbayAuthToken({
//         clientId: 'KarstenD-mb-PRD-a6e6e405f-7235f523',
//         clientSecret: 'PRD-6e6e405fb6e9-85c1-4788-8f4e-a5ea',
//         redirectUri: 'Karsten_Dinsmor-KarstenD-mb-PRD-dqvpnq'
//     });

//     let token = await ebayAuthToken.getApplicationToken('PRODUCTION');

//     console.log(token);
//     return token.split(":")[1].split(",")[0];
// }

export function createSearchQuery(book_title, volume, volume_price, authorsArr) {
    // const title = series_name;
    const vol = " vol " + volume;
    const authors = ""; 
    const price = "&filter=price:[0.. " + volume_price + "],priceCurrency:USD"
    const categoryId = "&aspect_filter=categoryId:[259109|267|63|33346|261186]&filter=excludeCategoryIds:{183454|2536|617|11232|1105|184644|176984|11233}"
    const location = "&filter=itemLocationCountry:US"

    const search_query = "search?q=" + book_title + vol + " " + authors + price + "&limit=25" + categoryId + location;

    return search_query;
}

