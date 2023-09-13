const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors(["*"]));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = require("./services/fileUpload");

app.use("/uploads", express.static("../uploads"));

app.post("/upload", upload.array(), (req, res) => {
  return res.status(200).json({
    message: "Gotcha!",
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello world!",
  });
});

app.listen(8000, "0.0.0.0");
