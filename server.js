const express = require('express');
const mysql = require('mysql')
require('dotenv').config();
const app = express()
const cors = require("cors")

const db = mysql.createConnection({
    host: "bgvqojweb2qinrqzgchr-mysql.services.clever-cloud.com",
    user: "u7p2yoidmtbhyp1i",
    password: process.env.PASSWORD,
    database: "bgvqojweb2qinrqzgchr"
})

db.connect()

//middleware
app.use(cors());
app.use(express.json())

// TODO: HOST also the server 


//get all drby
app.get("/drby", (req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const sql = `
    SELECT 
    id,
    username,
    body, 
    DATE_FORMAT(datum, '%d/%m/%Y %H:%i') AS posted_date
    FROM drby;`
    db.query(sql, (err, result)=>{
        if(err) throw err;
        res.send(result)
    })
});

//get one blog
app.get("/drby/:id", (req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const sql = `
    SELECT
    drby.id,
    drby.title,
    drby.body,
    DATE_FORMAT(drby.posted_date, '%d/%m/%Y %H:%i') AS posted_date,
    comments.id AS comment_id,
    comments.body AS comment_body,
    DATE_FORMAT(comments.posted_date, '%d/%m/%Y %H:%i') AS comment_dates
    FROM drby
    LEFT JOIN comments ON drby.id = comments.blog_id
    WHERE drby.id = ?;`
    db.query(sql,[req.params.id], (err, result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//add a blog post
app.post("/drby", (req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const post = req.body
    const sql = `
    INSERT INTO drby(username, body) VALUES(?, ?) ;
    `
    console.log(post);
    db.query(sql,[post[1].username, post[0].body], (err, result)=>{
        if(err) throw err;
        res.send(result)
    })
})



const port = process.env.PORT
app.listen(port , ()=>{
    console.log(`listening on port ${port}`);
    
})