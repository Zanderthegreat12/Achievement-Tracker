

function AchievementList({game, trophy}){

    const AchieveList = game.map((achieve) =>
        <div className="GameOverview">
            <div className={earned(achieve.earned)}>
            <div className="achievePercentParent">
            <div className="achieveSect">
                <img src={achieve.trophyIcon} width="100px"></img>
            </div>
            </div>
            <div className="achieveDescription">
                <h4>{achieve.trophyName}</h4>   
                <p>{achieve.trophyDetail}</p>
            </div>
            <div className="achievePercentParent">
            <div className="achieveTime">
                <p>{convertDate(achieve.earnedDate)}</p>
            </div>
            </div>
            {displaytrophies(trophy,achieve)}
            <div className="achievePercentParent">
            <div className="achievePercentChild">
                <p>{Math.round(achieve.trophyEarnedRate*10)/10}%</p>
            </div>
            </div>
            </div>
        </div>);

    return(
        <div>{AchieveList}</div>
    )
}

function displaytrophies(trophies, achieve){
    if (trophies){
        return (<div className="achievePercentParent"> 
            <div className="achieveSect">
                <img src={determineRare(achieve.trophyType)}  width="75px"></img>
            </div>
            </div>)
    } else {
        return ;
    }
}


function determineRare(Trophytype){
    if(Trophytype === "bronze"){
        return "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-bronze.png?url=/assets/trophies/antman-trophy-bronze.png&w=3840&q=100";
    } else if (Trophytype === "silver"){
        return "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-silver.png?url=/assets/trophies/antman-trophy-silver.png&w=3840&q=100";
    } else if (Trophytype === "gold"){
        return "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-gold.png?url=/assets/trophies/antman-trophy-gold.png&w=3840&q=100";
    } else {
        return "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-platinum.png?url=/assets/trophies/antman-trophy-platinum.png&w=3840&q=100";
    }
}

function earned(isEarned){
    if(isEarned){
        return "achieveChildEarned";
    } else {
        return "achieveChildUnearned";
    }
}
function convertDate(date){
    if (date !== undefined && date !== ""){
    const achievedate = new Date(date);
    let achieveDateString = achievedate.toString();
    let achieveDateArray = achieveDateString.split(" ");
    let time = achievedate.toLocaleTimeString("en-us")
    return achieveDateArray[1] + ", " + achieveDateArray[2] + " " + achieveDateArray[3] + " " + time;
    }
    return ""
}

export default AchievementList;