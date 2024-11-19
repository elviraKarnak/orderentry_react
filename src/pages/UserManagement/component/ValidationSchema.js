import { Password } from '@mui/icons-material';
import * as yup from 'yup';





const CreateSchema = yup.object().shape({
    user_first_name: yup
        .string()
        .trim()
        .min(2, 'First Name must be at least 2 characters long')
        .required('First Name is required'),
    user_last_name: yup
        .string()
        .trim()
        .min(2, 'Last Name must be at least 2 characters long')
        .required('Last Name is required'),
    username: yup
        .string()
        .trim()
        .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
        .min(3, 'Username must be at least 3 characters long')
        .max(30, 'Username cannot exceed 30 characters')
        .required('Username is required'),
    email: yup
        .string()
        .trim()
        .email('Email is invalid')
        .max(100, 'Email cannot exceed 100 characters')
        .required('Email is required'),
    role_id: yup
        .string()
        .required('User Role is required'),
    user_pass: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    user_pass_confirm: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('user_pass'), null], 'Passwords must match'),
});

export default CreateSchema;


export { CreateSchema };
