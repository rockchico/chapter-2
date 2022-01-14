const express = require("express");
const fs = require('fs');

const app = express();


if(!process.env.PORT) {
    throw new Error("Por favor especifique o número da porta atrvés da variável de ambiente PORT.");
}

const PORT = process.env.PORT;


app.get("/video", (req, res) => {

    //
    // Original video from here:
    // https://sample-videos.com
    //
    const path = "../videos/SampleVideo_1280x720_1mb.mp4";
    fs.stat(path, (err, stats) => {
        if (err) {
            console.error("An error occurred ");
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4",
        });
        fs.createReadStream(path).pipe(res);
    });
});

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`123 Microservice listening on port ${PORT}, point your browser at http://localhost:${PORT}/video`);
});  