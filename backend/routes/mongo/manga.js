import express from "express";
import db from "../../db/mongoConfig.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("manga");
  let results = await collection.find({})
    .limit(50)
    .toArray();

  res.send(results).status(200);
});

router.post("/", async (req, res) => {
  let collection = db.collection("manga");
  let newDocument = req.body;
  //   newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

export default router;