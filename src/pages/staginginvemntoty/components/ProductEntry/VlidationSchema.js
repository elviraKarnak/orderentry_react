import * as yup from 'yup';
import { boxTypeOptions } from '../../../../utils/Constant';


const inputFields = [
    { label: 'AWB', name: 'awb', type: 'text', sx: { m: 1, minWidth: 150 }, required: true },
    { label: 'Product Name', name: 'product_name', type: 'auto_complete', sx: { m: 1, minWidth: 800 }, required: true },
    { label: 'Vendor Name', name: 'vendor_name', type: 'text', sx: { m: 1, minWidth: 150 }, required: true },
    { label: 'Farm Invoice#', name: 'farm_invoice_number', type: 'text', sx: { m: 1, minWidth: 150 }, required: true },
    { label: 'Date Received', name: 'date_received', type: 'date', sx: { m: 1, minWidth: 260 }, required: true },
    { label: 'PO#', name: 'po', type: 'text', sx: { m: 1, minWidth: 260 }, required: false },
    { label: 'BOXES', name: 'boxes', type: 'number', sx: { m: 1, minWidth: 250 }, required: true },
    { label: 'Box Type', name: 'box_type', type: 'select', sx: { m: 1, minWidth: 220 }, options: boxTypeOptions, required: true },
    { label: 'Units/Box', name: 'unit_per_box', type: 'number', sx: { m: 1, minWidth: 150 }, required: true },
    { label: 'Units/Bunch', name: 'unit_per_bunch', type: 'number', sx: { m: 1, minWidth: 260 }, required: true },
    { label: 'Units/Cost', name: 'cost_per_unit', type: 'number', sx: { m: 1, minWidth: 260 }, required: true },
    { label: 'Sale Price', name: 'sale_price', type: 'number', sx: { m: 1, minWidth: 250 }, required: true },
    { label: 'SO#', name: 'so', type: 'text', sx: { m: 1, minWidth: 220 }, required: false },
    // { label: 'Margin %', name: 'margin_percentage', type: 'number', sx: { m: 1, minWidth: 150 }, required: true },
];


// const generateYupSchema = (fields) => {
//     const schema = {};

//     fields.forEach((field) => {
//         if (field.required == true) {
//             switch (field.type) {
//                 case 'text':
//                     schema[field.name] = yup
//                         .string()
//                         .required(`${field.label} is required`);
//                     break;
//                 case 'number':
//                     schema[field.name] = yup
//                         .number()
//                         .typeError(`${field.label} must be a number`)
//                         .required(`${field.label} is required`);
//                     break;
//                 case 'select':
//                     schema[field.name] = yup
//                         .string()
//                         .required(`${field.label} is required`);
//                     break;
//                 case 'date':
//                     schema[field.name] = yup
//                         .date()
//                         .required(`${field.label} is required`)
//                         .nullable()
//                         .typeError(`${field.label} must be a valid date`);
//                     break;
//                 case 'auto_complete':
//                     schema[field.name] = yup
//                         .mixed()
//                         .test('isObjectOrString', `${field.label} must be an object or string`, value => {
//                             return typeof value === 'object' || typeof value === 'string';
//                         })
//                         .required(`${field.label} is required`);
//                     break;
//                 default:
//                     break;
//             }
//         }
//     });

//     return yup.object().shape(schema).test(
//         'po-and-so-not-equal',
//         'PO# and SO# cannot be the same',
//         (values) => {

//             // Only validate if both fields are defined
//             if (values.po && values.so) {
//                 if (values.po === values.so) {
//                     return false;
//                 }
//             }

//             return true;
//         }
//     );
// };


// const schema = generateYupSchema(inputFields);


const schema = yup.object().shape({
    awb: yup.string().required('AWB is required'),
    product_name: yup.mixed().test('isObjectOrString', `Product Name must be an object or string`, value => {
        return typeof value === 'object' || typeof value === 'string';
    }).required(`Product Name is required`),
    vendor_name: yup.string().required('Vendor Name is required'),
    farm_invoice_number: yup.string().required('Farm Invoice# is required'),
    date_received: yup.date().required('Date Received is required'),
    po: yup.string()
    .nullable()
    .test('not-equal', 'PO# cannot be the same as SO#', function (value) {
        const { so } = this.parent;
        if (!so && !value) return true;
        return so !== value;
    }),
    boxes: yup
        .number()
        .typeError('BOXES must be a number')
        .positive('BOXES must be greater than 0')
        .integer('BOXES must be an integer')
        .required('BOXES is required'),
    box_type: yup.string().required('Box Type is required'),
    unit_per_box: yup
        .number()
        .typeError('Units/Box must be a number')
        .positive('Units/Box must be greater than 0')
        .integer('Units/Box must be an integer')
        .required('Units/Box is required'),
    unit_per_bunch: yup
        .number()
        .typeError('Units/Bunch must be a number')
        .positive('Units/Bunch must be greater than 0')
        .integer('Units/Bunch must be an integer')
        .required('Units/Bunch is required'),
    cost_per_unit: yup
        .number()
        .typeError('Units/Cost must be a number')
        .positive('Units/Cost must be greater than 0')
        .required('Units/Cost is required'),
    sale_price: yup
        .number()
        .typeError('Sale Price must be a number')
        .positive('Sale Price must be greater than 0')
        .required('Sale Price is required'),
    so: yup.string()
        .nullable()
        .test('not-equal', 'SO# cannot be the same as PO#', function (value) {
            const { po } = this.parent;
            if (!po && !value) return true;
            return po !== value;
        }),
});


export { inputFields, schema };
