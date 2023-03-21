// jshint esversion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https  = require("https");

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile( __dirname +"/signup.html");
});

var myKey = config.MY_KEY;


//post route
app.post("/", function(req, res){
    const firstName = req.body.fName; //Should use the name att from input as fname
    const lastName =  req.body.lName;
    const email = req.body.email;

    console.log(firstName, lastName, email);

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/b7a64b635f";

    const options = {
        method: 'POST',
        auth: "amr1:"+myKey
    }

    const request = https.request(url, options, function(response){
        response.on('data', function(data){
            // console.log(JSON.parse(data));

            if(response.statusCode===200){
                res.sendFile(__dirname+ "/success.html");
            }else{
                res.sendFile(__dirname+ "/failure.html");
            }
        });
    });

    request.write(jsonData);
    request.end();
});


app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){  //change port 3000 to process.en.PORT for heroku to choose a port
    console.log("Server running on port 3000");
});

    //api key 
    // ca7f*********-us21

    //list id
    //b7a64b635f