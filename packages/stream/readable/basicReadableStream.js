const { Readable } = require("stream");

const readableStream = new Readable({
  read(size) {
    this.push("Hello, ");
    this.push("World!");
    this.push(null); // indicates there is no more data
  },
});

readableStream.on("data", (chunk) => {
  console.log(`Recieved chunk: ${chunk}`);
});

readableStream.on("end", () => {
  console.log("Stream ended!");
});

readableStream.on("error", (err) => {
  console.log(`Stream error: ${err.message}`);
});
