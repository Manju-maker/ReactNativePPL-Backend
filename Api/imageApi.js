var imageApi = require("../Schema/imageSchema");

module.exports = {
    ImageUpload: function(data) {
        return new Promise((resolve, reject) => {
            imageApi.create(data, function(err, result) {
                if (result) {
                    imageApi
                        .find({ userId: data["userId"] })
                        .sort({ uploadTime: -1 })
                        .exec(function(err, result1) {
                            if (result1) {
                                resolve(result1);
                            } else {
                                reject(err);
                            }
                        });
                }
                if (err) {
                    console.log(err);
                    reject(err);
                }
            });
        });
    },

    PublicImageUpload: function(data) {
        return new Promise((resolve, reject) => {
            imageApi.create(data, function(err, result) {
                if (result) {
                    imageApi
                        .find({})
                        .sort({ uploadTime: -1 })
                        .exec(function(err, result1) {
                            if (result1) {
                                resolve(result1);
                            } else {
                                reject(err);
                            }
                        });
                } else {
                    reject(err);
                }
            });
        });
    },

    Categories: function(data) {
        return new Promise((resolve, reject) => {
            imageApi
                .find({ userId: data.userID })
                .sort({ uploadTime: -1 })
                .exec(function(err, result) {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
        });
    },

    AllPosts: function(data) {
        return new Promise((resolve, reject) => {
            imageApi
                .find({})
                .sort({ uploadTime: -1 })
                .exec(function(err, result) {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
        });
    },

    MostCommented: function(data) {
        return new Promise((resolve, reject) => {
            imageApi.aggregate(
                [
                    {
                        $addFields: {
                            comment_count: {
                                $size: { $ifNull: ["$comment", []] }
                            }
                        }
                    },
                    { $sort: { comment_count: -1 } }
                ],
                function(err, result) {
                    if (result) {
                        console.log("result of latest---", result);
                        resolve(result);
                    } else {
                        console.log(err);
                        reject(err);
                    }
                }
            );
        });
    },
    Comment: function(data) {
        console.log("Data >>>>>>>", data);
        return new Promise((resolve, reject) => {
            imageApi.updateOne(
                { _id: data.id },
                { $push: { comment: data.comment } },
                function(err, result) {
                    if (result) {
                        imageApi.findOne(
                            { _id: data.id },
                            { comment: 1 },
                            function(err, result1) {
                                if (result1) {
                                    resolve(result1);
                                } else {
                                    reject(err);
                                }
                            }
                        );
                    } else {
                        reject(err);
                    }
                }
            );
        });
    },
    ImageData: function(data) {
        return new Promise((resolve, reject) => {
            imageApi.find({ _id: data.id }, function(err, result) {
                if (result) {
                    resolve(result);
                } else {
                    console.log(err);
                    reject(err);
                }
            });
        });
    }
};
