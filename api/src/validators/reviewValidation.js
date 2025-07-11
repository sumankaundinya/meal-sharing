import Joi from "joi";

export const reviewSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().required(),
  stars: Joi.number().integer().min(1).max(5).required(),
  meal_id: Joi.number().integer().required(),
});

export const reviewUpdateSchema = Joi.object({
  title: Joi.string().min(1).max(255).optional(),
  description: Joi.string().optional(),
  stars: Joi.number().integer().min(1).max(5).optional(),
});
