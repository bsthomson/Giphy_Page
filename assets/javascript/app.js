// Array for storing buttons

var topics = ["Jene Vickrey", "Melissa Rooker"];
console.log(topics);

// Creates buttons
function topicButtons() {
    for (i=0; i < topics.length; i++){
        var gifVal = topics[i];
        var gifBut = $("<button>");
        gifBut.addClass("btn btn-danger");
        gifBut.attr("data-representative", gifVal);
        gifBut.text(gifVal);
        $("#buttons").append(gifBut);    
    }
}
topicButtons()

// When submit button is clicked pushes the value into the topics array
$("#submit").on("click", function() {
    event.preventDefault();
    $("#buttons").empty();
    var gifSub = $("#create-gif").val().trim();
    console.log(gifSub);
    topics.push(gifSub);
    console.log(topics);
    if ($('#buttons').is(':empty')){
        topicButtons();
    };
    
})

// Variables for altering the offset value of the queryURL
var limit = 10;
var offset = 0;
var page = 0;


//Function for creating gifs
function gifCreate(offsetVal) {
    var representative = $(this).attr("data-representative")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + representative + "&api_key=r2yx4XalMqrmoLmjtkv0m8m6N7jiAMTC&limit="+limit+"&offset="+offsetVal;
    $.ajax({
        url: queryURL,
        method: "GET"
      })
    .then(function(response) {
        console.log(queryURL);
        var results=response.data;
        // loops through all of the results
        for (var i=0; i < results.length ; i++) {
            var gifDiv=$("<class = 'item'>");
            
            var representativeImage = $("<img>");
            
            representativeImage.attr("src", results[i].images.fixed_width_still.url);
            representativeImage.attr("data-still", results[i].images.fixed_width_still.url);
            representativeImage.attr("data-animate", results[i].images.fixed_width.url);
            representativeImage.attr("data-state", "still");
            representativeImage.attr("class", "gif");
            
            gifDiv.prepend(representativeImage);
            
            $("#gifs-go-here").prepend(gifDiv);
            var p = $("<p>").text("Rating: " + results[i].rating);
            $(gifDiv).append(p);   
                 
            
            
        };
    });    
}

// When a red button is clicked creates its gif
$(document.body).on("click", ".btn-danger", function() {
    event.preventDefault();
    offset = 0;
    gifCreate(offset);

});

// When the 10 more button is clicked the offset is increased by 10 and the new gifs are created
$(document.body).on("click", "#10more", function() {
    event.preventDefault();
    page++;
    offset = page * limit;
    gifCreate(offset);
    console.log(page);         
});

// Switches the gifs from static to animated by switching their data-state and image src.
$(document.body).on("click", ".gif", function() {
    var state= $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})