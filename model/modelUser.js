const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const PasswordComplexity = require('joi-password-complexity');

const schemaUser = mongoose.Schema({
  nom: String,
  prenom: String,
  identifiant: String,
  password: String,
  email: String,
  role: String,
  estActif: Boolean
});

const User = mongoose.model('user', schemaUser);

function validationUser(profil) {
  // Joi pour le password
  const complexityOptions = {
    min: 8,
    max: 100,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 0,
    requirementCount: 6
  };
  const schema = Joi.object({
    nom: Joi.string()
      .min(3)
      .max(50)
      .required(),
    prenom: Joi.string()
      .min(3)
      .max(50)
      .required(),
    identifiant: Joi.string()
      .min(3)
      .max(50)
      .required(),
    password: PasswordComplexity(complexityOptions).required(),
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required(),
    role: Joi.string()
      .valid('admin', 'redac', 'user', 'visitor')
      .required(),
    estActif: Joi.boolean().required()
  });
  return schema.validateAsync(profil);
}

const validationConnexion = async data => {
  const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 0,
    requirementCount: 6
  };
  const schema = Joi.object({
    password: PasswordComplexity(complexityOptions).required(),
    email: Joi.string().email({ tlds: { allow: true } }),
    identifiant: Joi.string()
      .min(5)
      .max(50),
    role: Joi.string().valid('admin', 'redac', 'user', 'visitor')
  });
  return await schema.validateAsync(data);
};
module.exports.validationUser = validationUser;
module.exports.validationConnexion = validationConnexion;
module.exports.User = User;
