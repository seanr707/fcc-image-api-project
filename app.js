const express = require('express');

const path = require('path');
const app = express();
const multer  = require('multer');
const request = require('request');

const Bing = require('node-bing-api')({
  accKey: '7e792dc10eed41b9a079f6d1a30a97bd'
});

const upload = multer({ dest: 'uploads/' });

// Adjusts first item and amount to skip by the page specified by the user
const sendBingResults = (bingApi, id, page, callback) => {
  const top = page * 10;
  const skip = 10 * page - 10;
  bingApi.images(id, { top, skip }, callback);
};

app.use(express.static(path.join(__dirname, 'views')));

app.listen(process.env.PORT || 5000);


app.get('/api/imagesearch/:id', (req, res) => {
  const id = req.params.id;
  const page = req.query.offset;

  let arr = [];

  sendBingResults(Bing, id, page, (error, bingRes, body) => {
    console.log('started');
    console.log(body);
    for (let i = 0; i < 9; i++) {
      arr = arr.concat({
        url: body.value[i].contentUrl,
        snippet: body.value[i].name,
        thumbnail: body.value[i].thumbnailUrl,
        context:body.value[i].hostPageDisplayUrl
      });
    }
    console.log(arr);
    res.json(arr);
  });
});

app.get('/', (req, res) => {
  res.render('index.html');
});
