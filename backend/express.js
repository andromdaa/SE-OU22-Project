const express = require('express');
const app = express();




// sending a web page
app.get("/", (req, res) => {
   res.sendFile("landingPage.html", {"root": ".."});
});

// listening on this port
app.listen("80", (port) => {
    console.log(`Listening on ${port}`);
})