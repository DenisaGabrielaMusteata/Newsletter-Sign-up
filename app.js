const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("Public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/cb463d9e34"

    const options = {
        method: "post",
        auth: "denisa17:af3bf5c169d2472e0b50b2d4eff0cba1-us21"
        }
    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.post("/failure", function (req, res) {
    res.redirect("/")
})

app.listen(3000, function () {
    console.log("serv is running");
})

//06770ed7be2543938360679efe488a3c-us21
//cb463d9e34