import * as PSNapi from "psn-api";
import * as fs from 'fs';


const Npsso = "qk947pBjP2VF3G29ZJ8Eyz1VjZ2Vq2ozWX5J6uXv2LAx6UotI4soDsipKhb6XA9m"

async function ExtractPSNTrophies(name){

    const accessCode = await PSNapi.exchangeNpssoForCode(Npsso);
    const authorization = await PSNapi.exchangeCodeForAccessToken(accessCode);

    const user = await PSNapi.makeUniversalSearch(authorization, name, "SocialAllAccounts");
    const accountId = user.domainResponses[0].results[0].socialMetadata.accountId;
    const userTitles = await PSNapi.getUserTitles(authorization, accountId);

  
    let games = [];

    for (const userGame of userTitles.trophyTitles){

        const userGameTrophies = await PSNapi.getUserTrophiesEarnedForTitle(authorization, accountId, userGame.npCommunicationId, "all", {npServiceName: "trophy"});
        const titleTrophies = await PSNapi.getTitleTrophies(authorization, userGame.npCommunicationId, "all", {npServiceName: "trophy"});

        let game = [];
        game.push(userGame);

        let trophies = []
        for (const trophy of titleTrophies.trophies){
          let JsonTrophy = [];
          
          const usertrophy = userGameTrophies.trophies.find(
            (t) => trophy.trophyId === t.trophyId
          )
          JsonTrophy.push({
            earned: usertrophy.earned ??  false,
            earnedDate: usertrophy.earned ? trophy.earnedDateTime : "unearned".earnedDateTime,
            trophyType: usertrophy.trophyType,
            trophyRare: usertrophy.trohpyRare,
            trophyEarnRate: usertrophy.trophyEarnRate,
            trophyName: trophy.trophyName,
            trophyDetail: trophy.trophyDetail,
            trophyIcon: trophy.trophyIconUrl
          })
            trophies.push(JsonTrophy);

        }

        game.push(trophies);
        games.push(game);
    }

    return games;
}

let result = await ExtractPSNTrophies("FeonixKing");

fs.writeFile("games.json", JSON.stringify(result), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
    }
  });