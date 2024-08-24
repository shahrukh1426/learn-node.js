const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;
const pdfPath = path.join(__dirname, "sample.pdf");

app.use(cors());

app.get("/pdf", (req, res) => {
  const range = req.headers.range;

  if (range) {
    const stat = fs.statSync(pdfPath);
    const fileSize = stat.size;
    const [start, end] = range.replace(/bytes=/, "").split("-");
    const startByte = parseInt(start, 10);
    const endByte = end
      ? parseInt(end, 10)
      : Math.min(startByte + 999999, fileSize - 1);

    res.writeHead(206, {
      "Content-Range": `bytes ${startByte}-${endByte}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": endByte - startByte + 1,
      "Content-Type": "application/pdf",
    });

    const stream = fs.createReadStream(pdfPath, {
      start: startByte,
      end: endByte,
    });
    stream.pipe(res);
  } else {
    res.sendStatus(416); // Range Not Satisfiable
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
