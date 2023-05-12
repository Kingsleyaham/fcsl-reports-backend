import Joi from "joi";

const signupSchema = Joi.object({
  name: Joi.string().optional(),
  username: Joi.string().optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .trim()
    .required(),
  password: Joi.string().min(8).required(),
});

export default signupSchema;
