const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schemaComment = mongoose.Schema(
  {
    contenu: String,
    identifiant: String,
    _idArticle: String
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model('commentaire', schemaComment);
const schema = Joi.object({
  contenu: Joi.string()
    .min(3)
    .max(500)
    .required(),
  identifiant: Joi.string()
    .min(5)
    .max(50)
    .required(),
  _idArticle: Joi.string()
    .min(5)
    .max(100)
    .required(),
  timestamps: Joi.date().timestamp()
});

module.exports.schema = schema;
module.exports.Comment = Comment;
