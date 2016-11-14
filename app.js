const express = require('express');

const path = require('path');
const app = express();
const multer  = require('multer');
const request = require('request');

const Bing = require('node-bing-api')({
  accKey: '7e792dc10eed41b9a079f6d1a30a97bd'
});

const upload = multer({ dest: 'uploads/' });

const sendBingResults = (bingApi, id, page, callback) => {
  const top = page * 10;
  const skip = 10 * page - 10;
  bingApi.images(id, { top, skip }, callback);
};

app.use(express.static(path.join(__dirname, 'views')));

app.listen(process.env.PORT || 5000);


app.get('/api/imagesearch/:id', (req, res) => {
  const f = req.params.id;
  const t = req.query.offset;
  console.log('value of offset ' + page);

  let arr = [];

  // start

  if (t===1) {
    Bing.images(f, {top:10, skip: 0}, (error, res, body) => {
      console.log('started');
      for (const i =0; i<9; i++) {
        arr = arr.concat({
          url: body.value[i].contentUrl,
          snippet: body.value[i].name,
          thumbnail: body.value[i].thumbnailUrl,
          context:body.value[i].hostPageDisplayUrl
        });
      }
      console.log(arr);
      res.json(arr);
    })
  }

    else if (t===2){
      Bing.images(f, {top:20, skip: 10}, function(error, res, body){
        console.log('started');
        g = JSON.stringify(body);
        for(const i =0;i<9;i++)
        {
          tarray.push({
          url: body.value[i].contentUrl,
          snippet: body.value[i].name,
          thumbnail: body.value[i].thumbnailUrl,
          context:body.value[i].hostPageDisplayUrl
      });

        }
        response.json(tarray);
      })

    }

    else if(t===3){
      Bing.images(f, {top:30, skip: 20}, function(error, res, body){
        console.log('started');
        g = JSON.stringify(body);
        for(const i =0;i<9;i++)
        {
          tarray.push({
          url: body.value[i].contentUrl,
          snippet: body.value[i].name,
          thumbnail: body.value[i].thumbnailUrl,
          context:body.value[i].hostPageDisplayUrl
      });

        }
        response.json(tarray);
      })

    }
    else{
      response.send('No results to display. Please put offset=1,2 or 3. Api doesnt understand your offset value')
    }
});

app.get('/', (req, res) => {
  res.render('index.html');
})
