const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrpt = require("bcrypt");
const BodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = new express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());

//import model file

const userModel = require("./models/users");
const requirementModelObj = require("./models/registration");
const path = require("path");
app.use(express.static(path.join(__dirname + "/build")));
// Task2: create mongoDB connection

mongoose.connect(
  "mongodb+srv://Anagha:anagha110@cluster0.p9jvv4r.mongodb.net/CuriculamTracker?retryWrites=true&w=majority"
);



//signin api

app.post("/api/signin", (req, res) => {
  var getEmail = req.body.email;
  var password = req.body.password;

  let result = userModel.find({ email: getEmail }, (err, data) => {
    if (data.length > 0) {
      const passwordValidator = bcrpt.compareSync(password, data[0].password);
      if (passwordValidator) {
        jwt.sign(
          { email: getEmail, id: data[0]._id },
          "ictacademy",
          { expiresIn: "1d" },

          (err, token) => {
            if (err) {
              res.json({ status: "error", error: err });
            } else {
              res.json({ status: "success", data: data, token: token });
            }
          }
        );
      } else {
        res.json({ status: "failed", data: "invalid password" });
      }
    } else {
      res.json({ status: "failed", data: "invalid email id" });
    }
  });
});

//signup api
app.post("/api/signup", async (req, res) => {
  console.log(req.body);
  let data = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: bcrpt.hashSync(req.body.password, 10),
  });
  console.log(data);
  await data.save();

  res.json({ status: "success", data: data });
});

app.post("/signup", (req, res) => {
  res.send("Signup working");
});



app.post("/api/requirements", async (req, res) => {
  console.log(req.body);
  let data = new requirementModelObj({
    title: req.body.title,
    type: req.body.type,
    category: req.body.category,
    organisation: req.body.organisation,
    image:req.body.image,
  });
  try {
    const Data = await data.save();
    res.status(200).json(Data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/requirements/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var data = req.body;
    const result = await requirementModelObj.findOneAndDelete({ _id: id }, data);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/requirements", (req, res) => {
  var title = req.body.title;
  var data = req.body;
  requirementModelObj.findOneAndUpdate({ title: title }, data, (err, data) => {
    if (err) {
      res.json({ status: "error", error: err });
    } else {
      res.json({ status: "updated", data: data });
    }
  });
});










app.listen(3004, () => {
  console.log("server listening to port 3004");
});
