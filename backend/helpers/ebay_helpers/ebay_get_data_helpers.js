import { getEbayToken } from "../../routes/ebay/ebay_token.js";
import axios from "axios";

export async function ebayCall (book_title, volume, market_value) {

    let tkn = await getEbayToken()

    const authors = undefined;

    const search_query = createSearchQuery(book_title, volume, market_value, authors)
    
    let response = await axios({
        method: 'get',
        url: 'https://api.ebay.com/buy/browse/v1/item_summary/' + search_query,
        headers: {
            'Authorization': tkn
        }
    })
    
    return response.data
}

export function createSearchQuery(book_title, volume, market_value, authorsArr) {

    const vol = " vol " + volume;
    const authors = ""; 
    const mv_price = "&filter=price:[0.. " + market_value + "],priceCurrency:USD"
    const categoryId = "&aspect_filter=categoryId:[259109|267|63|33346|261186]&filter=excludeCategoryIds:{183454|2536|617|11232|1105|184644|176984|11233}"
    const location = "&filter=itemLocationCountry:US"

    const search_query = "search?q=" + book_title + vol + " " + authors + mv_price + "&limit=50" + categoryId + location;

    return search_query;
}