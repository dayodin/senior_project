import express from "express";
import axios from "axios";
import { createSearchQuery } from "../../helpers/getMangaHelpers.js";
import token from "./getEbayToken.js";
// import token from "./getEbayToken.js";

const router = express.Router();

// let token = await getEBayToken()

const tkn = "bearer " + token

router.post("/", async (req, res) => {
  const series_name = req.body.series_name;
  const volume = req.body.volume;
  const authors = req.body.authors;
  const price = req.body.price;

  const search_query = createSearchQuery(series_name, volume, price, authors)
  // const search = "search?q=";
  // const title = req.body.series_name;
  // const volume = " vol " + req.body.volume;
  // const author = "";
  // // const author = req.body.author_name;
  // const price = "&filter=price:[0.. " + req.body.price + "],priceCurrency:USD"
  // const categoryId = "&aspect_filter=categoryId:[259109|267|63|33346|261186]&filter=excludeCategoryIds:{183454|2536|617|11232|1105|184644|176984|11233}"
  // const location = "&filter=itemLocationCountry:US"

  // // "&filter=price:[.." + req.body.price + "]
  // let search_query = search + title + volume + " " + author + price + "&limit=25" + categoryId + location;
  // console.log(search_query)
  axios({
    method: 'get',
    url: 'https://api.ebay.com/buy/browse/v1/item_summary/' + search_query,
    headers: {
      'Authorization': tkn
    }
  })
    .then(function (response) {
      res.send(response.data)
    });
});

router.get("/", async (req, res) => {
  // console.log(req.body);
  axios({
    method: 'get',
    url: 'https://api.ebay.com/buy/browse/v1/item_summary/search?q=manga&filter=price:[0..15],priceCurrency:USD&limit=20&aspect_filter=categoryId:[259109|267|63|33346]&filter=excludeCategoryIds:{15032|31387}',
    headers: {
      'Authorization': tkn,
    }
  })
    .then(function (response) {
      // console.log(response.data) 
      res.send(response.data)
    });
});

export default router;