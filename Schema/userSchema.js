var mongoose = require("mongoose");
var details = mongoose.Schema({
    username: { type: String },
    pass: { type: String },
    email: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    verify: { type: Boolean, default: true },
    forgot: { type: Boolean, default: false }
});
module.exports = mongoose.model("user", details);
