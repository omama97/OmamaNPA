const express = require("express");
const router = express.Router(); // create a new router object in your program to handle requests.
const urllib = require("urllib");

const teamToIDs = {
  lakers: "1610612747",
  warriors: "1610612744",
  heat: "1610612748",
  suns: "1610612756",
};

urllib.request(
  `http://data.nba.net/10s/prod/v1/2018/players.json`,
  function (err, data, response) {
    parsedTeamData = JSON.parse(data).league.standard;
  }
);
//parameterised rout
// player ?playerId=value
router.get("/teams/:teamName", (req, res) => {
  const param = req.params.teamName;
  let result = parsedTeamData
    .filter((team) => team.teamId === teamToIDs[param] && team.isActive)
    .map((t) => {
      //return spisific data
      return {
        firstName: t.firstName,
        lastName: t.lastName,
        jersey: t.jersey,
        pos: t.pos,
      };
    });

  res.send(result);
});

module.exports = router;
