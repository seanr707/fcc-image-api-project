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
const sendBingResults = (bingApi, query, page = '1', callback) => {
  // Max is 50 for API
  const number = parseInt(page) * 10;
  // Appears to not affect results like it should
  // const skip = (10 * page) - 10;
  // console.log(`Number: ${number}\nSkip: ${skip}`);
  bingApi.images(query, { top: number, skip: 0 }, callback);
};

app.use(express.static(path.join(__dirname, 'views')));

app.get('/api/imagesearch/:id', (req, res) => {
  const id = req.params.id;
  const page = req.query.offset;

  sendBingResults(Bing, id, page, (error, bingRes, body) => {
    if (error) {
      console.error(error);
      return res.send(error);
    } else if (page >= 5 || page <= 0) {
      console.log('Offset out of range (1 - 5)');
      return res.status(500).send('Offset out of range (1 - 5)');
    }

    const SKIP = (parseInt(page) * 10) - 10;
    return res.json(
      body.value.slice(SKIP, SKIP + 10).map(imageObj => {
        return {
          url: imageObj.contentUrl,
          snippet: imageObj.name,
          thumbnail: imageObj.thumbnailUrl,
          context: imageObj.hostPageDisplayUrl
        };
      })
    );
  });
});

app.get('/', (req, res) => {
  res.render('index.html');
});

app.listen(process.env.PORT || 5000, () => console.log('Awaiting requests...'));
