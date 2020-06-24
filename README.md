# Super Hero Stats
[Super Hero Search]( https://tsgrewing.github.io/Superhero-Search/)

## Description
An app for users to search for a super hero and be given the hero's basic information, a chart of their stats, and an assortment of gifs based on their name.

## Demo
!(Demo gif)[assets/images/superdemo.gif]

## User Story
As a fan of fictional characters, I want to be able to search for characters from multiple different publishers and be given information on the character, along with related gifs.

## Development
APIs to be used: superheroAPI, GIPHY, and Chart.js<br>
We ran into a few issues that we had to deal with during the development process.<br>
Because of the way the superheroAPI performs searches we had to switch from searching by name to using the user's input to search an array of characters to get the index of the character that was searched for and then use that information to call the api with a character id.<br> 
Initially we had planned on adding in a "random character button" but decided against it after finding several characters with little or no information or appropriate gifs. <br>
If the database was updated with more hero information we could add that feature, but it just didn't make sense to keep it with the current state of things.<br>
The layout also changed from our initial plans, after experimenting with the tile system in Bulma we decided to lay the page out more like a comic book page than our inital idea of 3 blocks, one for each api.
<br>
Thanks to ftourini on DeviantArt for the old stock paper image used to the backgrounds. [ftourni on DeviantArt](https://www.deviantart.com/ftourini/art/old-paper-stock-02-256716612)
