import * as yup from "yup";
import { parse, isDate } from "date-fns";


const phoneRegExps = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const CustomerSchama = yup.object({

    company_name: yup.string().trim().required("customer name required"),
    firstname: yup.string().trim().required("first name required"),
    lastname: yup.string().trim().required("last name required"),
    email: yup.string().trim().email().required("email required"),
    phone: yup.string().max(10, "phone lengt must be 10 characters").min(10, "phone lengt must be 10 characters").matches(phoneRegExps, 'phone number is not valid'),
    // customer_service_representative:yup.string().trim().required("customer service representative required"),
    // username:yup.string().min(8).trim().required("username required"),
    // password: yup.string().min(8).required(),
    // confirm_password: yup.string().trim().min(8,"confirm password lengt must be 8 characters").required().oneOf([yup.ref("password")], "confirm password not match"),



    bill_addr_1: yup.string().trim().required("address 1 required"),
    bill_country_id: yup.string().trim().required("country required"),
    bill_state_id: yup.string().trim().required("state required"),
    bill_city_name: yup.string().trim().required("city required"),
    bill_zip_code: yup.string().trim().required("zip code required"),


    ship_contact_name: yup.string().trim().required("contact name required"),
    ship_phone: yup.string().trim().required("phone required"),
    ship_addr_1: yup.string().trim().required("address 1 required"),
    ship_country_id: yup.string().trim().required("country required"),
    ship_state_id: yup.string().trim().required("state required"),
    ship_city_name: yup.string().trim().required("city required"),
    ship_zip_code: yup.string().trim().required("zip code required"),
    ship_method: yup.string().trim().required("ship method required"),


});