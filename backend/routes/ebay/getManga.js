import express from "express";
import axios from "axios";
import token from "./getEbayToken.js";

const router = express.Router();

const tkn = "bearer " + token

router.post("/", async (req, res) => {
  const search = "search?q=";
  const title = req.body.series_name.replace(" ", "_");
  const volume = "_vol_" + req.body.volume;
  const author = req.body.author_name.replace(" ", "_");

  let search_query = search + title + volume + "_" + author + "&limit=20";

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
    url: 'https://api.ebay.com/buy/browse/v1/item_summary/search?q=manga&limit=20',
    headers: {
      'Authorization': tkn
    }
  })
    .then(function (response) {
      // console.log(response.data) 
      res.send(response.data)
    });
});

export default router;