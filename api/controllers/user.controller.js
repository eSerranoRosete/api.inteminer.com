const fs = require("fs");
const path = require("path");
const vCardsJS = require("vcards-js");
const qr = require("qrcode");

const Users = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.params.id });
    if (user != null) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch {
    res.status(404).json({ message: "User not found" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await Users.create(req.body);

    vcard = vCardsJS();
    vcard.firstName = user.firstName;
    vcard.lastName = user.lastName;
    vcard.workEmail = user.email;
    vcard.workPhone = user.phone;
    vcard.organization = user.organization;
    vcard.title = user.title;
    vcard.url = `https://cards.inteminer.com/${user._id}`;
    vcard.saveToFile(path.join(__dirname, `../../public/vcf/${user._id}.vcf`));

    async function generateQR(url) {
      try {
        await qr.toFile(
          path.join(__dirname, `../../public/qr/${user._id}.png`),
          url
        );
      } catch (e) {
        console.log(e);
      }
    }
    generateQR(`https://cards.inteminer.com/${user._id}`);

    res.json({ message: `✅ User created with id ${user._id}}` });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);

    fs.unlink(
      path.join(__dirname, `../../public/vcf/${user._id}.vcf`),
      (err) => {
        if (err) console.log(err);
      }
    );

    fs.unlink(
      path.join(__dirname, `../../public/qr/${user._id}.png`),
      (err) => {
        if (err) console.log(err);
      }
    );

    fs.unlink(
      path.join(__dirname, `../../public/uploads/${user._id}.jpeg`),
      (err) => {
        if (err) console.log(err);
      }
    );

    res.send("✅ User deleted");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    await Users.findByIdAndUpdate(req.params.id, req.body);
    const user = await Users.findById(req.params.id);

    vcard = vCardsJS();
    vcard.firstName = user.firstName;
    vcard.lastName = user.lastName;
    vcard.workEmail = user.email;
    vcard.workPhone = user.phone;
    vcard.organization = user.organization;
    vcard.title = user.title;
    vcard.url = `https://cards.inteminer.com/${user._id}`;
    vcard.saveToFile(path.join(__dirname, `../../public/vcf/${user._id}.vcf`));

    res.send("✅ User updated");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.setAvatar = (req, res) => {
  res.send("✅ Avatar was set");
};
