/*
    Feel free to use any of this code for non-profit purposes
*/

var imagesArray = ["/assets/images/leaves2.jpg", "/assets/images/leaves3.jpeg", "/assets/images/leaves.jpg"];
var imageTimeout = 4000;

$(document).ready(function() {
    console.log("hello");
    createImageCarousel();

    if(imagesArray.length > 1){
        setTimeout(function(){
            beginImageSlide(0);
        },imageTimeout);
    }

});

function createImageCarousel(){
    var parent = document.getElementById("myImageBannerContainer");
    var initialWidthPercentage = 100;
    var finalWidthPercentage = initialWidthPercentage * imagesArray.length;
    var childWidth = 100 / imagesArray.length;
    parent.style.width = finalWidthPercentage + "%";
    var i;
    var tempImage;
    var tempId;
    for(i = 0; i < imagesArray.length; i++){
        tempImage = document.createElement("IMG");
        tempId = "image" + i;
        tempImage.setAttribute("id", tempId);
        tempImage.setAttribute("class", "imageBanner");
        tempImage.setAttribute("src", imagesArray[i]);
        tempImage.style.maxWidth = childWidth + "%";
        tempImage.style.minWidth = childWidth + "%";
        parent.appendChild(tempImage);
    }
}

function beginImageSlide(index){
    if(index < (imagesArray.length - 1)){
        $("#myImageBannerContainer").animate({
            left: "-=100%"
        }, function(){
            index++;
            setTimeout(function(){
                beginImageSlide(index);
            },imageTimeout);
        });
    } else {
        $("#myImageBannerContainer").animate({
            left: "0"
        }, function(){
            index = 0;
            setTimeout(function(){
                beginImageSlide(index);
            },imageTimeout);
        })
    }
}