import Joi from "joi";

const passwordSchema = Joi.object({
  password: Joi.string().min(8).required(),
});

export default passwordSchema;
