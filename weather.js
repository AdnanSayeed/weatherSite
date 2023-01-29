const express = require("express");
const app = express();

const http = require("http");
const bodyparser = require("body-parser"); 
const { json, response } = require("express");

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}))

app.post("/", (req,res) =>{
   const regionName = req.body.cityName;
   const url = "http://api.weatherapi.com/v1/current.json?key=38db6c12f3164640ae975052231201&q="+ regionName;

   http.get(url, (response) =>{
      
      response.on("data", (data) =>{

         const weatherData = JSON.parse(data);
         const temp_c = weatherData.current.temp_c;
         const temp_f= weatherData.current.temp_f;
         const conditions = weatherData.current.condition.text
         const image = weatherData.current.condition.icon;

         res.write("<h1>The temperature in " + regionName + " is " + temp_c + " degrees celsius or " + temp_f + " fahrenheit.</h1>" );
         res.write("<h1>Weather Description: " + conditions+ "</h1>");
         res.write("<img src=" +image+ "/>" );
         res.send();
         
      })
   })
})

app.listen(process.env.PORT, (req,res) =>{
   console.log("Watching port 5000!!");
})