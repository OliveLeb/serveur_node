const mongoose = require("mongoose");
const Joi = require("@hapi/joi");


const schemaComment = mongoose.Schema({
    contenu : String,
    nomAuteur : String
},
    {
        timestamps:  true
    }
);
//console.log(moment().utc(true).toISOString());
const Comment = mongoose.model("commentaire", schemaComment);
const schema = Joi.object({
    contenu : Joi.string().min(3).max(5000).required(),
    nomAuteur : Joi.string().min(5).max(255).required(),
    timestamps : Joi.date().timestamp()
});

module.exports.schema = schema;
module.exports.Comment = Comment;