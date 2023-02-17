const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const BodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const { userModel } = require("./model/users");
const { requirementModelObj } = require("./model/registration");
const { curriculumModel } = require("./model/curriculum");

const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());

// set up uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: storage });

// Connect Database
connectDB();

//API Calls

app.post("/signin", async (req, res) => {
  var getEmail = req.body.email;
  var password = req.body.password;

  let result = userModel.find({ email: getEmail }, (err, data) => {
    if (data.length > 0) {
      const passwordValidator = bcrypt.compareSync(password, data[0].password);
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

//Signup
app.post("/register", async (req, res) => {
  console.log(req.body);
  console.log(req.body);
  let data = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  console.log(data);
  await data.save();

  res.json({ status: "success", data: data });
});

app.post("/requirements", async (req, res) => {
  console.log(req.body);
  let data = new requirementModelObj({
    title: req.body.title,
    type: req.body.type,
    category: req.body.category,
    organisation: req.body.organisation,
    hours: req.body.hours,
  });
  try {
    const Data = await data.save();
    res.status(200).json(Data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/requirements", (req, res) => {
  requirementModelObj.find((err, data) => {
    if (err) {
      res.json({
        status: "error",
        error: err,
      });
    } else {
      res.json(data);
    }
  });
});

app.post("/curriculum", upload.single("file"), async(req, res) => {
  let data = new curriculumModel({
    comment: req.body.comment,
    reqid: req.body.reqid,
    userId: req.body.userId,
    file: req.file.filename,
    status:"pending",
  });

  console.log(req.file.originalname);
  await data.save();

  res.json({ status: "success", data: data });
});


app.get("/curriculum/:id/:reqid", async (req, res) => {
  const userid = req.body.userId;
  const reqid = req.body.reqid;

  try{
    const data = await curriculumModel.findOne(userid,reqid);
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
});
app.delete("/requirements/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var data = req.body;
    const result = await requirementModelObj.findOneAndDelete(
      { _id: id },
      data
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/requirements", (req, res) => {
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

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));
