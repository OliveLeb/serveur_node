const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schemaParam = mongoose.Schema({
  information: [Object]
});

const Param = mongoose.model('parametre', schemaParam);
const schema = Joi.object({
  information: Joi.array()
    .items(
      Joi.object()
        .keys({
          nbItem: Joi.number
            .min(1)
            .max(50)
            .required(),
          baliseSEO: Joi.string
            .min(10)
            .max(160)
            .required(),
          texteIntro: Joi.string
            .min(20)
            .max(300)
            .required(),
          titreAccueil: Joi.string
            .min(5)
            .max(50)
            .required()
        })
        .min(4)
        .max(4)
        .required()
    )
    .min(1)
    .max(10)
    .required()
});

module.exports.schema = schema;
module.exports.Param = Param;
