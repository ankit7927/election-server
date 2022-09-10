const crypto = require("crypto")

const key = "thisistestkey"
const generatHash = (data) => {
    return crypto.createHash("sha256", key)
        .update(JSON.stringify(data))
        .digest("hex")
}


module.exports = generatHash


