const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const db = mysql.createConnection({
    host: "159.65.146.134",
    user: "ruchi",
    password: "Ruchi143",
    database: "nodemysql",
    port: 3306
})

db.connect((err) => {
    if (err) throw err;
    console.log("Mysql Connected!");
})

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    next();
});

//create database
/* app.get('/createdb', (req, res)=>{
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created...')
    })
}) */

//create table
app.get('/createslotstable', (req, res) => {
    let sql = 'CREATE TABLE slots (id INT AUTO_INCREMENT PRIMARY KEY, batch VARCHAR(255), slot VARCHAR(255), teacher VARCHAR(255), date_of_class DATE)';
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Slots table created');
    });
});

//create teachers table
app.get('/createteacherstable', (req, res) => {
    let sql = 'CREATE TABLE teachers (id INT AUTO_INCREMENT PRIMARY KEY, teacher VARCHAR(255))';
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('teacher table created...');
    });
});

// get all tasks
app.get('/getalltasks/:startDate/:endDate', (req, res)=>{
    console.log(req.params.startDate, req.params.endDate);
    console.log("get all tasks based on month or week")
    let sql = `SELECT * FROM slots WHERE date_of_class BETWEEN '${req.params.startDate}' AND '${req.params.endDate}'`;
    let query = db.query(sql, (err, results)=>{
        if(err) throw err;
        console.log(results)
        res.send(JSON.stringify(results));
    })
})



//get all teachers 
app.get('/getallteachers', (req, res)=> {
    console.log("get all teachers")
    let sql = `SELECT * FROM teachers`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err; 
        console.log(results)
        res.send(JSON.stringify(results));
    })
})


//get task based on date
app.get('/getdata/:date', (req, res)=> {
    console.log("inside date get date")
    let sql = `SELECT * FROM slots WHERE date_of_class = '${req.params.date}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(JSON.stringify(result))
    })
})

//get all tasks based on teacher and filter
app.get('/getteachertasks/:startDate/:endDate/:name', (req, res)=>{
    console.log(req.params.startDate, req.params.endDate, req.params.name);
    console.log("get all tasks based on month or week for  teacher")
    let sql = `SELECT * FROM slots WHERE (date_of_class BETWEEN '${req.params.startDate}' AND '${req.params.endDate}') and (teacher = '${req.params.name}')`;
    let query = db.query(sql, (err, results)=>{
        if(err) throw err;
        console.log(results)
        res.send(JSON.stringify(results));
    })
})

//get tasks based on name and date
app.get('/getteacherdatetask/:date/:name', (req, res) => {
    console.log(req.params.name, req.params.date)
    console.log("get date for teacher tasks on selected date")
    let sql = `SELECT * FROM slots WHERE (teacher = '${req.params.name}') AND (date_of_class = '${req.params.date}')`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send(JSON.stringify(result))
    })
})




//Insert task 
app.post('/addslot', (req, res) => {
    console.log("in insert data funcion")
    console.log(req.body) 
    let post = {batch:req.body.batch, slot: req.body.slot, teacher: req.body.teacher, date_of_class: req.body.date_of_class, taskDetails: req.body.taskDetails};
    let sql = "INSERT INTO slots SET?";
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(JSON.stringify(result))
    })
})

//Insert teacher
app.post('/addteacher', (req, res) => {
    console.log("insert new teacher")
    console.log(req.body)
    let post = {teacher: req.body.teacher};
    let sql = "INSERT INTO teachers SET?";
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(JSON.stringify(result))
    })
})

//delete task
app.get('/deletedata/:id', (req, res) => {
    console.log("delete task based on id")
    let sql = `DELETE FROM slots WHERE id = '${req.params.id}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})



//update data
// app.get('/updatedata/:id', (req, res)=> {
//     let details = 'teach heap sort implementation';
//     le/+t sql = `UPDATE slots SET taskDetails = '${details}' WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send("post updated...")
//     })
// })


module.exports = app;
