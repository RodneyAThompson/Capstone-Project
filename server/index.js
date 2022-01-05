// require express anything i need for the server
// write a function that takes the score, front end needs to write a function
// that takes the score from
// the front end when the button is clicked and sends the curent value
// of the score on the bod of a post req
// build out server
const cors = require("cors");
const express = require("express");

const app = express();

const controller = require("./controller.js");

app.use(cors());
app.use(express.json());

app.get("/api/highscore", controller.highScores);
app.post("/api/space", controller.postScores);

app.listen(6969, () => console.log("youre in galaxy 6969"));
