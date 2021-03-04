const { Joi } = require('express-validation');

exports.validate = {
    body: Joi.object({
        id: Joi.number(),
        playerId: Joi.number()
        .required(),
        rank: Joi.number()
        .required(),
        points: Joi.number()
        .required(),
        dateCreation: Joi.date()
        .required(),
    }),
}