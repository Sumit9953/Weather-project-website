const express = require("express");
const https = require("https");
const bodyparser = require("body-parser")

const app = express();

app.use(bodyparser.urlencoded({extended: true}))

app.get("/",function (req,res) {
res.sendFile(__dirname +"/index.html")

  // res.send("server is up and running.")
});
app.post("/",function (req,res) {

  const query = req.body.CityName;
  const apikey = "b11339b0aa4ccee5995a0f4d6ffeb3bc"
  const unit = "metric"


  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+apikey+"&units="+unit;

  https.get(url,function(response) {
    console.log(response.statusCode);
    response.on("data",function (data) {
      const weatherdata = JSON.parse(data)
      const temp = weatherdata.main.feels_like
      // console.log(temp);
      const description = weatherdata.weather[0].description
      // console.log(description);
      const icon = weatherdata.weather[0].icon
      const imageURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p>The weather is current "+description+" </p>")
      res.write("<h1>The temperature in "+query+" is " + temp + " degree celcius</h1>")
      res.write("<img src="+ imageURL+">")
      res.send();
    })
  });
});




app.listen(3000,function () {
  console.log("server is running on port 3000");
})
