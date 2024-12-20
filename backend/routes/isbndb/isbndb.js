import express from "express";
import instance from "../../db/isbndb_config.js";

const router = express.Router();

// test get
router.get("/", async (req, res) => {

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

    const series = req.body.series === "" ? "" : req.body.series.replaceAll(" ", "%20")
    const author = req.body.author === "" ? "" : `&author=${req.body.author.replaceAll(" ", "%20")}`
    const volume = req.body.volume === "" ? "" : `vol%20${req.body.volume}`
    const publisher = req.body.publisher === "" ? "" : `&publisher=${req.body.publisher.replaceAll(" ", "%20")}`
    const query = `search/books?pageSize=1000${author}&text=${series}%20${volume}${publisher}&language=english&shouldMatchAll=1`

    // console.log(query);

    await instance.get(
        query
    )
    .then(function (response) {
        res.send(response.data)
    })
    .catch(function (error) {
        console.log(error);
    });
});


export default router;