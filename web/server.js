var express = require('express')
var bodyParser = require('body-parser')
var fetch = require('node-fetch')
var FormData = require('form-data')
var config = require('./config.js')

var app = express()
var port = 8000

app.use(bodyParser.json())

app.post('/send', (req, res) => {

  var token = config.slack_token
  var channel = 'D613S2GP9'
  var text = req.body.text

  fetch('https://slack.com/api/chat.postMessage?token=' + token + '&channel=' + channel + '&text=' + text)
    .then(response => {
      if (response.status == 200) {
        res.send('Message sent successfully')
      } else {
        res.send('There was error sending message')
      }
    })
    .catch(error => {
      res.send(error)
    })
})

app.listen(port, () => {
  console.log('App is listening to port ' + port)
})
