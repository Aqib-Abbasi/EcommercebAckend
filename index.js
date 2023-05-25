const express = require('express');
var con = require('./db_connection');
var connection = con.getConnection();
connection.connect();
var cors = require('cors');
var body_parser = require('body-parser');
const app = express();

///////////
app.use(express.json())
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(cors());

// Post Api
app.use('/upload', express.static('./upload'))

var insert = require('./insert/insertproduct')
app.use('/insert', insert);

//Get Api
var get = require('./get/getproduct')
app.use('/get', get)

//Delete Api
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  connection.query("Delete from insert_product where id = ?", id, (err, result) => {
    if (err) {
      res.send({ "delete": "fail" })
    } else {
      res.send({ "delete": "success" })
    }
  })
});
// To fetch data on update page
app.get('/get/:id', (req, res) => {
  const { id } = req.params;
  connection.query("SELECT * FROM insert_product where id = ?", id, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});
// Update data Api
app.put('/put/:id', (req, res) => {
  // const { filename } = req.file;
  const {productName} = req.body;
  const { price } = req.body;

  connection.query("UPDATE insert_product set  productName='"+productName+"',price='"+price+"'", (err, result) => {
      if (err) {
          res.send({ "insert": "fail" })
      }
      else {
          res.send({ "insert": "success," })
      }
  });
});

app.listen(4001, () => {
  console.log("Server is connected to")
})