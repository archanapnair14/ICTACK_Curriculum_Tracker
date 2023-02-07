const mongoose = require('mongoose');
let mongooseSchema=mongoose.Schema;
const requirementSchema=new mongooseSchema(
    {
    title:
    {
        type: String,
        required: true
    },
   type:
   {
    type: String,
    required: true
},
    category:
    {
        type: String,
        required: true
    },
    organisation:
    {
        type: String,
        required: true
    },
    image:
    {
        type: String,
        required: true
    }
}
);
var requirementModelObj=mongoose.model("requirements",requirementSchema);
module.exports = requirementModelObj;