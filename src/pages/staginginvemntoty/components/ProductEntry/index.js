import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { inputFields, schema } from './VlidationSchema';
import moment from 'moment';
import { ProductEntryAdd } from '../../../../utils/fetch';
import ProductAutocomplete from './ProductAutocomplete';
import Swal from 'sweetalert2';
import dayjs from "dayjs";


function ProductEntry({ stagingInventoryRefetch }) {

    const { control, handleSubmit, formState: { errors }, reset, setValue, getValues, watch } = useForm({
        resolver: yupResolver(schema),
    });

    const [LockAWB, setLockAWB] = useState(false);
    const [AddProductEntry, setAddProductEntry] = useState(false);

    const onSubmit = async (data) => {

        data.date_received = moment(data.date_received).format('YYYY-MM-DD');
        data.product_category = data.product_name.category_string;
        data.product_color = data.product_name.color_string;
        data.product_image = data.product_name.image_url;
        data.product_name = data.product_name.product_name;

        console.log(data);



        var responce = await ProductEntryAdd(data);

        console.log("ProductEntryAdd ", responce);


        if (responce.status) {

            Swal.fire({
                text: "Product entry add successfully.",
                icon: "success",
            });

            reset();

            stagingInventoryRefetch();

            if (LockAWB) {

                setValue('awb', data.awb);
                setValue('vendor_name', data.vendor_name);
                setValue('farm_invoice_number', data.farm_invoice_number);
                setValue('date_received', dayjs(data.date_received));
            }

        }





    };

    return (
        <div className='row'>
            {/* titile */}
            <div className='col-md-12'>
                <Typography variant="h4" className="title">
                    Product Entry
                </Typography>
            </div>


            <div className='col-md-12'>

                {/* check box pre selecred value */}
                <Checkbox checked={LockAWB} onChange={() => setLockAWB(!LockAWB)} />

                {/* Add Product Entry From On */}
                {!AddProductEntry && (
                    <Button
                        type="button"
                        sx={{ m: 2 }}
                        variant="contained"
                        onClick={() => setAddProductEntry(true)}
                    >
                        Add
                    </Button>
                )}

                {/* Add Product Entry From */}
                {AddProductEntry && (
                    <>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {inputFields.map((field) => (
                                <FormControl key={field.name} sx={field.sx} margin="normal">
                                    {field.type === 'text' || field.type === 'number' ? (
                                        <Controller
                                            name={field.name}
                                            control={control}
                                            render={({ field: controllerField }) => (
                                                <TextField
                                                    {...controllerField}
                                                    label={field.label}
                                                    type={field.type === 'number' ? 'number' : 'text'}
                                                    error={!!errors[field.name]}
                                                    helperText={errors[field.name] ? errors[field.name].message : ''}
                                                    value={controllerField.value || ''}
                                                />
                                            )}
                                        />
                                    ) : field.type === 'select' ? (
                                        <>
                                            <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                                            <Controller
                                                name={field.name}
                                                control={control}
                                                render={({ field: controllerField }) => (
                                                    <Select
                                                        {...controllerField}
                                                        labelId={`${field.name}-label`}
                                                        label={field.label}
                                                        error={!!errors[field.name]}
                                                        value={controllerField.value || ''}
                                                    >
                                                        {/* Add MenuItem options here */}
                                                        {
                                                            field?.options?.map((option, index) => (
                                                                <MenuItem key={index} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                )}
                                            />
                                            {errors[field.name] && <p style={{ color: 'red' }}>{errors[field.name].message}</p>}
                                        </>
                                    ) : field.type === 'date' ? (
                                        <Controller
                                            name={field.name}
                                            control={control}
                                            render={({ field: controllerField }) => (<>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        {...controllerField}
                                                        label={field.label}
                                                        value={controllerField.value || null}
                                                        onChange={(newValue) => {
                                                            controllerField.onChange(newValue);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label={field.label}
                                                                error={!!errors[field.name]}
                                                                helperText={errors[field.name]?.message || ''}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                                {!!errors[field.name] && <p style={{ color: "red",fontSize:"0.75rem",fontWeight:400 }}>{errors[field.name]?.message || ''}</p>}
                                            </>)}
                                        />
                                    ) : field.type === 'auto_complete' ? (
                                        <Controller
                                            name={field.name}
                                            control={control}
                                            render={({ field: controllerField }) => (
                                                <ProductAutocomplete
                                                    {...controllerField}
                                                    name={field.name}
                                                    label={field.label}
                                                    errors={errors}
                                                    setValue={setValue}
                                                    getValues={getValues}
                                                    watch={watch}
                                                />
                                            )}
                                        />

                                    ) : null}
                                </FormControl>
                            ))}

                            <div className='col-md-12'>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ m: 2 }}
                                >
                                    Submit
                                </Button>

                                <Button
                                    type='button'
                                    variant="contained"
                                    color="warning"
                                    sx={{ m: 2 }}
                                    onClick={() => {
                                        reset();
                                    }}
                                >
                                    Clear
                                </Button>


                                <Button
                                    type="button"
                                    sx={{ m: 2 }}
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setAddProductEntry(false);
                                        setLockAWB(false);
                                        reset();
                                    }}
                                >
                                    Close
                                </Button>
                            </div>
                        </form>
                    </>
                )}
            </div>

        </div>
    )
}

export default ProductEntry
