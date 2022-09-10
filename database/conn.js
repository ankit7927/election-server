const mongoose = require("mongoose")



const localDB = "mongodb://localhost:27017/electionDB"

mongoose.connect(localDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("connected to database ✔️")
}).catch((err) => console.log("can't connect to database ❌" + "\n" + err))





