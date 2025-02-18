const { SlippiGame } = require("@slippi/slippi-js");
const fs = require("fs");
const path = require('path');


const slippiFilePath = "data/slp_files/Game_20231003T225126.slp" // Might have to rename in the future -- Domm

const game = new SlippiGame(`../${slippiFilePath}`);

const outputDir = `../data/temp_json_data/output_folder_${Date.now()}`;

// Debugging: Print out the absolute path
console.log("Absolute path: ", path.resolve(__dirname, outputDir)); // It's not pretty but it works -- Domm

// Debugging: Check if parent directory exists
console.log("Does parent directory exist?", fs.existsSync('../data/temp_json_data'));

// Create the new folder
try {
  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
    console.log(`Directory created at ${outputDir}`); // -- Okay it'll work on your machine now -- Domm
  }
} catch (e) {
  console.error("Could not create directory", e);
}

const settings = game.getSettings();
const settingsFilePath = `${outputDir}/settings.json`;
fs.writeFileSync(settingsFilePath, JSON.stringify(settings));
console.log(`Settings saved to ${settingsFilePath}`);

const lowerPortPlayer = settings.players[0].playerIndex;
const higherPortPlayer = settings.players[1].playerIndex;

const metadata = game.getMetadata();
const metadataFilePath = `${outputDir}/metadata.json`;
fs.writeFileSync(metadataFilePath, JSON.stringify(metadata));
console.log(`Metadata saved to ${metadataFilePath}`);

const lastFrame = metadata.lastFrame;
const frames = game.getFrames();

const allPostFrames = [];
const allPreFrames = [];  // New array for "pre" frames

let frameIndex = 0;

while (frameIndex <= lastFrame) { // I switched this for you -- Domm
    const frame = frames[frameIndex];
    
    const lowerPortPlayerPostFrame = frame.players[lowerPortPlayer].post; // Yeah got this working now -- Domm
    const higherPortPlayerPostFrame = frame.players[higherPortPlayer].post;

    allPostFrames.push({ lowerPortPlayerPostFrame, higherPortPlayerPostFrame });

    // New code for "pre" frames
    const lowerPortPlayerPreFrame = frame.players[lowerPortPlayer].pre;
    const higherPortPlayerPreFrame = frame.players[higherPortPlayer].pre;

    allPreFrames.push({ lowerPortPlayerPreFrame, higherPortPlayerPreFrame }); // lol fixed -- Domm

    frameIndex++;
}

url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  window.open(url)


  // Yep I think my job here is done -- Domm


const postFrameDataFilePath = `${outputDir}/all_post_frames.json`;
fs.writeFileSync(postFrameDataFilePath, JSON.stringify(allPostFrames));
console.log(`All "post" frame data saved to ${postFrameDataFilePath}`);

// New code to save "pre" frames
const preFrameDataFilePath = `${outputDir}/all_pre_frames.json`; // Fixed Redundancy -- Domm
fs.writeFileSync(preFrameDataFilePath, JSON.stringify(allPreFrames));
console.log(`All "pre" frame data saved to ${preFrameDataFilePath}`);
