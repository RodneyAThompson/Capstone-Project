// functions for get and post
// create basic server, post endpoint that recieves the req from front end
// endpoint needs to run handler function in the controller, takes score from body of request
// and add it to an array of scores and sends back array of scores as response
let scores = [];

const highScores = ["120,346", "600, 666", "4,000,000"];

module.exports = {
  postScores: (req, res) => {
    const { scoreToPost } = req.body;
    let score = scoreToPost;
    scores.push(score);
    res.status(200).send(scores);
  },

  highScores: (req, res) => {
    res.status(200).send(highScores);
  },
};
