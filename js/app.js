
const path = require('path')
const mysql = require('mysql2')
const express = require('express')
const formidable = require('express-formidable')
const app = express()
const port = 9000

app.listen(port, () => console.log(`Server listening on port ${port}!`))
app.use(express.static(path.join(__dirname, '../')))
app.use(formidable())

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sudheer@16',
    database: 'cucs'
})
connection.connect((err) => {
    if(!err) console.log('Database Connected')
    else console.log('Error Connecting to database \n' + err)
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
    res.end()
})

app.get('/stuinfo', (req, res) => {
    connection.query('select * from blossoms', (err, data) => {
        if(!err) {
            res.writeHead(200, {'Content-Type': 'text/JSON'})
            res.write(data)
            res.end()
        }
        else {
            console.log(err);
        }
    })
})

app.post('/addStudentDB', (req, res) => {
    var obj = Object.values(req.fields)
    connection.query('insert into blossoms values?', [[obj]], (err) => {
        if(!err) console.log(`Student ${obj[1]} added successfully to stuinfo`)
        else console.log(err)
    })
    res.StatusCode = 302
    res.setHeader('Location', '/')
    return res.end()
})



app.post('/updateStudentDB', (req, res) => {
    var obj = Object.values(req.fields)
    console.log(obj)
    obj.push(obj[0])
    var sqlUpdate = "update blossoms set s_regno=?, s_name=?, s_class=?, s_event=?, s_team=? where s_regno=?"
    connection.query(sqlUpdate, obj, (err) => {
        if(!err) console.log(`Student ${obj} updated successfully to stuinfo`)
        else console.log(err)
    })
    res.StatusCode = 302
    res.setHeader('Location', '/')
    return res.end()
})



app.post('/delStudent', (req, res) => {
    var obj = Object.values(req.fields)
    connection.query('delete from blossoms where s_regno=?', obj[0], (err) => {
        if(!err) console.log(`Successfully deleted ${obj[1]}`)
        // if(!err) console.log(`Student ${obj} deleted successfully from stuinfo`)
        else console.log(err)
    })
    return res.end()
})

 

app.get('/maleAG', (req, res) => {
    connection.query('select * from blossoms where (s_team="teamBlah")', (err, data) => {
        if(!err) {
            res.writeHead(200, {'Content-Type': 'text/JSON'})
            // res.write(data)
            res.write(JSON.stringify(data, null, 2))
            res.end()
        }
        else {
            console.log(err);
        }
    })
})