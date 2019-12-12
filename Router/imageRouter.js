var express = require("express");
var multer = require("multer");
var router = express.Router();

var imageApi = require("../Api/imageApi");
const { authorize } = require("../Middleware/middleware");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

router.post(
    "/imageupload",
    authorize,
    upload.single("imageupload"),
    async (req, res) => {
        try {
            const imageData = {
                email: req.body.email,
                cat: req.body.cat,
                imageupload: req.file.filename,
                path: req.file.path,
                userId: req.body.userId,
                userToken: req.body.userToken
            };
            //console.log("Userdata>>>", imageData);
            var result = await imageApi.ImageUpload(imageData);
            res.send(result);
        } catch (err) {
            res.send(err);
        }
    }
);

router.post(
    "/publicImageUpload",
    authorize,
    upload.single("imageupload"),
    async (req, res) => {
        try {
            const imageData = {
                email: req.body.email,
                cat: req.body.cat,
                imageupload: req.file.filename,
                path: req.file.path,
                userId: req.body.userId,
                userToken: req.body.userToken
            };
            //console.log("Userdata>>>", imageData);
            var result = await imageApi.PublicImageUpload(imageData);
            res.send(result);
        } catch (err) {
            res.send(err);
        }
    }
);

router.post("/getCategories", authorize, async function(req, res) {
    try {
        var result = await imageApi.Categories(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/getAllPost", authorize, async function(req, res) {
    try {
        var result = await imageApi.AllPosts(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/uploadComment", authorize, async function(req, res) {
    try {
        const commentData = {
            comment: req.body.comment,
            id: req.body.Category[0]._id
        };
        var result = await imageApi.Comment(commentData);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/imageData", authorize, async function(req, res) {
    try {
        var result = await imageApi.ImageData(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/mostCommented", authorize, async function(req, res) {
    try {
        var result = await imageApi.MostCommented(req.body);
        res.send(result);
    } catch (err) {
        console.log("error", err);
        res.send(err);
    }
});
module.exports = router;
