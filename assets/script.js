//requires jQuery
var hero = "superman"
var queryURLOne = "https://www.superheroapi.com/api.php/10158163759470734/search/" + hero;
var queryURLTwo = "https://api.giphy.com/v1/gifs/search?api_key=UZ1q06vU6ySOGMpaTwRtjIXmWHoGeJjg&q=" + hero + "&limit=5&offset=0&rating=G&lang=en";

$.ajax({
    url: queryURLOne,
    method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log("test1");
      });

$.ajax({
    url: queryURLTwo,
    method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log("test2");
      });