const Joi = require("joi");

exports.CreateRoomTypeSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().trim().lowercase(),
});

exports.UpdateRoomTypeSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().trim().lowercase(),
});