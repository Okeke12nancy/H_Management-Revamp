const Joi = require("joi");

exports.CreateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).lowercase().trim().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .required()
    .trim(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(7)
    .max(250)
    .required()
    .lowercase()
    .trim(),
    // roles: Joi.string().lowercase().trim(),
    // isAdmin: Joi.boolean().default(false),
});

exports.LoginUserSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .required()
    .trim(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(7)
    .max(250)
    .required()
    .lowercase()
    .trim(),
})

exports.UpdateUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).trim().lowercase(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .trim(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(7)
    .max(250)
    .lowercase()
    .trim(),
});
