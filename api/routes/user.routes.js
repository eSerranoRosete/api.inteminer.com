const express = require("express");
const multer = require("multer");

const authRequest = require("../middlewear/authRequest");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.id}.jpeg`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/", authRequest, userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.post("/", authRequest, upload.none(), userController.createUser);
router.patch("/:id", authRequest, upload.none(), userController.updateUser);
router.delete("/:id", authRequest, userController.deleteUser);

router.post("/avatar/:id", upload.single("avatar"), userController.setAvatar);

module.exports = router;
