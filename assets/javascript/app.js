
$("#submit").on("click", function() {
    event.preventDefault();
    var gifVal = $("#create-gif").val().trim();
    console.log(gifVal);
    var gifBut = $("<button>");
    gifBut.addClass("btn btn-danger");
    gifBut.attr("data-representative", gifVal);
    gifBut.text(gifVal);
    $("#buttons").append(gifBut);
    
})

$(document.body).on("click", ".btn-danger", function() {
    event.preventDefault();
    var representative = $(this).attr("data-representative")
    console.log(this)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + representative + "&api_key=r2yx4XalMqrmoLmjtkv0m8m6N7jiAMTC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
      })
    .then(function(response) {
        var results=response.data;
        console.log(response);
        for (var i=0; i < results.length; i++) {
            
            var gifDiv=$("<div class = 'item'>");
            
            var representativeImage = $("<img>");
            
            representativeImage.attr("src", results[i].images.fixed_height.url);
            
            gifDiv.prepend(representativeImage);
            
            $("#gifs-go-here").prepend(gifDiv);
        }
    });
});