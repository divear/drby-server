const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const app = express();
const cors = require("cors");

const db = mysql.createPool({
	host: "bgvqojweb2qinrqzgchr-mysql.services.clever-cloud.com",
	user: "u7p2yoidmtbhyp1i",
	password: process.env.PASSWORD,
	database: "bgvqojweb2qinrqzgchr",
	charset: "utf8mb4",
});

//middleware
app.use(cors());
app.use(express.json());

//get all drby
app.get("/drby", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	const sql = `
    SELECT 
    *,
    DATE_FORMAT(datum, '%d/%m/%Y %H:%i') AS posted_date
    FROM drby;`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send(result);
	});
});

//add a blog post
app.post("/drby", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);

	const post = req.body;
	const sql = `
    INSERT INTO drby(username, body, datum, genre) VALUES(?, ?, now(), ?) ;
    `;
	console.log(post);
	db.query(
		sql,
		[post[1].username, post[0].body, post[2].genre],
		(err, result) => {
			if (err) throw err;
			res.send(result);
		}
	);
});

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
