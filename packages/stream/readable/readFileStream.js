const fs = require("fs");

const readableStream = fs.createReadStream("sample.txt", {
  encoding: "utf8",
  highWaterMark: 1 * 1024,
});

readableStream.on("data", (chuck) => {
  console.log("Recieved Chunk:- ", chuck);
});

readableStream.on("end", () => {
  console.log("End");
});

readableStream.on("error", (error) => {
  console.log("error", error.message);
});
