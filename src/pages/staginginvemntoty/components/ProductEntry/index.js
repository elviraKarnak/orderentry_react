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


function ProductEntry() {

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const [LockAWB, setLockAWB] = useState(false);
    const [AddProductEntry, setAddProductEntry] = useState(false);

    const onSubmit = (data) => {
        data.received_date = moment(data.received_date).unix();
        console.log(data);

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
                                            render={({ field: controllerField }) => (
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        {...controllerField}
                                                        label={field.label}
                                                        // value={controllerField.value || ''}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors[field.name]}
                                                                helperText={errors[field.name] ? errors[field.name].message : ''}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
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
