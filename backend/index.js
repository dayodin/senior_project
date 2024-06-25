import express from "express";
import cors from "cors";
import "./loadEnviornment.js";
import "express-async-errors";
import authors from "./routes/mongo/authors.js";
import series from "./routes/mongo/series.js";
import manga from "./routes/mongo/manga.js";
import getManga from "./routes/ebay/getManga.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/authors", authors);
app.use("/series", series);
app.use("/manga", manga);
app.use("/getManga", getManga);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});