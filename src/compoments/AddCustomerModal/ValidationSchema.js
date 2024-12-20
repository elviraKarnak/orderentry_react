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

// ----------------------------------------------- xxxxxxxxxxxxx ----------------------------------------------

export const customerEditSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").nullable(),

  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .nullable(),

  user_first_name: Yup.string().nullable(),

  user_last_name: Yup.string().nullable(),

  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .nullable(),

  customer_no: Yup.number()
    .typeError("Customer number must be a number")
    .nullable(),

  user_pass: Yup.string()
    .matches(/^[A-Z].*$/, "Password must start with an uppercase letter")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
      "Password must be 8-30 characters long, include an uppercase letter, a lowercase letter, a number, and a special character"
    )
    .nullable(),

  user_pass_confirm: Yup.string()
    .when("user_pass", {
      is: (val) => val?.length > 0, // Validate only if `user_pass` is provided
      then: Yup.string().oneOf([Yup.ref("user_pass")], "Passwords must match"),
    })
    .nullable(),

  company: Yup.string().nullable(),
});
