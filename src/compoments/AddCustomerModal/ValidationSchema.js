import * as Yup from "yup";

const upperCaseFormat = /^[A-Z]/;
const totalCheck =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

export const customerAddSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),

  username: Yup.string().required("username must be atleast 3 characters"),

  user_first_name: Yup.string().required("User first name is required"),

  user_last_name: Yup.string().required("Last name is required"),

  phone: Yup.string().required("phone number is required"),

  customer_no: Yup.number().required("customer number is required"),

  user_pass: Yup.string()
    .matches(upperCaseFormat, "Password must start with an uppercase letter")
    .matches(
      totalCheck,
      "Password must be 8-30 characters long, include an uppercase letter, a lowercase letter, a number, and a special character"
    )
    .required("password is required"),

  user_pass_confirm: Yup.string()
    .oneOf([Yup.ref("user_pass")], "passwords must match")
    .required("Confirm password is required"),

  company: Yup.string().required("company is required"),
});
