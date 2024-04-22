import express from "express";
import mysql from "mysql";
import cors from 'cors';

const app = express()

// connect to database
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: process.env.PASSWORD, //",5GL?ecN>mpR[G6c",
    database: "manga_bot_db"
})


app.use(cors())

// display following message onto localhost:8800
app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})
