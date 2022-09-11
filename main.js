var express = require("express");
require("dotenv").config()
var logger = require("morgan");
var cors = require("cors");
require("./database/conn");

app = express();
const port = process.env.PORT || 4000
app.use(cors());
app.use(logger("dev"));
app.use("/images", express.static("images"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/admin", require("./routes/adminRoute"));
app.use("/voter", require("./routes/voterRoute"));
app.use("/public", require("./routes/publicRoute"));

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
