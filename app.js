// jshint esversion:6
const  express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.render('index',{data:'',title:"Enter city name"});
});

app.post("/",(req,res)=>{
    const query = req.body.city;
    const apikey = "";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${query}&${apikey}&units=metric`;
    
    https.get(url, (response) => {
        if (response.statusCode === 200) {
          response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            res.render('index', {data: weatherData,title:weatherData.name});
          })
        } else {
          res.render('index', {data: "0",title:"oops an error occured"})
        }
      })
   
});

let port = process.env.PORT;
if(!port || port=="")
  port=3000;    

app.listen(port ,function(){
    console.log("Server is running on Port 3000");
});