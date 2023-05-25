var con = require("../db_connection");
var connection = con.getConnection();
connection.connect();
var express = require("express")
var router = express.Router();
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: './upload',
    filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })
  const upload = multer({
    storage: storage,
  });
router.post('/', upload.single('image'), (req, res) => {
    // const { productName, price } = req.body;
    const { filename } = req.file;
    const  {productName} = req.body;
    const { price } = req.body;

    connection.query("INSERT INTO insert_product ( productName,price,image) VALUES(?,?,?)", [ productName, price,filename], (err, result) => {
        if (err) {
            res.send({ "insert": "fail" })
        }
        else {
            res.send({ "insert": "success," })
        }
    });
});
module.exports = router;