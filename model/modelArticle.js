const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schemaArticle = mongoose.Schema(
  {
    titre: String,
    contenu: String,
    nomAuteur: String,
    emailAuteur: String,
    categorie: [Object],
    prix: Number,
    img: String,
    published: Boolean
  },
  // timestamps : affiche 2 champs -> createdAt et updatedAt de type Date.
  // initialise les 2 lors du POST mais seulement maj de updatedAt lors du PUT.
  {
    timestamps: true
  }
);

const Article = mongoose.model('article', schemaArticle);
const schema = Joi.object({
  titre: Joi.string()
    .min(3)
    .max(30)
    .required(),
  contenu: Joi.string()
    .min(3)
    .max(500)
    .required(),
  nomAuteur: Joi.string()
    .min(3)
    .max(50)
    .required(),
  emailAuteur: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
  categorie: Joi.array()
    .items(Joi.object())
    .min(2)
    .max(10)
    .required(),
  prix: Joi.number()
    .min(0)
    .max(10000)
    .required(),
  img: Joi.string()
    .min(5)
    .max(100)
    .required(),
  published: Joi.boolean().required(),
  timestamps: Joi.date().timestamp()
});

module.exports.schema = schema;
module.exports.Article = Article;
