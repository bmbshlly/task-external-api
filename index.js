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
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get("/rollnumber", (req, res) => {
  const str = req.query.str;
  const arr = str.split(",");
  const promises = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Number(arr[i]);
    promises.push(
      axios.get(`https://terriblytinytales.com/testapi?rollnumber=${arr[i]}`)
    );
  }
  axios
    .all(promises)
    .then((result) => {
      for (let i = 0; i < arr.length; i++) {
        if (result[i].data == "Fail") {
          arr[i] = 0;
        } else {
          arr[i] = 1;
        }
      }
      return res.status(201).send(arr);
    })
    .catch(() => {
      console.log("didnt run");
    });
});

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
