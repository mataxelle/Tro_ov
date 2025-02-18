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
  colors: Joi.string().min(0).messages({
    "string.min": "Champ non obligatoire.",
  }),
  imageUrl: Joi.string().required().messages({
    "string.min": "Le mot de passe doit contenir au moins 8 caractères.",
    "string.max": "Le mot de passe doit contenir au maximun 50 caractères.",
    "any.required": "Une image est obligatoire.",
  }),
  price: Joi.number().integer().max(50000).messages({
    "number.min": "Le prix peut être au minimum 0.",
    "number.max": "Le prix peut être maximun 50 000.",
  }),
});
