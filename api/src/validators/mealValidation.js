import Joi from "joi";

export const mealSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  when_date: Joi.date().required(),
  max_reservations: Joi.number().integer().min(1).required(),
  price: Joi.number().positive().required(),
  image_url: Joi.string().uri().optional(),
  host_id: Joi.number().integer().required(),
});

export const mealUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  location: Joi.string(),
  when_date: Joi.date(),
  max_reservations: Joi.number().integer().min(1),
  price: Joi.number().positive(),
  image_url: Joi.string().uri().optional(),
  host_id: Joi.number().integer(),
});
