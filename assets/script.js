//Function to capitalise first character for strings
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function displayHeroInfo() {
    var hero = $("#search-input").val(); 
    var queryURLOne = "https://www.superheroapi.com/api.php/10158163759470734/search/" + hero;
    var queryURLTwo = "https://api.giphy.com/v1/gifs/search?api_key=UZ1q06vU6ySOGMpaTwRtjIXmWHoGeJjg&q=" + hero + "&limit=5&offset=0&rating=G&lang=en";

    // Set Background of info divs
    var backgroundColors = [];


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
            var biography = response.results[0].biography;
            var appearance = response.results[0].appearance;
            var connections = response.results[0].connections;
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
            console.log(teams)
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
            var heroPic = response.results[0].image.url;
            var heroImgTag = $("<img>");
            heroImgTag.attr("src", heroPic);
            heroImgTag.attr("alt", "hero image");
            heroArticle.empty().append(heroImgTag);
            // this section will change the hero's name on the page
            var heroPtag = $("#hero-name");
            heroPtag.addClass("is-size-4").text(capitalizeFirstLetter(hero));
        
            var intel = response.results[0].powerstats.intelligence
            var strength = response.results[0].powerstats.strength
            var speedd = response.results[0].powerstats.speed
            var dura = response.results[0].powerstats.durability
            var powerr = response.results[0].powerstats.power
            var combatt = response.results[0].powerstats.combat

            var ctx = document.getElementById('myChart').getContext('2d');
            Chart.defaults.global.defaultFontColor = 'black';
            Chart.defaults.global.defaultFontSize = 12;
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
                    maintainAspectRatio: false,
                    scale: {
                        gridLines: {
                            color: 'black'
                        },
                        angleLines: {
                            color: 'black'
                        }
                    }
                    
                }
            });

        });
    //giphy API call
    $.ajax({
        url: queryURLTwo,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log('yo');
            for (i=0; i < 3; i++){
            var imageUrl = response.data[i].images.original.url;

          // Creating and storing an image tag
            var heroImage = $("<img>");

            // Setting the catImage src attribute to imageUrl
            heroImage.attr("src", imageUrl);
            heroImage.attr("alt", "hero image");

            // Prepending the catImage to the images div
            $("#gif-div"+i).empty().append(heroImage);
            $("#gif-div").empty().append(heroImage);
            $("#gif-div").empty().append(heroImage);
            }

        });   
};

$("#submit-btn").on("click", displayHeroInfo);
