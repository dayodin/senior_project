import express from "express" 
import mysql from "mysql" 
import cors from 'cors' 
import bodyparser from "body-parser" 


// kdinsmor
// y1hAkKj4hiS533wp

const app = express()

// connect to database
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: process.env.PASSWORD, //",5GL?ecN>mpR[G6c",
    database: "manga_bot_db"
})

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to the database");
});

app.use(cors())

// display following message onto localhost:8800
app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.post('/authors', async (req, res) => {
    
    var query = `INSERT INTO AUTHOR (f_name, l_name)
                   VALUES (?, ?)` 

    // return res.status(200).send(req)            
    
    const values = [
        "Eiichiro",
        "Oda"
    ]

    db.query(query, [values], function (err, data) {
        if (err) {
            // some error occured
            return res.send(err)
        } else {
            // successfully inserted into db
            res.status(201).send('Author added successfully!') 
        }
        // if (err) {
        //     // return res.status(500).send(err) 
        //     return res.send(err) 
        // }
        // res.status(201).send('Author added successfully!') 
    }) 
}) 

// app.post('/add_book', (req, res) => {
//     const query = `INSERT INTO BOOK (part, volume, book_name, book_price)
//                    VALUES (?, ?, ?, ?)` 
    
//     return res.status(200).send(req)

//     const { part, volume, book_name, book_price } = req.body 

//     db.query(query, [book_id, series_id, author_id, part, volume, book_name, book_price], (err, result) => {
//         if (err) {
//             return res.status(500).send(req) 
//         }
//         res.status(201).send('Book added successfully!') 
//     }) 
// }) 

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})
