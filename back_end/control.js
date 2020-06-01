var express=require('express');
var bodyParser=require('body-parser');
var cors=require('cors');
var request=require('request');

var app=express();
var urlencodedParser=bodyParser.urlencoded({extended:false});

app.use(cors());
app.use(express.static('views'));
app.set('view engine','ejs');

app.use(express.json());

app.post('/details',urlencodedParser,function(req,res){
  var city=req.body.city;
  console.log(`${city} node listening react`);
  request(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=MtFArvjR2ZCwarVZ1Vg83FpkwuBraiyQ&q=${city}`,
    function(error,response,body){
      if(!error && response.statusCode==200){
        var item=JSON.parse(body);
        console.log(item);
        res.send(item);
      }
    });
})

app.post('/data',urlencodedParser,function(req,res){
  var select=req.body.key;
  console.log(`listening ${select} key`);
  request(
    `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${select}?apikey=MtFArvjR2ZCwarVZ1Vg83FpkwuBraiyQ`,
    function(error,response,body){
      if(!error && response.statusCode==200){
        var det=JSON.parse(body);
        console.log(det);
        res.send(det);
      }
    });
})
app.listen(5000);
