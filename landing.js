const getHighScore = (event) => {
  console.log("getHighScore");
  axios.get("http://localhost:6969/api/highscore").then(function (response) {
    const highScoresContainer = document.getElementById("highScoresContainer");
    console.log(response.data);
    for (let i = 0; i < response.data.length; i++) {
      const highScore = document.createElement("li");
      highScore.innerText = response.data[i];
      console.log(highScore);
      highScoresContainer.appendChild(highScore);
    }
  });
};

const highScoresBtn = document.getElementById("highscoresbtn");
highScoresBtn.addEventListener("click", getHighScore);
