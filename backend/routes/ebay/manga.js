import express from "express";
import token from "./getEbayToken";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("authors");
  let results = await collection.find({})
    .limit(50)
    .toArray();

  res.send(results).status(200);
});

export default router;