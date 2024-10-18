import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getStagingInventoryProductSearch } from '../../../../utils/fetch';

const ProductAutocomplete = ({ name, label, errors, setValue, getValues, watch }) => {
    const [options, setOptions] = useState([]);
    const watchedFieldValue = watch(name);
    const [inputValue, setInputValue] = useState(watchedFieldValue || '');


    const fetchProducts = async (query) => {
        try {
            const response = await getStagingInventoryProductSearch(query);
            setOptions(response.result.results || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleChange = (event, newValue) => {
        setValue(name, newValue || null);
        console.log("newValue: ",name ,":", newValue);

        if (newValue) {
            setValue('vendor_name', newValue.productMeta.vendor_name);
            setValue('farm_invoice_number', newValue.productMeta.farm_invoice);
            setValue('boxes', newValue.productMeta.boxes);
            setValue('box_type', newValue.productMeta.boxtype);
            setValue('unit_per_box', newValue.productMeta.unit_per_box);
            setValue('unit_per_bunch', newValue.productMeta.unit_per_bunch);
            setValue('cost_per_unit', newValue.productMeta.cost_per_unit);
            setValue('sale_price', newValue.productMeta.sale_price);
            setValue('so', newValue.productMeta.so);
            // setValue('margin_percentage', newValue?.productMargin?.landed_t_1_m);
        }
    };

    useEffect(() => {
        if (inputValue) {
            fetchProducts(inputValue);
        } else {
            setOptions([]);
        }
    }, [inputValue]);

    useEffect(() => {
        if (watchedFieldValue === null || watchedFieldValue === undefined) {
            setInputValue('');
        }
    }, [watchedFieldValue]);

    useEffect(() => {
        console.log(errors)
    }, [errors])

    return (
        <Autocomplete
            freeSolo
            options={options.map((option) => ({
                ...option,
                label: `${option.product_name} (${option.productMeta.vendor_name})`,
            }))}
            getOptionLabel={(option) => option.label}
            key={option => option.id}
            value={getValues(name) || null}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    error={!!errors[name]}
                    helperText={errors[name]?.message || ''}
                />
            )}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
        />
    );
};

export default ProductAutocomplete;
