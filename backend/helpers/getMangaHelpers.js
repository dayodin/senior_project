import { getEbayToken } from "./eBayTokenHelpers.js";
import axios from "axios";

export async function ebayCall (book_title, volume, price) {

    let tkn = await getEbayToken()

    // const book_title = book_title;
    // const volume = volume;
    const authors = undefined;
    // const price = price;

    const search_query = createSearchQuery(book_title, volume, price, authors)
    
    let response = await axios({
        method: 'get',
        url: 'https://api.ebay.com/buy/browse/v1/item_summary/' + search_query,
        headers: {
            'Authorization': tkn
        }
    })
    
    return response.data
}


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