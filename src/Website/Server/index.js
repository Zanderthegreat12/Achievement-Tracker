//import ExtractPSNTrophies from "../achievement-tracker/src/Data/ExtractPSNTrophies.js";
import ExtractSteamAchievements from "./ExtractSteamAchievements.js";
import ExtractPSNTrophies from "./ExtractPSNTrophies.js";
import express from "express"


//const Steam = require("./ExtractSteamAchievements.js")

//const express = require("express");

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
        const result = await ExtractSteamAchievements(req.params.userName)
        res.json(result);
    } catch {
        res.json({ Error: "Invalid UserName" });
    }
})

app.get("/PSNGames/:userName", async function(req, res) {
    const result = await ExtractPSNTrophies(req.params.userName);
    res.json(result);
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  