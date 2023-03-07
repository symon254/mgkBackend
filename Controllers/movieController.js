const asyncHandler = require("express-async-handler");
const { globalAgent } = require("http");
const Movie = require("../Models/movieModel");
const User = require("../Models/userModel");

//@des get movies
//@route GET /api/movies
//@access private
const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({ user: req.user.id });

    res.status(200).json(movies);
});

//@des create movies
//@route POST /api/movies
//@access private
const createMovie = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("please fill the text field");
    }

    const movie = await Movie.create({
        text: req.body.text,
        user: req.user.id,
    });

    res.status(201).json(movie);
});

//@des update movies
//@route PUT /api/movies:id
//@access private
const updateMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(400);
        throw new Error("movie not found");
    }

    const user = await User.findById(req.user.id);
    //check for user
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (movie.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );

    res.status(200).json(updatedMovie);
});

//@des delete movies
//@route DELETE /api/movies:id
//@access private
const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(400);
        throw new Error("Movie not found");
    }

    const user = await User.findById(req.user.id);
    //check for user
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (movie.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await Movie.findByIdAndDelete(req.params.id);

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
};
