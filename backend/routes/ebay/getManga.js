import express from "express";
import axios from "axios";
import { createSearchQuery } from "../../helpers/getMangaHelpers.js";
import { getEbayToken } from "../../helpers/eBayTokenHelpers.js";

const router = express.Router();

router.post("/", async (req, res) => {

  let tkn = await getEbayToken()

  const book_title = req.body.book_title;
  const volume = req.body.volume;
  const authors = req.body.authors;
  const price = req.body.price;

  const search_query = createSearchQuery(book_title, volume, price, authors)
  
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

  let tkn = await getEbayToken()

  console.log(tkn)

  axios({
    method: 'get',
    url: 'https://api.ebay.com/buy/browse/v1/item_summary/search?q=manga&filter=price:[0..15],priceCurrency:USD&limit=20&aspect_filter=categoryId:[259109|267|63|33346]&filter=excludeCategoryIds:{15032|31387}',
    headers: {
      'Authorization': tkn,
    }
  })
  .then(function (response) { 
    res.send(response.data)
  });
});

export default router;