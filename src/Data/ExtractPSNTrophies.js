import { exchangeCodeForAccessToken, exchangeNpssoForCode, getTitleTrophies, getUserTitles, makeUniversalSearch } from "psn-api";
import { writeFile } from "fs";


async function ExtractPSNTrophies(name){

    const accessCode = await exchangeNpssoForCode(Npsso);
    console.log("accessCode");
    const authorization = await exchangeCodeForAccessToken(accessCode);
    console.log("authorization");

    const user = await makeUniversalSearch(authorization, name, "SocialAllAccounts");
    console.log("UniSearch");

    const accountId = user.domainResponse[0].results[0].socialMetadata.accountId;

    const userTitles = await getUserTitles(authorization, accountId);
    console.log("userTitles");

    return userTitles;
    
    let games = [];

    for (title.trophieTitles in userTitles){
        const userGameTrophies = await getUserTrophiesEarnedForTitle(authorization, accountId, userGame.npCommunicationId);
        const titleTrophies = await getTitleTrophies(authorization, userGame.npCommunicationId, "all", {npServiceName: "trophy"});

        game = [];
        game.append(title);




        games.append(game);
    }

    return games;
}

let result = ExtractPSNTrophies("FeonixKing");

writeFile("userTitles.json", result, (err) => {
    if (err) throw err;
})