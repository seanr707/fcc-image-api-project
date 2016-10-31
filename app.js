var express = require('express');

var path = require('path');
var app = express();
var multer  = require('multer');
var request = require('request');

var Bing = require('node-bing-api-master')
            ({
              accKey: "7e792dc10eed41b9a079f6d1a30a97bd"

            });
var upload = multer({ dest: 'uploads/' });
var t;

app.use(express.static(path.join(__dirname, 'views')));

app.listen(process.env.PORT || 5000);

/*
app.get("/",function(req,res){
  res.render("\views\index.html")
});
*/

  /*jquery code starts
  $( document ).ready(function() {
    var params = {
        // Request parameters
        "q": "cats",
    "count": "30",
    "offset": "0",
    "mkt": "en-us",
    "safeSearch": "Moderate",
    };

//used in other file
    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","multipart/form-data");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","7e792dc10eed41b9a079f6d1a30a97bd");
        },
        type: "POST",
        // Request body
        data: "{body}",
    })
    .done(function(data) {
        //data.value
         var fdata ={};
         console.log(data);
        for(var i=0;i<29;i++){
          var tg = data.value[i].contentUrl;
          fdata[i]=tg;
        }
        console.log(data);
        console.log(fdata);

    })
    .fail(function() {
        alert("error");
    });


//using end

      console.log( "ready!" );
  });





  //jquery code ends
  */
  app.get("/api/imagesearch/:id",function(req,res){

      var f = req.params.id;
      var t = req.query.offset;
      console.log("this is f ",f,"this is t ",t)
    Bing.images(f, {skip: 50}, function(error, res, body){
      console.log("started");
      var g = JSON.stringify(body);
      console.log(g);
      console.log("end");
    });

  });

app.get("/",function(req,res){
  res.render("index.html");
})








/*

app.get("/api/imagesearch/:query",function(req,res){
console.log("came here");
  var query = req.params.query;
  var size = req.query.offset;
  var options = {
    url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + query,
    beforeSend: function(xhrObj){
        // Request headers
        xhrObj.setRequestHeader("Content-Type","multipart/form-data");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","7e792dc10eed41b9a079f6d1a30a97bd");

    },
    type: "POST",
    // Request body
    data: "{body}",
    /*
    headers: {
      'User-Agent': 'request'
    }

  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log(info);
    }
  }

  request(options, callback);




      $.ajax({
          url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + query,
          beforeSend: function(xhrObj){
              // Request headers
              xhrObj.setRequestHeader("Content-Type","multipart/form-data");
              xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","7e792dc10eed41b9a079f6d1a30a97bd");
          },
          type: "POST",
          // Request body
          data: "{body}",
      })
      .done(function(data) {
          //data.value
           var fdata ={};
           console.log(data);
          for(var i=0;i<29;i++){
            var tg = data.value[i].contentUrl;
            fdata[i]=tg;
          }
          console.log(data);
          console.log(fdata);

      })
      .fail(function() {
          alert("error");
          console.log("there is error");
      });



})
*/
