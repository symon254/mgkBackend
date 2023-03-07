const express = require("express");
const colors = require("colors");
const dotevn = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDb = require("./Config/db");
const port = process.env.PORT || 5000;

connectDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/movies", require("./Routes/movieRoutes"));
app.use("/api/users", require("./Routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server Started on ${port}`));
