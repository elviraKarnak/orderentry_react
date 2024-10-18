import * as yup from 'yup';
import { boxTypeOptions } from '../../../../utils/Constant';


const inputFields = [
    { label: 'AWB', name: 'awb', type: 'text', sx: { m: 1, minWidth: 150 }, required: true },
    { label: 'Product Name', name: 'product_name', type: 'auto_complete', sx: { m: 1, minWidth: 150 }, required: true },
    { label: 'Vendor Name', name: 'vendor_name', type: 'text', sx: { m: 1, minWidth: 150 }, required: true },
    { label: 'Farm Invoice#', name: 'farm_invoice_number', type: 'text', sx: { m: 1, minWidth: 150 }, required: true },
    { label: 'Date Received', name: 'date_received', type: 'date', sx: { m: 1, minWidth: 100 }, required: true },
    { label: 'PO#', name: 'po', type: 'number', sx: { m: 1, minWidth: 150 }, required: false },
    { label: 'BOXES', name: 'boxes', type: 'number', sx: { m: 1, minWidth: 150 }, required: true },
    { label: 'Box Type', name: 'box_type', type: 'select', sx: { m: 1, minWidth: 150 }, options: boxTypeOptions, required: true },
    { label: 'Units/Box', name: 'unit_per_box', type: 'number', sx: { m: 1, minWidth: 150 }, required: true },
    { label: 'Units/Bunch', name: 'unit_per_bunch', type: 'number', sx: { m: 1, minWidth: 150 }, required: true },
    { label: 'Units/Cost', name: 'cost_per_unit', type: 'number', sx: { m: 1, minWidth: 150 }, required: true },
    { label: 'Sale Price', name: 'sale_price', type: 'number', sx: { m: 1, minWidth: 150 }, required: true },
    { label: 'SO#', name: 'so', type: 'text', sx: { m: 1, minWidth: 150 }, required: true },
    // { label: 'Margin %', name: 'margin_percentage', type: 'number', sx: { m: 1, minWidth: 150 }, required: true },
];


const generateYupSchema = (fields) => {
    const schema = {};

    fields.forEach((field) => {
        if (field.required == true)
            switch (field.type) {
                case 'text':
                    schema[field.name] = yup
                        .string()
                        .required(`${field.label} is required`);
                    break;
                case 'number':
                    schema[field.name] = yup
                        .number()
                        .typeError(`${field.label} must be a number`)
                        .required(`${field.label} is required`);
                    break;
                case 'select':
                    schema[field.name] = yup
                        .string()
                        .required(`${field.label} is required`);
                    break;
                case 'date':
                    schema[field.name] = yup
                        .date()
                        .required(`${field.label} is required`)
                        .nullable()
                        .typeError(`${field.label} must be a valid date`);
                    break;
                case 'auto_complete':
                    schema[field.name] = yup
                        .object()
                        .required(`${field.label} is required`);
                    break;
                default:
                    break;
            }
    });

    return yup.object().shape(schema);
};


const schema = generateYupSchema(inputFields);


export { inputFields, schema };
