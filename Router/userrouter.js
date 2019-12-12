var express = require("express");
var router = express.Router();
var userapi = require("../Api/userapi");
const { generateToken } = require("../Middleware/middleware.js");

router.post("/adduser", async function(req, res) {
    try {
        var result = await userapi.Adduser(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.get("/verify/:email", async function(req, res) {
    try {
        var result = await userapi.verifyUser(req.params.email);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/login", async function(req, res) {
    try {
        // console.log("Req.body", req.body);
        let token = generateToken(req.body);
        //console.log("Generated token", token);
        var result = await userapi.loginuser(req.body);
        if (result === "Invalid Username or Password") {
            res.send(result);
        } else {
            res.send([...result, token]);
        }
    } catch (err) {
        res.send(err);
    }
});

router.get("/verifyLink/:email", async function(req, res) {
    try {
        var result = await userapi.verifyPassLink(req.params.email);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/forgotPass", async function(req, res) {
    try {
        var result = await userapi.forgot(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/resetPass", async function(req, res) {
    try {
        console.log("Password console", req.body);
        var result = await userapi.resetPassword(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;
