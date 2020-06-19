//Function to capitalise first character for strings
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function displayHeroInfo() {
    var hero = $("#search-input").val(); 
    var queryURLOne = "https://www.superheroapi.com/api.php/10158163759470734/search/" + hero;
    var queryURLTwo = "https://api.giphy.com/v1/gifs/search?api_key=UZ1q06vU6ySOGMpaTwRtjIXmWHoGeJjg&q=" + hero + "&limit=5&offset=0&rating=G&lang=en";
    //superhero API call
    console.log(hero);
    $.ajax({
        url: queryURLOne,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            // this section will populate the powers-div with the hero's powerstats
            // var chartDiv = $("#chart-div");
            // var powerStats = JSON.stringify(response.results[0].powerstats);
            // var powerPtag = $("<p>").text(powerStats);
            // chartDiv.append(powerPtag);
            // this section will populate the bio-div with the hero's biography
            var bioDiv = $("#bio-div");
            var biography = JSON.stringify(response.results[0].biography);
            var bioPtag = $("<p>").text(biography);
            bioDiv.empty().append(bioPtag);
            // this section will populate the hero-pic 
            var heroArticle = $("#hero-pic");
            var heroPic = response.results[0].image.url;
            var heroImgTag = $("<img>");
            heroImgTag.attr("src", heroPic);
            heroImgTag.attr("alt", "hero image");
            heroArticle.empty().append(heroImgTag);
            // this section will change the hero's name on the page
            var heroPtag = $("#hero-name");
            heroPtag.text(capitalizeFirstLetter(hero));
        
            var intel = response.results[0].powerstats.intelligence
            var strength = response.results[0].powerstats.strength
            var speedd = response.results[0].powerstats.speed
            var dura = response.results[0].powerstats.durability
            var powerr = response.results[0].powerstats.power
            var combatt = response.results[0].powerstats.combat

            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'radar',
            
                // The data for our dataset
                data: {
                    labels: ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat', ],
                    datasets: [{
                        label: 'Attributes',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [intel, strength, speedd, dura, powerr, combatt,]
                    }]
                },
            
                // Configuration options go here
                options: {}
            });
        });
    //giphy API call
    $.ajax({
        url: queryURLTwo,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log('yo');
            var imageUrl = response.data[0].images.original.url;

          // Creating and storing an image tag
            var heroImage = $("<img>");

            // Setting the catImage src attribute to imageUrl
            heroImage.attr("src", imageUrl);
            heroImage.attr("alt", "hero image");

            // Prepending the catImage to the images div
            $("#gif-div").append(heroImage);
        });   
};

$("#submit-btn").on("click", displayHeroInfo);
