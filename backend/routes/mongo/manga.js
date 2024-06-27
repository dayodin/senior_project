import express from "express";
import db from "../../db/mongoConfig.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("manga");
  let results = await collection.find({})
    .limit(50)
    .toArray();
  
  let seriesId = results.series_id;
  // let result = await results.find(ObjectId(seriesId));
  // console.log(result);
  // console.log(await findSeriesById(seriesId));
  // console.log(results);
  // results = results.forEach((book) => {
  //   let author_id = book[author_id];
  //   let series_id = book[series_id];
  //   console.log(author_id)
  //   book[author_id] = findAuthorById(author_id);
  //   book[series_id] = findSeriesById(series_id);
  // })
  // collection = await collection.forEach((book) => {
  //   let author_id = book[author_id];
  //   let series_id = book[series_id];
  //   console.log(author_id)
  //   book[author_id] = findAuthorById(author_id);
  //   book[series_id] = findSeriesById(series_id);
  // })
  // let results = await collection.find({})
  //   .limit(50)
  //   .toArray();

  res.send(results).status(200);
});

function findAuthorById(id) {
  let users = db.collection("users").find({}).toArray();
  return users.filter( (user) => user['_id'] === id);
}

const findSeriesById = async (id) => {
  console.log(id);
  let series = await db.collection("series").find(ObjectId(id)).toArray();
  // series = series.find((series) => series['_id'] === id)
  console.log(series);
  return series.filter( (series) => series['_id'] === id);
}

router.post("/", async (req, res) => {
  let collection = db.collection("manga");
  let newDocument = req.body;
  //   newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

export default router;