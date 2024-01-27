const baseJoi = require("joi");
const sanitizeHTML = require('sanitize-html')

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapedHTML': '{{#label}} must not include HTML.'
  },
  rules: {
    escapedHTML: {
      validate(value, helpers) {
        const clean = sanitizeHTML(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) return helpers.error('string.escapedHTML', {value})
        return clean;
      }
    }
  }
})

const joi = baseJoi.extend(extension)

const truckValidSchema = joi.object({
  truck: joi
    .object({
      name: joi.string().required().escapedHTML(),
      phone: joi.number().required(),
      price: joi.number().required().min(0),
      type: joi.string().required().escapedHTML(),
      location: joi.string().required().escapedHTML(),
      // image: joi.object().required(),
    })
    .required(),
});

const reviewValidSchema = joi.object({
  review: joi
    .object({
      rating: joi.number().required().min(0).max(5),
      body: joi.string().required().escapedHTML(),
    })
    .required(),
});

module.exports = {truckValidSchema, reviewValidSchema};

// console.log(module.exports)
