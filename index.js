import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
const port = 3000

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs")
} );

app.post("/report", async (req, res) => {
    try {
        const response = await axios.get(process.env.API_URL, {
            params: {q: req.body.city + " " + req.body.country},
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': process.env.API_HOST
              }
        })
        console.log(response.data)
        res.render("index.ejs", {
            result: response.data
        })
    } catch (error) {
        console.error(error)
    }
})

// try {
//     const response = await axios.get("https://weatherapi-com.p.rapidapi.com/current.json", {
//         params: {q: 'Lagos Nigeria'},
//         headers: {
//             'X-RapidAPI-Key': 'a489fc5827msh847a5a24cbb4d30p158da6jsncc75ec2c27aa',
//             'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
//           }
//     })
//     console.log(response.data)
//     res.render("index.ejs")
// } catch (error) {
//     console.error(error)
// }

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})