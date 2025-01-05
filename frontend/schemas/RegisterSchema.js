import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(6).max(15).required().messages({
    "string.min": "Le nom doit contenir au moins 8 caractères.",
    "string.max": "Le nom doit contenir au maximun 15 caractères.",
    "any.required": "Le nom est obligatoire.",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required()
    .messages({
      "string.email":
        "L'adresse email doit contenir un '@' et un domaine valide (par exemple, 'example.com').",
      "any.required": "L'email est obligatoire.",
    }),
  password: Joi.string().min(6).max(50).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 8 caractères.",
    "string.max": "Le mot de passe doit contenir au maximun 50 caractères.",
    "any.required": "Le mot de passe est obligatoire.",
  }),
});
