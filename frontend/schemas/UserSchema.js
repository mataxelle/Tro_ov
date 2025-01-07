import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(4).max(15).required().messages({
    "string.min": "Le nom doit contenir au moins 4 caractères.",
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
});
