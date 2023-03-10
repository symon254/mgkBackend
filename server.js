const path = require("path");
const express = require("express");
const colors = require("colors");
const dotevn = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDb = require("./Config/db");
const port = process.env.PORT || 5000;

const cors = require("cors");

connectDb();
const app = express();

//use cors
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/movies", require("./Routes/movieRoutes"));
app.use("/api/users", require("./Routes/userRoutes"));

//serve frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../mgk/build")));
    app.get("*", (req, res) =>
        res.sendFile(
            path.resolve(__dirname, "../", "mgk", "build", "index.html")
        )
    );
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server Started on ${port}`));
