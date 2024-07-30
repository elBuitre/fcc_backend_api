// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  const date = new Date(Date.now());
  res.json({
    unix:date.valueOf(),
    utc:date.toUTCString()
  });
});

app.get("/api/:incoming", (req, res) => {
  console.log(req.params.incoming);
  const date_number = Number(req.params.incoming);
  const date = isNaN(date_number) ? new Date(req.params.incoming) : new Date(date_number);
  if (!date instanceof Date || isNaN(date)) {
    res.json({
      error:"Invalid Date"
    });
  } else {
    res.json({
      unix:date.valueOf(),
      utc:date.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
