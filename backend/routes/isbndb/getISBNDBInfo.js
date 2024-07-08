import express from "express";
import axios from "axios";
import instance from "./isbndb_config.js";

const router = express.Router();

router.get("/", async (req, res) => {
    // console.log("hi")
    // const series = req.body.series.replace(" ", "%20")
    // const author = req.body.author.replace(" ", "%20")
    // const query = `search/books?pageSize=200&author=${author}&text=${series}`
    // console.log(query);
    await instance.get(
        'search/books?pageSize=200&author=hiroya%20oku&text=gantz',
    ).then(function (response) {
        res.send(response.data)
    })
    .catch(function (error) {
        console.log(error);
    });
})

router.post("/", async (req, res) => {
    console.log(req.body)
    const series = req.body.series === "" ? "" : req.body.series.replace(" ", "%20")
    const author = req.body.author === "" ? "" : `&author=${req.body.author.replace(" ", "%20")}`
    const volume = req.body.volume === "" ? "" : `vol%20${req.body.volume}`
    const publisher = req.body.publisher === "" ? "" : `&publisher=${req.body.publisher}`
    const query = `search/books?pageSize=1000${author}&text=${series}%20${volume}${publisher}`
    // const query = `search/books?pageSize=400&author=${author}&text=${series}%20volume%203&publisher=viz`
    console.log(query);
    await instance.get(
    // '/books/gantz?page=1&pageSize=20&column=title',
    // 'search/books?pageSize=200&author=hiroya%20oku&text=gantz',
    // `search/books?pageSize=200&author=${author}&text=${series}`,
    query
  

    // 'query=gantz',
    // 'isbns=0452284236,2266154117,2842281500',
    ).then(function (response) {
        res.send(response.data)
    })
    .catch(function (error) {
        console.log(error);
    });
    // console.log(req.body);
    // axios({
    //   method: 'get',
    //   url: 'https://api.ebay.com/buy/browse/v1/item_summary/search?q=manga&filter=price:[0..15],priceCurrency:USD&limit=20&aspect_filter=categoryId:[259109|267|63|33346]&filter=excludeCategoryIds:{15032|31387}',
    //   headers: {
    //     'Authorization': tkn,
    //   }
    // })
    //   .then(function (response) {
    //     // console.log(response.data) 
    //     res.send(response.data)
    //   });
  });


export default router;