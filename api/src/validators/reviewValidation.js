import Joi from "joi";

export const reviewSchema = Joi.object({
  comment: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  meal_id: Joi.number().integer().required(),
});

export const reviewUpdateSchema = Joi.object({
  comment: Joi.string().optional(),
  rating: Joi.number().integer().min(1).max(5).optional(),
});
