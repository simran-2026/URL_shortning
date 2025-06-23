const express = require('express');
const path= require('path');
const cookieParser = require('cookie-parser');
const {connectMongodb}  = require("./connect");
const{restrictToLoggedinUserOnly, checkAuth}= require('./middleware/auth');


const URL = require("./models/url");




const urlRoute = require("./routes/url.js");
const staticRoute = require("./routes/staticrouter");
const userRoute = require("./routes/user");



const app = express();
const port = 8002 ;

connectMongodb("mongodb://localhost:27017/short-url").then(()=> console.log("connectedto mongodb"));

app.set("view engine", "ejs");
app.set("views",path.resolve("./veiws"));



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/", cookieParser());

// app.get("/test",async(req,res)=>{
//     const allurls = await URL.find({});
//         return res.render("home",{

//             urls: allurls,



//         });
    
// });


app.use ("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/",  checkAuth, staticRoute);
app.use("/user",userRoute);
// app.get('/:shortId', async (req,res) => {
//     const shortId = req.params.shortId;
//     const entry = await URL.findOneAndUpdate(
//         {
//         shortId, },
//         {
//             $push: {
//             visitHistory:  {timestamp: Date.now()},
//         },
//         } 
//    );
//     res.redirect(entry.redirectURL);
// })

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
 