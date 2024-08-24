const fs = require("fs");

// Create a writable stream to a file named 'output.txt'
const writableStream = fs.createWriteStream("output.txt", { flags: "a" });

// Write some data to the stream
writableStream.write("Hello, world!\n");
writableStream.write("This is a second line of text.\n");
writableStream.write("And here is the third line.\n");

// Mark the end of the file
writableStream.end("This is the end of the file.\n");

// Handle the 'finish' event to know when the file is fully written
writableStream.on("finish", () => {
  console.log("All data has been written to the file.");
});

// Handle any errors during the writing process
writableStream.on("error", (err) => {
  console.error("Error writing to file:", err);
});
