import Joi from "joi";

export const reservationSchema = Joi.object({
  number_of_guests: Joi.number().integer().min(1).required(),
  meal_id: Joi.number().integer().required(),
  created_date: Joi.date().iso().required(),
  contact_phonenumber: Joi.string().min(5).max(20).required(),
  contact_name: Joi.string().min(1).max(255).required(),
  contact_email: Joi.string().email().required(),
});
export const reservationUpdateSchema = Joi.object({
  number_of_guests: Joi.number().integer().min(1),
  meal_id: Joi.number().integer(),
  created_date: Joi.date().iso(),
  contact_phonenumber: Joi.string(),
  contact_name: Joi.string(),
  contact_email: Joi.string().email(),
}).min(1);
