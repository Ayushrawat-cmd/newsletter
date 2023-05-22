const express = require("express");

const app = express();

const https = require("https");

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){
    
    var firstName = req.body.fname;
    var lastName = req.body.lnae;
    var email = req.body.email;
    var data = {
        members:[
            {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName,
            }
        }
        ]

    };
    var jsonData = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/49b8f0b4ee"
    const options = {
        method:"post",
        auth: "Ayush:17325568bb0695808fd4083186a85bf8-us6"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
            
            console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData);
    request.end();
    


});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT||3000, function(){
    console.log("Sever is up and running");
});
//api key
// 17325568bb0695808fd4083186a85bf8-us6
//unique id
//49b8f0b4ee