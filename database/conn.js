const mongoose = require("mongoose")
require("dotenv").config()

const remoteDB = `mongodb+srv://Ankit:${process.env.DBPASS}@electiondb.nxv1f0v.mongodb.net/?retryWrites=true&w=majority`
const localDB = "mongodb://localhost:27017/electionDB";

mongoose.connect(remoteDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("connected to database ✔️")
}).catch((err) => console.log("can't connect to database ❌" + "\n" + err))





