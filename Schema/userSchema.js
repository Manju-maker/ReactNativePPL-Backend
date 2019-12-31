var mongoose = require("mongoose");
var details = mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    verify: { type: Boolean, default: false },
    forgot: { type: Boolean, default: false }
});
module.exports = mongoose.model("user", details);
