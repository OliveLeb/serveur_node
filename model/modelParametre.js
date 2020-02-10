const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const schemaParam = mongoose.Schema({
    information : String
});

const Param = mongoose.model("parametre", schemaParam);
const schema = Joi.object({
    information : Joi.string().min(3).max(255).required()
});

module.exports.schema = schema;
module.exports.Param = Param;