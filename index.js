const express = require('express');
const {connectMongodb}  = require("./connect");
const URL = require("./models/url");
const urlRoute = require("./routes/URL.JS");

const app = express();

const port = 8002 ;

connectMongodb("mongodb://localhost:27017/short-url").then(()=> console.log("connectedto mongodb"));




app.use(express.json());




app.use ("/url", urlRoute);

app.get('/:shortId', async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
        shortId, },
        {
            $push: {
            visitHistory:  {timestamp: Date.now()},
        },
        } 
   );
    res.redirect(entry.redirectURL);
})


 app.listen(port,()=> console.log(`server is running on ${port}`));
 