import * as fs from 'fs';

const steamKey = "";

async function ExtractSteamAchievements(steamId){

    const UserGames = await fetch("http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key="+ steamKey+"&steamid="+steamId+"&include_appinfo=true&include_played_free_games=true&format=json")
                    .then(UserGames => {return UserGames.json()});

    let games = [];    

    for(const userGame of UserGames.response.games){
        
        const GameSchema = await fetch("https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?appid="+userGame.appid+"&key=" + steamKey)
            .then(GameSchema => {return GameSchema.json()});
          
            
        const AchievePercent = await fetch("https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=" + userGame.appid)
            .then(AchievePercent => {return AchievePercent.json()});
           

        if(Object.keys(AchievePercent).length !== 0 && AchievePercent.achievementpercentages.achievements.length !== 0){

            const PlayerAchieve = await fetch("https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key="+steamKey+"&steamid="+steamId+"&appid=" + userGame.appid)
                .then(PlayerAchieve => {return PlayerAchieve.json()});
                

            const GameInfo = await fetch("https://store.steampowered.com/api/appdetails?appids="+ userGame.appid)
                .then(GameInfo => {return GameInfo.json()})
               

            let gameAchievements = [];

            let totalAchieve = 0;
            let mostRecentAchieve = 0;


            for (const achieve of GameSchema.game.availableGameStats.achievements){

                const singleAchievePercent = AchievePercent.achievementpercentages.achievements.find(
                    (t) => achieve.name === t.name);

                const singlePlayerAchieve = PlayerAchieve.playerstats.achievements.find(
                    (t) => achieve.name === t.apiname);


                let achieved = false;
                let date = "";
                if (singlePlayerAchieve.achieved === 1){
                    achieved = true;
                    date = new Date(Number(singlePlayerAchieve.unlocktime) * 1000).toISOString();
                    totalAchieve++;
                }

                if (Number(singlePlayerAchieve.unlocktime) * 1000 > mostRecentAchieve){
                    mostRecentAchieve = Number(singlePlayerAchieve.unlocktime)* 1000;
                }

                
                gameAchievements.push({
                    trophyName: achieve.displayName,
                    trophyDetail: achieve.description,
                    trophyIcon: achieve.icon,
                    trophyIconGray: achieve.icongray,
                    trophyEarnedRate: singleAchievePercent.percent,
                    earned: achieved,
                    earnedDate: date
                })
            }
                if (mostRecentAchieve !== 0){
                let percentage = Math.floor(totalAchieve / Number(GameSchema.game.availableGameStats.achievements.length) * 100);

                let name = GameInfo[userGame.appid].data.name;
                let url = GameInfo[userGame.appid].data.header_image;

                const GameDate = new Date(mostRecentAchieve);

                let gameInfo = []
                gameInfo.push({
                    trophyTitleName: name,
                    trophyTitleIconUrl: url,
                    numAchievements: GameSchema.game.availableGameStats.achievements.length,
                    numAchievementsEarned: totalAchieve,
                    totalPlaytime: userGame.playtime_forever,
                    progress: percentage,
                    lastUpdatedDateTime: GameDate
                })

                gameInfo.push(gameAchievements);
                games.push(gameInfo);
            }
        }

    }

    return games;
}

let result = await ExtractSteamAchievements("76561198334529069");

fs.writeFile("SteamGames.json", JSON.stringify(result), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
    }
  });