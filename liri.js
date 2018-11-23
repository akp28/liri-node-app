require("dotenv").config();

var Spotify = require('node-spotify-api');
// var bandsintown = require('bandsintown')(APP_ID);
// var omdbLoad = require('omdb');
var axios = require("axios");

var nodeArgs = process.argv;

if (process.argv[2] === "movie-this"){
// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];

  }
}

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";

// This line is just to help us debug against the actual URL.
// console.log(queryUrl);
axios.get(queryUrl).then(
  function(response) {
    var axiosResponse= response.data.Response;
    if(axiosResponse === "True"){
    console.log("Title of the movie: " + response.data.Title);
    console.log("Year the movie came out: " + response.data.Year);
    console.log("IMDB Rating of the movie: " + response.data.Ratings[0].Value);
    console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
    console.log("Country where the movie was produced: " + response.data.Country);
    console.log("Language of the movie: " + response.data.Language);
    console.log("Plot of the movie: " + response.data.Plot);
    console.log("Actors in the movie: " + response.data.Actors);
    } else{
        console.log(response.data.Error);
    }
  }).catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("error" +error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}else{
    console.log("whatever ");
}
