var express = require("express");
var body_parser = require("body-parser");
var request = require("request");
var app = express();

app.use(express.static('public'));
app.use(body_parser.urlencoded({extended:true}));
app.set('view engine', 'ejs')

const apiKey = "e395f4f73027cf29def80fced18f5ed1";

app.get('/', function(req, res){
    res.render('index');
});

app.post('/', function(req, res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    request(url, function(err, resp, body){
        if(err){
            res.render('index', {weather: null, error: "Error, please try again"});
        }
        else{
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather: null, error: "Error, please try again"});
            }
            else{
                let weatherText = `It's ${weather.main.temp} in ${weather.name}`;
                res.render('index', {weather: weatherText, error: null})
            }
        }
    });

});

app.listen(3000, function(){
    console.log("Example app listening on port 3000!")
});