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
      console.log("value of offset ",t);
      var g;
      var k;
      var  l;
      var tarray =[];

      // start

      if(t===1){
        Bing.images(f, {top:10, skip: 0}, function(error, res, body){
          console.log("started");
          g = JSON.stringify(body);
          for(var i =0;i<9;i++)
          {
            tarray.push({
            url: body.value[i].contentUrl,
            snippet: body.value[i].name,
            thumbnail: body.value[i].thumbnailUrl,
            context:body.value[i].hostPageDisplayUrl
                        });

          }

          response.json(tarray);
          console.log(tarray);
        })
      }

        else if (t===2){
          Bing.images(f, {top:20, skip: 10}, function(error, res, body){
            console.log("started");
            g = JSON.stringify(body);
            for(var i =0;i<9;i++)
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
            console.log("started");
            g = JSON.stringify(body);
            for(var i =0;i<9;i++)
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
          response.send("No results to display. Please put offset=1,2 or 3. Api doesnt understand your offset value")
        }


       console.log(tarray);


      })



      //end




app.get("/",function(req,res){
  res.render("index.html");
})
