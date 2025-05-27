import Joi from "joi";

export const mealSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow("").optional(),
  location: Joi.string().min(1).required(),
  when_date: Joi.date().iso().required(),
  max_reservations: Joi.number().integer().min(1).required(),
  price: Joi.number().min(0).required(),
});
export const mealUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  location: Joi.string(),
  when_date: Joi.date().iso(),
  max_reservations: Joi.number().integer().min(1),
  price: Joi.number().positive(),
  created_date: Joi.date().iso(),
}).min(1);
