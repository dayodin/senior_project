import express from "express";
import db from "../../db/mongoConfig.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 authors
router.get("/", async (req, res) => {
  let collection = await db.collection("authors");
  let results = await collection.find({})
    .limit(50)
    .toArray();

  res.send(results).status(200);
});

// Fetches the latest authors
// router.get("/latest", async (req, res) => {
//   let collection = await db.collection("authors");
//   let results = await collection.aggregate([
//     {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
//     {"$sort": {"date": -1}},
//     {"$limit": 3}
//   ]).toArray();
//   res.send(results).status(200);
// });

// Get a single post
router.get("/:id", async (req, res) => {
  var oid = new ObjectId(req.params.id)
  const query = { _id: oid };

  const collection = db.collection("authors");
  let results = await collection.findOne(query);

  console.log(results)

  res.send(results).status(200);
});

// router.get("/?name", async (req, res) => {
//   var oid = new ObjectId(req.params.id)
//   const query = { _id: oid };

//   const collection = db.collection("authors");
//   let results = await collection.findOne(query);

//   console.log(results)

//   res.send(results).status(200);
// });

// Add a new document to the collection
router.post("/", async (req, res) => { 
  let collection = db.collection("authors");
  let newDocument = req.body;
//   newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Update the post with a new comment
// router.patch("/comment/:id", async (req, res) => {
//   const query = { _id: ObjectId(req.params.id) };
//   const updates = {
//     $push: { comments: req.body }
//   };

//   let collection = await db.collection("authors");
//   let result = await collection.updateOne(query, updates);

//   res.send(result).status(200);
// });

// Delete an entry
router.delete("/:id", async (req, res) => {
  var oid = new ObjectId(req.params.id)
  const query = { _id: oid };

  const collection = db.collection("authors");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
