const mongoose = require("mongoose")
require("dotenv").config()

const remoteDB = `mongodb+srv://Ankit:${process.env.DBPASS}@electiondb.nxv1f0v.mongodb.net/?retryWrites=true&w=majority`
const localDB = "mongodb://localhost:27017/electionDB";
const testDBUrl = require("dbUrl.txt")

mongoose.connect(testDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true     //for mongoose v5.*,,, remove in using latest version of mongoose
}).then(() => {
  console.log("connected to database ✔️")
}).catch((err) => console.log("can't connect to database ❌" + "\n" + err))





