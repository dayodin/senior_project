import express from "express";
import axios from "axios";
import token from "./getEbayToken.js";

const router = express.Router();

const tkn = "bearer " + token

router.get("/", async (req, res) => {
  let response = await axios({
    method: 'get',
    url: 'https://api.ebay.com/buy/browse/v1/item_summary/search?q=manga&limit=20',
    headers: {
      'Authorization': tkn
    }
  })
    .then(function (response) {
      console.log(response.data) 
      res.send(response.data)
    });
});

export default router;