var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

app.use(cors())

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })

var benchImageNumber = 1;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, 'lawka-numer-' + benchImageNumber + '.jpg')
    }
})


var upload = multer({
    storage: storage
}).single('file')



app.post('/upload', function (req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })
    benchImageNumber++;
    console.log(benchImageNumber)
});


app.listen(3000, function () {

    console.log('App running on port 3000');

});