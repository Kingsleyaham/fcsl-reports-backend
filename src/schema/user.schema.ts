import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().optional(),
  username: Joi.string().optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .trim(),
  password: Joi.string().min(8),
});

export default userSchema;
