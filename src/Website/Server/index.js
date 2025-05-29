import ExtractSteamAchievements from "./ExtractSteamAchievements.js";
import ExtractPSNTrophies from "./ExtractPSNTrophies.js";
import express from "express"
import {getGames, putGames}  from "./Storage.js"

const PORT = process.env.PORT || 3001;

const app  = express();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

app.get("/test", async function(req, res) {
    const result = await ExtractSteamAchievements("76561198334529069");
    res.json(result);
})

app.get("/test2", async function(req, res) {
    const result = await ExtractPSNTrophies("FeonixKing");
    res.json(result);
})

app.get("/SteamGames/:userName", async function(req, res) {
    try{
        var result = await getGames(req.params.userName);
        if (result == null){
            result = await putGames(req.params.userName, ExtractSteamAchievements);
        }
        res.json(result);
    } catch {
        res.json({ Error: "Invalid UserName" });
    }
})

app.get("/PSNGames/:userName", async function(req, res) {
    var result = await getGames(req.params.userName);
    if (result == null){
        result = await putGames(req.params.userName, ExtractPSNTrophies);
    }
    res.json(result);
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  