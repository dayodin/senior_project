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

router.get("/series/:id", async (req, res) => {
  const query = { series_id: req.params.id };

  const collection = db.collection("manga");
  let results = await collection.find(query).toArray();

  res.send(results).status(200);
});

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