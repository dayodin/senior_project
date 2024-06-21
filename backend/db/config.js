import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const uri =
    "mongodb+srv://kdinsmor:y1hAkKj4hiS533wp@cluster0.py2jaxw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

let conn;

try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("sample_training");

export default db;