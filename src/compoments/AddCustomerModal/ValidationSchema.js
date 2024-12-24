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
  // email: Yup.string()
  //   .email("Invalid email format")
  //   .required("Email is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  user_first_name: Yup.string().required("First name is required"),
  user_last_name: Yup.string().required("Last name is required"),
  phone: Yup.string().required("Phone number is required"),
  customer_no: Yup.number()
    .typeError("Customer number must be a number")
    .required("Customer number is required"),
  user_pass: Yup.string()
    .nullable() // Allow null or empty
    .test(
      "is-valid-password",
      "Password must start with an uppercase letter, include a lowercase letter, a number, and a special character, and be 8-30 characters long",
      (value) => {
        if (!value) return true; // Skip validation if password is null or empty
        const isValid =
          /^[A-Z]/.test(value) &&
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(
            value
          );
        return isValid;
      }
    ),
  user_pass_confirm: Yup.string()
    .nullable() // Allow null or empty
    .oneOf([Yup.ref("user_pass")], "Passwords must match"),
  company: Yup.string().required("Company is required"),
});
