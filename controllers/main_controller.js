var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');
var EMAIL_PASS = process.env.EMAIL_PASS;

var sendEmail = function(fromEmail, subject, textBody){
    var promise = new Promise(function(resolve, reject){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'john.price.site1@gmail.com',
                pass: EMAIL_PASS,
            }
        });
      
        var mailOptions = {
            from: fromEmail,
            to: 'john.price.site1@gmail.com',
            "subject": subject,
            text: textBody,
        };
      
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info.response);
            }
        });
    });
    return promise;
}

//route for main page (home page)
router.get("/", function(req, res) {
    var hbsObj = {};
    res.render("index", hbsObj);
});

router.get("/contact", function(req, res) {
    var hbsObj = {};
    res.render("contact", hbsObj);
});

router.post("/contact", function(req, res) {
    var emailFrom = req.body.emailInput;
    var name = req.body.nameInput;
    var textBody = req.body.messageTextArea;
    if(emailFrom && name && textBody){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(emailFrom)){
            console.log("Invalid email");
            return res.json({error: "Invalid email input."});
        }
        if(!(name.length > 0 && name.length <= 50)){
            console.log("Invalid name");
            return res.json({error: "Invalid name input."});
        }
        if(!(textBody.length > 0 && textBody.length <= 500)){
            console.log("Invalid email text");
            return res.json({error: "Invalid text input."});
        }
        var subjectLine = name + " sends his/her regards from your personal site";
        sendEmail(emailFrom, subjectLine, textBody).then(function(result){
            console.log("Email successfully sent");
            res.json({success : "Your email has been successfully sent! I will respond to it as soon as I can."});
        }).catch(function(err){
            console.log("Error while sending email " + err);
            res.json({error : "Error while sending email. Please try again later."})
        });
    } else {
        console.log("not all form information filled out");
        res.json({
            error : "Name, email, and message body must be filled out."
        });
    }
});

router.get("/portfolio", function(req, res){
    var hbsObj = {};
    res.render("portfolio", hbsObj);
});


// Export routes for server.js to use.
module.exports = router;