import * as yup from "yup";

export const LoginSchama = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
});

export const RegistrationSchama = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirm_password: yup.string().trim().min(8,"confirm password lengt must be 8 characters").required().oneOf([yup.ref("password")], "confirm password not match"),
});

export const ForgotPasswordSchama = yup.object({
    email: yup.string().email().required(),
});

export const PasswordOtpSchama = yup.object({
    code:yup.string().required(),
});

export const ResetPasswordSchama = yup.object({
    password: yup.string().min(8).required(),
    confirm_password: yup.string().trim().min(8,"confirm password lengt must be 8 characters").required().oneOf([yup.ref("password")], "confirm password not match"),
});


export const UserCreateSchama = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirm_password: yup.string().trim().min(8,"confirm password lengt must be 8 characters").required().oneOf([yup.ref("password")], "confirm password not match"),
});


export const UserEditSchama = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string(),
    confirm_password: yup.string().trim().oneOf([yup.ref("password")], "confirm password not match"),
});