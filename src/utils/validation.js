import Joi from "joi";

export const RegisterUserValidation = (data) => {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required(),
    }
    return Joi.object(schema).validate(data);
}

export const LoginValidation = (data) => {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    }
    return Joi.object(schema).validate(data);
}

export const AddCourseValidation = (data) => {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        youtubeUrl: Joi.string().required(),
        author: Joi.string().required(),
    }
    return Joi.object(schema).validate(data);
}