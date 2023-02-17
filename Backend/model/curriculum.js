const Mongoose = require("mongoose");

const curriculumSchema = Mongoose.Schema({
  comment: {
    type: String,
  },
  reqid: {
    type: String,
  },
  userId: {
    type: String,
  },
  file:{
    type: String,
  },
  status:{
    type: String,
  }
});
const curriculumModel = Mongoose.model("curriculum", curriculumSchema);
module.exports = { curriculumModel };
