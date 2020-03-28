const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schemaParam = mongoose.Schema({
  nbItem: Number,
  baliseSEO: String,
  texteIntro: String,
  titreAccueil: String
});

const Param = mongoose.model('parametre', schemaParam);
const schema = Joi.object({
  nbItem: Joi.number()
    .min(1)
    .max(50)
    .required(),
  baliseSEO: Joi.string()
    .min(10)
    .max(160)
    .required(),
  texteIntro: Joi.string()
    .min(20)
    .max(2000)
    .required(),
  titreAccueil: Joi.string()
    .min(5)
    .max(50)
    .required()
});

module.exports.schema = schema;
module.exports.Param = Param;
