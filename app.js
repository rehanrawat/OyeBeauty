const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/movieDB");
app.set("view engine", "ejs");

const movieSchema = {
    title: String
}

const Movie = mongoose.model("Movie", movieSchema);

app.post("/add-movie", function(req, res){
    const newMovie = new Movie({
        title: req.body.title
    });
    newMovie.save();
});

app.get("/get-all", function(req, res){
   Movie.find(function(err, foundMovies){
    if(!err){
        res.send(foundMovies);
    }else{
        res.send(err);
    }
     
   })
});

app.get("/get-single/:movieTitle", function(req, res){
    Movie.findOne({title: req.params.movieTitle}, function(err, foundMovie){
        if(foundMovie){
            res.send(foundMovie);
        }else{
            res.send(err);
        }
    });
})

app.get("/get-paginated/:page/:10", function(req, res){
   const page = parseInt(req.params.page);
   const limit = 10;

   Movie.find({})
    .skip(page*limit)
    .limit(limit)
    .exec(function(err, foundMovies){
        if(!err){
            res.send(foundMovies);
        }else{
            res.send(err);
        }
    });
});

app.listen(3000, function(){
    console.log("Server Started");
});
