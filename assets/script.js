let input = document.querySelector('input');
var userInput = $("#search-input");
var heroArray = [];
// function to pull hero names from .txt file
$(document).ready(function() {
    searchAutoComplete();
});
// this function provides a dropdown autocomplete menu on the search bar
function searchAutoComplete() {
    jQuery.get('assets/heros.txt', function(data) {
        heroArray = data.toLowerCase().split("\n");
        $("#search-input").autocomplete({
            source: heroArray            
        }).focus(function() {
            $(this).autocomplete("search", "");
        });
        // populate gif and info divs with a random character on page load. Pulls from a small set of popular characters
        var startingHeroes = ["iron man", "deadpool", "thor", "spider-man", "wonder woman", "joker", "harley quinn", "nick fury", "black panther", "black widow"];
        displayHeroInfo(startingHeroes[Math.floor(Math.random() * 11)]);
     });
};

function displayHeroInfo(hero) {
    var heroId = (heroArray.indexOf(hero) + 1);
    var queryURLOne = "https://www.superheroapi.com/api.php/10158163759470734/" + heroId;
    var queryURLTwo = "https://api.giphy.com/v1/gifs/search?api_key=UZ1q06vU6ySOGMpaTwRtjIXmWHoGeJjg&q=" + hero + "&limit=5&offset=0&rating=G&lang=en";

    $.ajax({
        url: queryURLOne,
        method: "GET"
        }).then(function(response) {
            var bioDiv = $("#bio-div");
            var biography = response.biography;
            var appearance = response.appearance;
            var connections = response.connections;
            var bioList = $("<ul>").css("list-style-type", "disc").css("list-style-position", "inside").css("margin-left", "10px");
            var fullName = $("<li>").html("<span class='has-text-weight-bold'>Full Name: </span>" + biography["full-name"]);
            var aliases = $("<li>").html("<span class='has-text-weight-bold'>Aliases: </span>" + biography.aliases.join(', '));
            var birthplace = $("<li>").html("<span class='has-text-weight-bold'>Birhtplace: </span>" + biography["place-of-birth"]);
            var height = $("<li>").html("<span class='has-text-weight-bold'>Height: </span>" + appearance.height.join('/'));
            var weight = $("<li>").html("<span class='has-text-weight-bold'>Weight: </span>" + appearance.weight.join('/'));
            var eyes = $("<li>").html("<span class='has-text-weight-bold'>Eye Color: </span>" + appearance["eye-color"]);
            var hair = $("<li>").html("<span class='has-text-weight-bold'>Hair Color: </span>" + appearance["hair-color"]);
            var race = $("<li>").html("<span class='has-text-weight-bold'>Race: </span>" + appearance.race);
            var family = $("<li>").html("<span class='has-text-weight-bold'>Relatives: </span>" + connections.relatives);
            bioList.append(fullName).append(aliases).append(birthplace).append(race).append(height).append(weight).append(eyes).append(hair).append(family);
            bioDiv.empty().append(bioList);
            $("#bio-title").addClass("is-size-4").text("Bio: ");

            // Populate the Publication Div
            var pubDiv = $("#pub-div");
            var pubList = $("<ul>").css("list-style-type", "disc").css("list-style-position", "inside").css("margin-left", "10px");
            var publisher = $("<li>").html("<span class='has-text-weight-bold'>Publisher: </span>" + biography.publisher);
            var firstSeen = $("<li>").html("<span class='has-text-weight-bold'>First Appearance: </span>" + biography["first-appearance"]);
            var teams = connections['group-affiliation'].split(', ');
            if (teams.length > 3) {
                teams = $("<li>").html("<span class='has-text-weight-bold'>Notable Affiliation(s): </span>" + teams.slice(0, 3).join(', '));
            }
            else if (teams == '-') {
                teams = $("<li>").html("<span class='has-text-weight-bold'>Notable Affiliation(s): </span>None");
            }
            else {
                teams = $("<li>").html("<span class='has-text-weight-bold'>Notable Affiliation(s): </span>" + teams.join(', '));
            }
            pubList.append(publisher).append(firstSeen).append(teams);
            pubDiv.empty().append(pubList);
            $("#pub-title").addClass("is-size-4").text("Publication: ")

            // this section will populate the hero-pic 
            var heroArticle = $("#hero-pic");
            var heroPic = response.image.url;
            var heroImgTag = $("<img>");
            heroImgTag.attr("src", heroPic);
            heroImgTag.attr("alt", "hero image");
            heroArticle.empty().append(heroImgTag);
            // this section will change the hero's name on the page
            var heroPtag = $("#hero-name");
            heroPtag.addClass("is-size-4").text(capitalizeFirstLetter(hero));
            // variables for chart
            var intel = response.results[0].powerstats.intelligence
            var strength = response.results[0].powerstats.strength
            var speedd = response.results[0].powerstats.speed
            var dura = response.results[0].powerstats.durability
            var powerr = response.results[0].powerstats.power
            var combatt = response.results[0].powerstats.combat
            // chart settings
            var ctx = document.getElementById('myChart').getContext('2d');
            Chart.defaults.global.defaultFontColor = 'black';
            Chart.defaults.global.defaultFontSize = 16;
            Chart.defaults.global.defaultFontStyle = 'bold';
            Chart.defaults.global.defaultFontFamily = "Walter Turncoat";
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
                        data: [intel, strength, speedd, dura, powerr, combatt,],
                    }]
                },
                // Configuration options go here
                options: {
                    title: {
                            display: true,
                            text: 'Power Stats',
                            fontFamily: "Bangers, cursive",
                            fontSize: 32,
                        },
                        legend : {
                            display: false,
                        },
                    maintainAspectRatio: false,
                    scale: {
                        gridLines: {
                            color: 'black'
                        },
                        angleLines: {
                            color: 'black'
                        },
                    }
                },
            });
        });
    //giphy API call
    $.ajax({
        url: queryURLTwo,
        method: "GET"
        }).then(function(response) {
            for (i=0; i < 3; i++){
            var imageUrl = response.data[i].images.original.url;
            var heroImage = $("<img>");
            heroImage.attr("src", imageUrl);
            heroImage.attr("alt", "hero image");
            $("#gif-div"+i).empty().append(heroImage);
            }
        });   
};

$("#submit-btn").on("click", function() {
        displayHeroInfo(userInput.val().toLowerCase());
        userInput.val('');
});

input.addEventListener("keydown", function (event){
        if (event.keyCode === 13) {
        event.preventDefault();
        displayHeroInfo(userInput.val().toLowerCase());  
        userInput.val('');
    };
});
