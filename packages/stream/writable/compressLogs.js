const fs = require("fs");
const zlib = require("zlib");
const { Readable } = require("stream");

// Create a writable stream to a compressed log file
const logFile = fs.createWriteStream("logs.gz");

// Create a gzip transform stream to compress the data
const gzip = zlib.createGzip();

// Simulate a readable stream of incoming data
const MAX_CHUNKS = 10; // Define a limit to the number of data chunks
let chunksGenerated = 0;

const incomingDataStream = new Readable({
  read(size) {
    // Stop generating data after MAX_CHUNKS
    if (chunksGenerated >= MAX_CHUNKS) {
      this.push(null); // Signal the end of the stream
    } else {
      chunksGenerated++;
      const data = `Data chunk ${chunksGenerated}\n`;
      console.log(`Generating: ${data.trim()}`);
      this.push(data);
    }
  },
});

// Pipe the incoming data stream into the gzip stream, then into the log file
incomingDataStream.pipe(gzip).pipe(logFile);

// Handle the 'finish' event when writing is complete
logFile.on("finish", () => {
  console.log("All data has been compressed and written to logs.gz");
});

// Handle any errors during the streaming process
logFile.on("error", (err) => {
  console.error("Error writing to compressed log file:", err);
});

gzip.on("error", (err) => {
  console.error("Error during compression:", err);
});
