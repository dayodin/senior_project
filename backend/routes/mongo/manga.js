import express from "express";
import db from "../../db/mongoConfig.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("manga");
  let results = await collection.find({})
    .limit(50)
    .toArray();

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

router.delete("/:id", async (req, res) => {
  var oid = new ObjectId(req.params.id)
  const query = { _id: oid };

  const collection = db.collection("manga");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;