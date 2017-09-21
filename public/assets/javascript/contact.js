$(document).ready(function(){
    $("#contactForm").submit(function(e){
        console.log("hi");
        e.preventDefault();
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var emailFrom = $("#emailId").val().trim();
        if(!re.test(emailFrom)){
            console.log("Invalid email");
            alert("Invalid email address. Please use a different email");
            return;
        }
        var name = $("#nameId").val().trim();
        if(!(name.length > 0 && name.length <= 50)){
            console.log("Invalid name");
            alert("Invalid name. Names must be between 1 and 50 characters long");
            return;
        }
        var textBody = $("#messageId").val();
        if(!(textBody.length > 0 && textBody.length <= 500)){
            console.log("Invalid email text");
            alert("Your message must be between 1 and 500 characters long");
            return;
        }
        var formData = {
            "nameInput" : name,
            "emailInput" : emailFrom,
            "messageTextArea" : textBody
        };
        $.ajax({
            url : "/contact",
            method : "POST",
            data : formData,
            dataType : "json",
        }).done(function(data){
            if(data.hasOwnProperty("error")){
                alert(data.error);
            }
            if(data.hasOwnProperty("success")){
                alert(data.success);
            }
        });
    });
});