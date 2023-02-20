const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const BodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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

//SignIn API

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

//Signup API

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

//Requirement Form API

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

//Requirement Fetch API

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

//Curriculum Form API

app.post("/curriculum", upload.single("file"), async (req, res) => {
  let data = new curriculumModel({
    comment: req.body.comment,
    reqid: req.body.reqid,
    userId: req.body.userId,
    file: req.file.filename,
    path: req.file.path,
    status: "pending",
  });

  console.log(req.file.originalname);
  await data.save();

  res.json({ status: "success", data: data });
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

//Curriculum Fetch API

app.get("/curriculum", async (req, res) => {
  try {
    const curriculum = await curriculumModel.find().populate("reqid");
    res.json(curriculum);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//Curriculum Fetch API with specific userid and status Approved

app.get("/curriculum/:userId/Approved", async (req, res) => {
  const userId = req.params.userId;
  try {
    const curriculum = await curriculumModel
      .find({ userId: userId, status: "Approved" })
      .populate("reqid");
    if (!curriculum) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(curriculum);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//Curriculum Fetch API with specific userid

app.get("/curriculum/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const curriculum = await curriculumModel
      .find({ userId: userId })
      .populate("reqid");
    if (!curriculum) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(curriculum);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//Curriculum Fetch API with status Approved

app.get("/curriculums", async (req, res) => {
  try {
    const curriculum = await curriculumModel
      .find({ status: "Approved" })
      .populate("reqid");
    if (!curriculum) {
      return res.status(404).json({ message: "No Approved Curriculums" });
    }
    return res.json(curriculum);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//Update API for curriculum

// app.put("/curriculum/:id", (req, res) => {
//   var id = req.params.id;
//   var data = req.body;
//   curriculumModel.findOneAndUpdate({ _id: id }, data, (err, data) => {
//     if (err) {
//       res.json({ status: "error", error: err });
//     } else {
//       res.json({ status: "updated", data: data });
//     }
//   });
// });

//Update API for curriculum status

app.patch("/curriculum/:id", async (req, res) => {
  try {
    const data = await curriculumModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//Delete API for curriculum

app.delete("/curriculum/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var data = req.body;
    const result = await curriculumModel.findOneAndDelete({ _id: id }, data);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//File Download API

app.get("/files/:id", async (req, res) => {
  const fileId = req.params.id;
  try {
    const file = await curriculumModel.findById(fileId);
    if (!file) {
      return res.status(404).send("File not found");
    }
    const filepath = file.path;
    const filePath = filepath;

    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath);
      res.contentType("application/pdf");
      res.send(file);
    } else {
      res.status(404).send("File not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.get("/search", async (req, res) => {
  const query = req.query.q;

  const results = await curriculumModel
    .find()
    .populate({
      path: "reqid",
      match:{
        $or: [
         {title: { $regex: query, $options: "i"  }},
         {type: { $regex: query, $options: 'i' } },
         {organisation: { $regex: query, $options: 'i' } },
         {category: { $regex: query, $options: 'i' } },
        ],
      }
    })
    .exec();
  const filteredResults = results.filter((result) => result.reqid !== null);
  res.json(filteredResults);
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));
