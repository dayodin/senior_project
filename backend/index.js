import express from "express";
import cors from "cors";
import "./loadEnviornment.js";
import "express-async-errors";
import authors from "./routes/authors.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/authors", authors);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});





// import { MongoClient } from "mongodb";

// async function run() {
//   // TODO:
//   // Replace the placeholder connection string below with your
//   // Altas cluster specifics. Be sure it includes
//   // a valid username and password! Note that in a production environment,
//   // you do not want to store your password in plain-text here.
//   const uri =
//     "mongodb+srv://kdinsmor:y1hAkKj4hiS533wp@cluster0.py2jaxw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//   // The MongoClient is the object that references the  connection to our
//   // datastore (Atlas, for example)
//   const client = new MongoClient(uri);

//   // The connect() method does not attempt a connection; instead it instructs
//   // the driver to connect using the settings provided when a connection
//   // is required.
//   await client.connect();

//   // Provide the name of the database and collection you want to use.
//   // If the database and/or collection do not exist, the driver and Atlas
//   // will create them automatically when you first write data.
//   const dbName = "manga";
//   const collectionName = "books";

//   // Create references to the database and collection in order to run
//   // operations on them.
//   const database = client.db(dbName);
//   const collection = database.collection(collectionName);

//   /*
//    *  *** INSERT DOCUMENTS ***
//    *
//    * You can insert individual documents using collection.insert().
//    * In this example, we're going to create four documents and then
//    * insert them all in one call with collection.insertMany().
//    */

//   const series = [
//     {
//       name: "naruto",
//       author: "kishimoto",
//       volume: [
//         1, 2, 3, 4, 5,
//         70,
//       ], 
//     },
//     {
//       name: "one piece",
//       author: "eiichiro oda",
//       volume: [
//         1, 2, 3, 4, 100,
//       ],
//     },
//     // {
//     //     name: "loco moco",
//     //     ingredients: [
//     //       "ground beef",
//     //       "butter",
//     //       "onion",
//     //       "egg",
//     //       "bread bun",
//     //       "mushrooms",
//     //     ],
//     //     prepTimeInMinutes: 54,
//     //   },
//   ];

//   try {
//     const insertManyResult = await collection.insertMany(series);
//     console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
//   } catch (err) {
//     console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
//   }

//   /*
//    * *** FIND DOCUMENTS ***
//    *
//    * Now that we have data in Atlas, we can read it. To retrieve all of
//    * the data in a collection, we call Find() with an empty filter.
//    * The Builders class is very helpful when building complex
//    * filters, and is used here to show its most basic use.
//    */

// //   const findQuery = { prepTimeInMinutes: { $lt: 45 } };

//   const findQuery = { name: { $lt: "naruto" } }

//   try {
//     const cursor = await collection.find(findQuery).sort({ name: 1 });
//     await cursor.forEach(recipe => {
//       console.log(`${recipe.name} has ${recipe.ingredients.length} ingredients and takes ${recipe.prepTimeInMinutes} minutes to make.`);
//     });
//     // add a linebreak
//     console.log();
//   } catch (err) {
//     console.error(`Something went wrong trying to find the documents: ${err}\n`);
//   }

//   // We can also find a single document. Let's find the first document
//   // that has the string "potato" in the ingredients list.
// //   const findOneQuery = { name: "one piece" };

// //   try {
// //     const findOneResult = await collection.findOne(findOneQuery);
// //     if (findOneResult === null) {
// //       console.log("Couldn't find any recipes that contain 'one piece' as a name.\n");
// //     } else {
// //       console.log(`Found a recipe with 'one piece' as a name:\n${JSON.stringify(findOneResult)}\n`);
// //     }
// //   } catch (err) {
// //     console.error(`Something went wrong trying to find one document: ${err}\n`);
// //   }

//   /*
//    * *** UPDATE A DOCUMENT ***
//    *
//    * You can update a single document or multiple documents in a single call.
//    *
//    * Here we update the PrepTimeInMinutes value on the document we
//    * just found.
//    */
// //   const updateDoc = { $set: { prepTimeInMinutes: 72 } };

//   // The following updateOptions document specifies that we want the *updated*
//   // document to be returned. By default, we get the document as it was *before*
//   // the update.
// //   const updateOptions = { returnOriginal: false };

// //   try {
// //     const updateResult = await collection.findOneAndUpdate(
// //       findOneQuery,
// //       updateDoc,
// //       updateOptions,
// //     );
// //     console.log(`Here is the updated document:\n${JSON.stringify(updateResult.value)}\n`);
// //   } catch (err) {
// //     console.error(`Something went wrong trying to update one document: ${err}\n`);
// //   }

//   /*      *** DELETE DOCUMENTS ***
//    *
//    *      As with other CRUD methods, you can delete a single document
//    *      or all documents that match a specified filter. To delete all
//    *      of the documents in a collection, pass an empty filter to
//    *      the DeleteMany() method. In this example, we'll delete two of
//    *      the recipes.
//    */


// //   const deleteQuery = { name: { $in: ["elotes", "fried rice"] } };
// //   try {
// //     const deleteResult = await collection.deleteMany(deleteQuery);
// //     console.log(`Deleted ${deleteResult.deletedCount} documents\n`);
// //   } catch (err) {
// //     console.error(`Something went wrong trying to delete documents: ${err}\n`);
// //   }

//   // Make sure to call close() on your client to perform cleanup operations
//   await client.close();
// }
// run().catch(console.dir);
