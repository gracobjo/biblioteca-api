const Joi = require('joi');

module.exports = function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error) {
      const messages = error.details.map(d => d.message).join(', ');
      return res.status(400).json({ message: `Datos inválidos: ${messages}` });
    }

    next();
  };
};