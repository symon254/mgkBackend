const express = require("express");
const router = express.Router();
const {
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
} = require("../Controllers/movieController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getMovies).post(protect, createMovie);
router.route("/:id").put(protect, updateMovie).delete(protect, deleteMovie);

module.exports = router;
