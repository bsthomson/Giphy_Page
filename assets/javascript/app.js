var topics = ["Jene Vickrey", "Melissa Rooker"];
console.log(topics);

function topicButtons() {
    for (i=0; i < topics.length; i++){
        var gifVal = topics[i];
        var gifBut = $("<button>");
        gifBut.addClass("btn btn-danger");
        gifBut.attr("data-representative", gifVal);
        gifBut.text(gifVal);
        $("#buttons").append(gifBut);       
    }
    for (j=0; j < topics.length; j++){
        topics.splice(0, topics.length);
    }
}
topicButtons()

$("#submit").on("click", function() {
    event.preventDefault();
    var gifSub = $("#create-gif").val().trim();
    console.log(gifSub);
    topics.push(gifSub);
    topicButtons();
    
})

$(document.body).on("click", ".btn-danger", function() {
    event.preventDefault();
    var representative = $(this).attr("data-representative")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + representative + "&api_key=r2yx4XalMqrmoLmjtkv0m8m6N7jiAMTC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
      })
    .then(function(response) {
        var results=response.data;
        for (var i=0; i < results.length; i++) {
            
            var gifDiv=$("<class = 'item'>");
            
            var representativeImage = $("<img>");
            
            representativeImage.attr("src", results[i].images.fixed_width_still.url);
            representativeImage.attr("data-still", results[i].images.fixed_width_still.url);
            representativeImage.attr("data-animate", results[i].images.fixed_width.url);
            representativeImage.attr("data-state", "still");
            representativeImage.attr("class", "gif");

            
            gifDiv.prepend(representativeImage);
            
            $("#gifs-go-here").prepend(gifDiv);
        }
    });
});

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