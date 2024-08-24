const { Readable } = require("stream");

class LogGenerator extends Readable {
  constructor(options) {
    super(options);
    this.logCount = 0;
  }

  _read(size) {
    // Simulate log generation
    if (this.logCount < 10) {
      this.logCount++;
      const logEntry = `Log entry ${
        this.logCount
      } at ${new Date().toISOString()}\n`;
      this.push(logEntry);
    } else {
      this.push(null); // End the stream after 10 entries
    }
  }
}

// Create an instance of the log generator stream
const logStream = new LogGenerator();

// Pipe the log stream to the standard output
logStream.pipe(process.stdout);

logStream.on("data", (chunk) => {
  console.log(`Received log: ${chunk}`);
});

logStream.on("end", () => {
  console.log("Log streaming ended.");
});
