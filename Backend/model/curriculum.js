const Mongoose = require("mongoose");

const curriculumSchema = Mongoose.Schema({
  comment: {
    type: String,
  },
  reqid: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "requirements",
  },
  userId: {
    type: String,
  },
  file: {
    type: String,
  },
  status: {
    type: String,
  },
});
const curriculumModel = Mongoose.model("curriculum", curriculumSchema);
module.exports = { curriculumModel };
