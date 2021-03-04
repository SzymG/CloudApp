const { Joi } = require('express-validation');

exports.validate = {
    body: Joi.object({
        id: Joi.number(),
        firstName: Joi.string()
        .required(),
        lastName: Joi.string()
        .required(),
        isRightHanded: Joi.boolean()
        .required(),
        birthDate: Joi.date()
        .required(),
        countrySymbol: Joi.string().min(3).max(3)
        .required(),
    }),
}