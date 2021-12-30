import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name"),
  lastName: yup.string().required("Please enter your last name"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Please enter your email"),
  username: yup.string().required("User name is required"),
  password: yup
    .string()
    .min(7, "Password must contain at least 7 characters")
    .required("Please enter your password"),
  retypePassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Password does not match"),
});

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(7, "Password must contain at least 7 characters")
    .required("Please enter your password"),
  retypePassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Password does not match"),
});
