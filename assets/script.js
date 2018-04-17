// Initial Animal Array
var initAnimals = ["wolf", "panda", "giraffe", "elephant", "dog", "monkey", "rabbit", "bat", "snake", "dolphin", "shark"]

// Set animal variable to DOM "data-name"
// Call API for data using API key
function getAnimalGifs() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?" + "q=" + animal + "&apikey=7ZMRSxlX7lPZWvtLR7iPdhXmqURWKf7J" + "&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (response) {
        console.log(response);
        for (i = 0; i < response.data.length; i++) {
            $('#newAnimalBtn').text("src", response.data[i].images.original)

            $('.newGif').text(JSON.stringify(response));
        }
    });
}

// Function to render buttons to DOM
function renderButton() {
    $('#buttonView').empty();

    // setting array to length of var = initAnimals
    for (var i = 0; i < initAnimals.length; i++) {

        // Create button type
        var a = $("<button>");

        // Add class to button
        a.addClass("animal");

        // Re-set attribute of a and initAnimals to data-name
        a.attr("data-name", initAnimals[i]);

        // Type animal name text to DOM
        a.text(initAnimals[i]);

        // Append button to array in DOM
        $("#buttonView").append(a);
    }
}

$('.newAnimalBtn').on("click", function(event) {
    event.preventDefault();

    var animal = $('#animal-input').val().trim();

    initAnimals.push(animal);

    renderButton();
});
$(document).on("click", ".animal", getAnimalGifs);

renderButton();
