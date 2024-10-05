import * as yup from 'yup';
import { boxTypeOptions } from '../../../../utils/Constant';


const inputFields = [
    { label: 'AWB', name: 'awb', type: 'text', sx: { m: 1, minWidth: 150 } },
    { label: 'Product Name', name: 'product_name', type: 'text', sx: { m: 1, minWidth: 150 } },
    { label: 'Vendor Name', name: 'vendor_name', type: 'text', sx: { m: 1, minWidth: 150 } },
    { label: 'Farm Invoice#', name: 'farm_invoice', type: 'number', sx: { m: 1, minWidth: 150 } },
    { label: 'Date Received', name: 'received_date', type: 'date', sx: { m: 1, minWidth: 100 } },
    { label: 'PO#', name: 'po', type: 'number', sx: { m: 1, minWidth: 150 } },
    { label: 'SKU', name: 'sku', type: 'number', sx: { m: 1, minWidth: 150 } },
    { label: 'BOXES', name: 'boxes', type: 'number', sx: { m: 1, minWidth: 150 } },
    { label: 'Box Type', name: 'boxtype', type: 'select', sx: { m: 1, minWidth: 150 },options:boxTypeOptions },
    { label: 'Units/Box', name: 'unit_per_box', type: 'number', sx: { m: 1, minWidth: 150 } },
    { label: 'Units/Bunch', name: 'unit_per_bunch', type: 'number', sx: { m: 1, minWidth: 150 } },
    { label: 'Units/Cost', name: 'cost_per_unit', type: 'number', sx: { m: 1, minWidth: 150 } },
    { label: 'Sale Price', name: 'sale_price', type: 'number', sx: { m: 1, minWidth: 150 } },
    { label: 'SO#', name: 'so', type: 'number', sx: { m: 1, minWidth: 150 } },
    { label: 'Margin %', name: 'margin', type: 'number', sx: { m: 1, minWidth: 150 } },
];


const generateYupSchema = (fields) => {
    const schema = {};

    fields.forEach((field) => {
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
            default:
                break;
        }
    });

    return yup.object().shape(schema);
};


const schema = generateYupSchema(inputFields);


export { inputFields, schema };
