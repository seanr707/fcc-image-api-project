var express = require('express');

var path = require('path');
var app = express();
var multer  = require('multer');
var request = require('request');

var Bing = require('node-bing-api')
            ({
              accKey: "7e792dc10eed41b9a079f6d1a30a97bd"

            });
var upload = multer({ dest: 'uploads/' });
var t;

app.use(express.static(path.join(__dirname, 'views')));

app.listen(process.env.PORT || 5000);


app.get("/api/imagesearch/:id",function(req,response){

      var f = req.params.id;
      var t = req.query.offset;
      var g;
      var k;
      var  l;
      var tarray =[];
      console.log("this is f ",f,"this is t ",t)
    Bing.images(f, {top:40, skip: 0}, function(error, res, body){
      console.log("started");
      g = JSON.stringify(body);

      k=body;
      for(var i =0;i<40;i++)
      {
        tarray.push({
        url: body.value[i].contentUrl,
        snippet: body.value[i].name,
        thumbnail: body.value[i].thumbnailUrl,
        context:body.value[i].hostPageDisplayUrl
    });

      }
      console.log(g);
      console.log("end");
     l =JSON.stringify(tarray)

     response.json(l);
    });

  });

app.get("/",function(req,res){
  res.render("index.html");
})
