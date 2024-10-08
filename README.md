# Achievement-Tracker
 A tracking App that you can track all achievements for different Consoles.

Guide to using the achievement-tracker

Set-up
1. Clone the repository
2. Install node.js v20.15.1 or higher
3. Navigate to the repositer in a terminal
4. Navigate to src/Website/achievement-tracker from the root directory
5. run NPM i to download the dependencies

To use this app you will need the API key for each of the platforms you want to look at their achievements.

Acquiring a Steam API Key
1. Log into your Steam account in a Browser
2. Click on the following link & follow the directions: https://steamcommunity.com/dev/apikey
3. After getting the Steam API Key, copy the value and navigate to the file: ExtractSteamAchievements.js by following this path from the root direction (src/Website/Server)
4. Paste the value inside of quotation marks in the Steamley variable on line 3.

Acquiring a PSN Key
1. Log into your PSN account in a Browser
2. Click on the following link: https://ca.account.sony.com/api/v1/ssocookie
3. After getting the PSN API Key, copy the value and navigate to the file: ExtractPSNAchievements.js by following this path from the root direction (src/Website/Server)
4. Paste the value inside of quotation marks in the Npsso variable on line 4.

Running the Application
1. In a terminal in the root directory run NPM start.
2. In another terminal Navigate to src/Website/achievement-tracker and run NPM start.
3. In a browser navigate to localhost:3000  to look at your achievements. 
