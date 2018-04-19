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

    $("#animal-form").submit(function (e) {
        e.preventDefault();
        var newAnimal = $('#animal-input').val();
        $('#buttonView').append(`
        <button class='animal-button'>
        ${newAnimal}
        </button>
        `)
    });


    $(document).on("click", ".animal-button", function () {
        var buttonValue = ($(this).text().trim());

        var queryURL = "https://api.giphy.com/v1/gifs/search?" + "q=" + buttonValue + "&apikey=7ZMRSxlX7lPZWvtLR7iPdhXmqURWKf7J" + "&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET',
        }).then(function (response) {
            console.log(response);
            for (i = 0; i < response.data.length; i++) {
                $('#gifs-appear-here').append(`
            <img src=${response.data[i].images.original.url} />
            `)
            }
        })
    })

    renderButton();

})
