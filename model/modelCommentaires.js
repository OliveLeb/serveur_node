const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schemaComment = mongoose.Schema(
  {
    contenu: String,
    nomAuteur: String,
    article: String
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model('commentaire', schemaComment);
const schema = Joi.object({
  contenu: Joi.string()
    .min(3)
    .max(1000)
    .required(),
  nomAuteur: Joi.string()
    .min(5)
    .max(50)
    .required(),
  article: Joi.string()
    .min(5)
    .max(1000)
    .required(),
  timestamps: Joi.date().timestamp()
});

module.exports.schema = schema;
module.exports.Comment = Comment;
