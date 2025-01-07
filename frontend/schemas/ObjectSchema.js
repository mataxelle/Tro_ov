import Joi from "joi";

export const objectSchema = Joi.object({
  name: Joi.string().min(4).max(50).required().messages({
    "string.min": "Le nom doit contenir au moins 4 caractères.",
    "string.max": "Le nom doit contenir au maximun 50 caractères.",
    "any.required": "Le nom est obligatoire.",
  }),
  description: Joi.string().min(8).required().messages({
    "string.min": "La description doit contenir au moins 8 caractères.",
    "any.required": "La description est obligatoire.",
  }),
  color: Joi.string().min(2).messages({
    "string.min": "La description doit contenir au moins 2 caractères.",
  }),
  imageUrl: Joi.string().required().messages({
    "string.min": "Le mot de passe doit contenir au moins 8 caractères.",
    "string.max": "Le mot de passe doit contenir au maximun 50 caractères.",
    "any.required": "Une image est obligatoire.",
  }),
  price: Joi.number().integer().max(50).messages({
    "number.min": "Le mot de passe doit contenir au moins 1 caractères.",
    "number.max": "Le mot de passe doit contenir au maximun 50 caractères.",
  }),
});
