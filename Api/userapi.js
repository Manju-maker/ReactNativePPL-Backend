var userapi = require("../Schema/userSchema");

var SGmail = require("@sendgrid/mail");
SGmail.setApiKey(
    "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"
);

module.exports = {
    Adduser: function(data) {
        return new Promise((resolve, reject) => {
            userapi.find({ email: data["email"] }, function(err, result) {
                if (result.length > 0) {
                    resolve("email already exist");
                } else {
                    userapi.create(data, function(err, result) {
                        if (result) {
                            const msg = {
                                to: data["email"],
                                from: "bhattmanju46@gmail.com",
                                subject: "Sending with Twilio SendGrid is Fun",
                                text: "Registered Successfully",
                                html:
                                    "You're on your way!<br>Let's confirm your email addressBy clicking on the following link, you are confirming your email address<br> http://localhost:8081/verify/" +
                                    result["id"]
                            };
                            SGmail.send(msg);
                            resolve(
                                "registered Successfully, Please confirm your email id"
                            );
                        }
                        if (err) {
                            reject(err);
                        }
                    });
                }
                if (err) {
                    rejecct(err);
                }
            });
        });
    },

    verifyUser: function(data) {
        return new Promise((resolve, reject) => {
            userapi.updateOne(
                { _id: data },
                { $set: { verify: true } },
                function(err, result) {
                    if (result) {
                        resolve("Verified Successfully");
                    } else {
                        resolve("Not verified");
                    }
                    if (err) {
                        reject(err);
                    }
                }
            );
        });
    },

    loginuser: function(logdata) {
        return new Promise((resolve, reject) => {
            userapi.find(
                { email: logdata["email"], pass: logdata["pass"] },
                function(err, result) {
                    if (result.length > 0) {
                        userapi.find(
                            { email: logdata["email"], verify: true },
                            { _id: 1 },
                            function(err, result) {
                                if (result.length > 0) {
                                    resolve(result);
                                } else {
                                    resolve("Verify your email id first");
                                }
                                if (err) {
                                    reject(err);
                                }
                            }
                        );
                    } else if (err) {
                        reject(err);
                    } else {
                        resolve("Invalid Username or Password");
                    }
                }
            );
        });
    },

    resetPassword: function(data) {
        console.log("Id", data);
        return new Promise((resolve, reject) => {
            userapi.updateOne(
                { _id: data.id },
                { $set: { pass: data.pass } },
                function(err, result) {
                    if (result.lenght > 0) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                }
            );
        });
    },
    forgot: function(data) {
        return new Promise((resolve, reject) => {
            userapi.find({ email: data.email }, function(err, result) {
                if (result.length > 0) {
                    userapi.updateOne(
                        { email: data.email },
                        { $set: { forgot: true } },
                        function(err, result) {
                            if (result) {
                                userapi.find({ email: data.email }, function(
                                    err,
                                    result1
                                ) {
                                    if (result1) {
                                        console.log("result1", result1);
                                        resolve(result1);
                                    } else {
                                        reject(err);
                                    }
                                });
                            } else {
                                reject(err);
                            }
                        }
                    );
                } else if (err) {
                    reject(err);
                } else {
                    resolve("Email not Registered");
                }
            });
        });
    }
};
