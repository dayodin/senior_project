import express from "express";
import db from "../../db/mongoConfig.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("series");
    let results = await collection.find({})
        .limit(50)
        .toArray();

    res.send(results).status(200);
});

router.post("/", async (req, res) => {
    let collection = db.collection("series");
    console.log(req.body);
    let newDocument = req.body;
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

router.delete("/:id", async (req, res) => {
    var oid = new ObjectId(req.params.id)
    const query = { _id: oid };
  
    const collection = db.collection("series");
    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
  });

export default router;