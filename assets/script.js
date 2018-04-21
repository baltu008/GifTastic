$(document).ready(function () {
    var initAnimals = ["wolf", "panda", "giraffe", "elephant", "dog", "monkey", "rabbit", "bat", "snake", "dolphin", "shark"]

    function renderButton() {
        for (var i = 0; i < initAnimals.length; i++) {
            $('#buttonView').append(`
            <button class='animal-button'>
            ${initAnimals[i]}
            </button>
        `);
        }
    }

    // Press submit to get new animal button
    $("#animal-form").submit(function (e) {
        e.preventDefault();
        var newAnimal = $('#animal-input').val().trim();
        if (newAnimal) {
            $('#buttonView').append(`
            <button class='animal-button'>
            ${newAnimal}
            </button>
            `)
        }
    });


    $(document).on("click", ".animal-button", function () {
        var buttonValue = ($(this).text().trim());

        var queryURL = "https://api.giphy.com/v1/gifs/search?" + "q=" + buttonValue + "&apikey=7ZMRSxlX7lPZWvtLR7iPdhXmqURWKf7J" + "&limit=10";

        // Setting up ajax and getting gifs from API
        $.ajax({
            url: queryURL,
            method: 'GET',
        }).then(function (response) {
            console.log(response);
            $('#gifs-appear-here').empty()
            for (i = 0; i < response.data.length; i++) {
                $('#gifs-appear-here').append(`
            <img src="${response.data[i].images.original.url}" 
            data-state= "animate"
            data-animate="${response.data[i].images.original.url}" 
            data-still="${response.data[i].images.original_still.url}"/>
            `)
            }
        })
    })

    $(document).on("click", "img", function () {
        // setting img state on click
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })

    renderButton();

})
