import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function putGames(accName, extractFunc) {
    var result = null;

    try {

      await client.connect();

      var mydb = await client.db("AchievementTracker");

      result = await extractFunc(accName);

      console.log("Successfully retrieved Games");

      var myObject = {name: accName, info: result};
      await mydb.collection("UserGames").insertOne(myObject);

      console.log("Successfully added Games");
    } finally {
      await client.close();
      return result;
    }
}

async function getGames(accName){
  var result = null;
  try {

    await client.connect();

    var mydb = await client.db("AchievementTracker");

    var results = await mydb.collection("UserGames").findOne({name: accName});

    result = results.info;

  } finally {
    await client.close();
    return result;
  }
}

export {putGames, getGames};