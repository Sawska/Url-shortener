const express = require("express")
const dotenv = require("dotenv");
const dbOperations = require("./server-files/dbOperations")
const urlOperations = require("./server-files/operationsWithUrl")
const bodyParser = require("body-parser")

const app = express();


dotenv.config();

app.set("view engine","ejs");

app.set("views","views");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json())

app.get("/",(req,res) => {
    res.render("main");
})

app.post("/CreateLink",async (req,res) => {
    const url = req.body.url;
    try {
     urlOperations.checkIfUrlIsValid(url)
    const shortLink = await dbOperations.postUrl(url);
    res.render("shortUrl", {shortLink});
    } catch(err) {
        console.log(err)
        res.render("badUrl");
    }
})

app.get(/sh:/,async (req,res) => {
    const path = "http://localhost:4000" + req.path
    const url = await dbOperations.getUrl(path)
    res.redirect(url[0].Link)
})

app.listen(process.env.PORT, (err) => {
    if(err) throw err
    console.log(`Server is running on: http://${process.env.HOST}:${process.env.PORT}`)
})