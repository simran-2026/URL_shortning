const express = require('express');
const path= require('path');
const staticRoute = require("./routes/staticrouter");
const {connectMongodb}  = require("./connect");
const URL = require("./models/url");
const urlRoute = require("./routes/URL.JS");

const app = express();

const port = 8002 ;

connectMongodb("mongodb://localhost:27017/short-url").then(()=> console.log("connectedto mongodb"));

app.set("view engine", "ejs");
app.set("views",path.resolve("./veiws"));



app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use ("/url", urlRoute);
app.use("/", staticRoute);

app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } }
        );

        if (!entry) {
            return res.status(404).send('Short URL not found');
        }

        res.redirect(entry.redirectURL);
    } catch (err) {
        console.error('Redirect error:', err);
        res.status(500).send('Server error');
    }
});



 app.listen(port,()=> console.log(`server is running on ${port}`));
 
