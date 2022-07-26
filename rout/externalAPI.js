const express = require("express");
const router = express.Router();
const axios = require("axios");

const teamToIDs = {
  lakers: "1610612747",
  warriors: "1610612744",
  heat: "1610612748",
  suns: "1610612756",
};

let parsedTeamData = {};

axios
  .get(`http://data.nba.net/10s/prod/v1/2018/players.json`)
  .then(function (res) {
    const teamData = res.data.league.standard;
    console.log(teamData);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

router.get("/teams/:teamName", (req, res) => {
  const param = req.params.teamName;
  let result = parsedTeamData
    .filter((team) => team.teamId === teamToIDs[param] && team.isActive)
    .map((t) => {
      return {
        firstName: t.firstName,
        lastName: t.lastName,
        jersey: t.jersey,
        pos: t.pos,
      };
    })
    .filter((t) => !["5", "00", "0", "55", "32", "10"].includes(t.jersey));
  res.send(result);
});

router.put("/team/", (req, res) => {
  const team = req.body;

  teamToIDs[team.teamName] = team.teamId;

  res.send(teamToIDs);
});

module.exports = router;
