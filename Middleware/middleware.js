const jwt = require("jsonwebtoken");
const { development } = require("../config/config.js");

const httpStatus = require("http-status");

// http - status;
// res.status(httpStatus.CREATED).json(response);

let generateToken = data => {
    const payload = { user: data.email };
    const option = { expiresIn: "2d" };
    const secret = development.secret;
    const token = jwt.sign(payload, secret, option);
    return { token, payload, option };
};

let authorize = (req, res, next) => {
    //console.log("Authorized called");
    let token = req.headers["authorization"];

    if (token) {
        if (token.startsWith("Bearer")) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, development.secret, (err, userData) => {
            if (err) {
                return res.status(httpStatus.UNAUTHORIZED).json(err);
                // return res.json({
                //     success: false,
                //     message: "Token expired"
                // });
            } else {
                //console.log("Userdata>>>>", userData);
                next();
            }
        });
    } else {
        return res
            .status(httpStatus.NETWORK_AUTHENTICATION_REQUIRED)
            .json({ error: "Token required" });
    }
};
module.exports = {
    generateToken,
    authorize
};
