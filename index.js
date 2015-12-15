var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/account')
var Schema = mongoose.Schema
var thingSchema = new Schema({}, { strict: false })
var revenue = mongoose.model('revenues', thingSchema)
var expenditure = mongoose.model('expenditures', thingSchema)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {})

// ////////////////////////////////////////
app.get('/revenue', function (req, res) {
  revenue.find(function (err, revenue) {
    if (err) return res.send(err)
    res.send(revenue)
  })
})

app.get('/expenditure', function (req, res) {
  expenditure.find(function (err, expenditure) {
    if (err) return res.send(err)
    res.send(expenditure)
  })
})

// ////////////////////////////////
app.post('/revenue', urlencodedParser, function (req, res) {
  var revenuepost = new revenue(req.body)
  revenuepost.save(function (err) {
    if (err) // ...
      res.send('error')
    else res.send(req.body)
  })
})

app.post('/expenditure', urlencodedParser, function (req, res) {
  var expenditurepost = new expenditure(req.body)
  expenditurepost.save(function (err) {
    if (err) // ...
      res.send('error')
    else res.send(req.body)
  })
})

// //////////////////

app.put('/revenue', urlencodedParser, function (req, res) {
  revenue.update({_id: req.body._id}, { $set: req.body}, { multi: true }, function (err) {
    if (err) // ...
      res.send('error')
    else res.send(req.body)
  })
})

app.put('/expenditure', urlencodedParser, function (req, res) {
  expenditure.update({_id: req.body._id}, { $set: req.body}, { multi: true }, function (err) {
    if (err) // ...
      res.send('error')
    else res.send(req.body)
  })

})

// /////////////////////////////////////////////
app.delete('/revenue', urlencodedParser, function (req, res) {
  revenue.remove({ _id: req.body._id }, function (err) {
    if (err) // ...
      res.send('error')
    else res.send(req.body)
  })
})

app.delete('/expenditure', urlencodedParser, function (req, res) {
  expenditure.remove({ _id: req.body._id }, function (err) {
    if (err) // ...
      res.send('error')
    else res.send(req.body)
  })
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
