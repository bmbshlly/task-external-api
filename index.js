// import
import express from "express";
import path from "path";
import cors from "cors";
import axios from "axios";

// app config
const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 9000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/client/build")));

// api routes
app.get("/", (req, res) => {res.sendFile(path.join(__dirname, "client", "build", "index.html"));});

app.get("/rollnumber", async (req, res) => {
  const str = req.query.str;
  const arr = str.split(",");
  const promises = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Number(arr[i]);
    promises.push(
      await axios(`https://terriblytinytales.com/testapi?rollnumber=${arr[i]}`)
        .then((response) => {
          if (response.status == 200) {
            if (response.data == "Fail") {
              arr[i] = 0;
            } else {
              arr[i] = 1;
            }
          }
        })
        .catch(() => {
          console.log("didnt run");
        })
    );
  }

  axios.all(promises)
    .then(res.status(201).send(arr))
    .catch(() => {
      console.log("Promise error");
    });
});

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
