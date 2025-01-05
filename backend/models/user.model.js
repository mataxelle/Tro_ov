const mongoose = require("mongoose");
const Joi = require("joi");

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    name: { type: String, min: 4, max: 15, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, min: 8, max: 50, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);

/**
 * Validates user input data using Joi.
 *
 * @param {Object} user - The user object to validate.
 * @param {string} user.name - The name of the user (4-15 characters).
 * @param {string} user.email - The email of the user (valid email format).
 * @param {string} user.password - The password of the user (8-50 characters).
 * @returns {Object} The validated user data.
 * @throws {Error} If the validation fails, an error is thrown with the validation message.
 */
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required(),
  });
  const { value, error } = schema.validate(user);

  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
}

/**
 * @param {Object} user - The user object to validate.
 * @param {string} user.email - The email of the user (valid email format).
 * @param {string} user.password - The password of the user (8-50 characters).
 * @returns {Object} The validated user data.
 * @throws {Error} If the validation fails, an error is thrown with the validation message.
 */
function loggeUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required(),
  });
  const { value, error } = schema.validate(user);

  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
}

module.exports = { User, validateUser, loggeUser };
