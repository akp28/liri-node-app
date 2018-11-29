require("dotenv").config();

var keys = require("./keys");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var nodeArgs = process.argv;
var args1 = process.argv[2];
var args2 = process.argv.slice(3).join(" ");

    if (args1 === "movie-this"){
        var movieName = args2;
        funcMovie(movieName);
    }else if(args1 === "spotify-this-song"){
        var songName= "";
        console.log("args2" + args2)
        if (args2 === ""){
            songName = "The Sign";
            console.log("if songName: " + songName);
        }else {
            songName += args2;
        }
        funcSpotify(songName);
    }else if (args1 === "concert-this"){
        var artist = args2;
        funcConcert(artist);
        
    }else if (args1 === "do-what-it-says"){
        fs.readFile("random.txt", "utf8", function(error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
            return console.log(error);
            }
            // We will then print the contents of data
            // console.log(data);
            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
            console.log("dataArr: " + dataArr);
            // We will then re-display the content as an array for later use
            if (dataArr[0] === "spotify-this-song"){
                funcSpotify(dataArr[1]);
            }else if (dataArr[0] === "movie-this"){
                funcMovie(dataArr[1]);
            }else if (dataArr[0] === "concert-this"){
                // console.log("concert:" +dataArr[1]);
                funcConcert(dataArr[1]);
            }
                
        });
    }

function funcSpotify(songName){
    var songName = songName;
    var spotify = new Spotify(keys.spotify);
      spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, response) {
        // console.log(response.tracks.items[0]);
        console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
        console.log("The song's name: " + response.tracks.items[0].name);
        console.log("A preview link of the song from Spotify: " + response.tracks.items[0].external_urls.spotify);
        console.dir("The album that the song is from: " + response.tracks.items[0].album.name);
      });
}

function funcMovie(movieName){
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";
// This line is just to help us debug against the actual URL.
// console.log(queryUrl);
    axios.get(queryUrl).then(
    function(response) {
        var axiosResponse= response.data.Response;
        // console.dir("response: " + JSON.stringify(response));
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
}

function funcConcert(artist){
    var bandqueryUrl= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(bandqueryUrl).then(
            function(response) {
                console.log("Name of the venue: " + response.data[0].venue.name);
                console.log("Venue location: " + response.data[0].venue.city + "," + response.data[0].venue.region);
                var date = response.data[0].datetime.slice(0,10);
                console.log("Date of the Event: " + moment(date).format("MM/DD/YYYY"));
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
}