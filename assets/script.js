// function displayHeroInfo() {   
    var hero = "deadpool"; 
    var queryURLOne = "https://www.superheroapi.com/api.php/10158163759470734/search/" + hero;
    var queryURLTwo = "https://api.giphy.com/v1/gifs/search?api_key=UZ1q06vU6ySOGMpaTwRtjIXmWHoGeJjg&q=" + hero + "&limit=25&offset=0&rating=G&lang=en";
    //superhero API call
    $.ajax({
        url: queryURLOne,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            // this section will populate the powers-div with the hero's powerstats
            var powersDiv = $(".powers-div");
            var powerStats = JSON.stringify(response.results[0].powerstats);
            var powerPtag = $("<p>").text(powerStats);
            powersDiv.append(powerPtag);
            // this section will populate the bio-div with the hero's biography
            var bioDiv = $("#bio-div");
            var biography = JSON.stringify(response.results[0].biography);
            var bioPtag = $("<p>").text(biography);
            bioDiv.append(bioPtag);

        });
    //giphy API call
    $.ajax({
        url: queryURLTwo,
        method: "GET"
        }).then(function(response) {
            console.log(response);
        });

// }

// $("#submit-btn").on("click", displayHeroInfo);