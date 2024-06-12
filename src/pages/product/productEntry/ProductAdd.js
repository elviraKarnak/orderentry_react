import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


// packages
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import Swal from 'sweetalert2';
import { Country, State, City } from "country-state-city";
import { Link } from 'react-router-dom';
import { fmiOrderSystemAppProductAdd } from '../../../utils/fetch.js';
import axios from 'axios';


const Schema = yup.object({
    product_name: yup.string().trim().required("This field is required"),
    price: yup.string().trim().required("This field is required"),
    fob_price: yup.string().trim().required("This field is required"),
    landed_price: yup.string().trim().required("This field is required"),
    image_title: yup.string().trim().required("This field is required"),
    image_alt: yup.string().trim().required("This field is required"),
    stock: yup.string().trim().required("This field is required"),
    min_stock: yup.string().trim().required("This field is required"),
    stock_range: yup.string().trim().required("This field is required"),
    unit: yup.string().trim().required("This field is required"),
    cat_id: yup.string().trim().required("This field is required"),
    product_tags: yup.string().trim().required("This field is required"),
    source: yup.string().trim().required("This field is required"),
    product_color: yup.string().trim().required("This field is required"),

    // product_image: yup.string().trim().required("This field is required"),

});



export default function ProductAdd() {

    const [Category, setCategory] = useState([{ name: "cat1" }]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        getValues
    } = useForm({
        resolver: yupResolver(Schema),
    });


    const onSubmit = async (data) => {

        console.log(data.product_image)

        // const formdata = new FormData();

        // // // Append data fields to FormData
        // Object.entries(data).forEach(([key, value]) => {
        //     formdata.append(key, value);
        // });

        

        const formdata = new FormData();
        formdata.append("product_name", "New product today latest1235");
        formdata.append("price", "11.00");
        formdata.append("fob_price", "0.00");
        formdata.append("landed_price", "2.40");
        if (data.product_image) {
            formdata.append("product_image", data.product_image);
        }
        formdata.append("image_title", "test image title another");
        formdata.append("image_alt", "image alt tag");
        formdata.append("stock", "32");
        formdata.append("min_stock", "8");
        formdata.append("stock_range", "40");
        formdata.append("unit", "Stems");
        formdata.append("cat_id", "3,1,4");
        formdata.append("product_tags", "tag two, tag three");
        formdata.append("source", "Miami");
        formdata.append("product_color", "Yellow, blue, green, Black")

        // ///////////////////////////////////////////////

        // for(var pair of formdata.entries()) {
        //     console.log(pair[0]+ ', '+ pair[1]); 
        //  }

        // var response = await fmiOrderSystemAppProductAdd(formdata);



        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://fmiordersystem-new-backend.elvirainfotech.org/api/v1/admin/product/add',
            headers: { 
              'x-api-key': 'b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9', 
              'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzE1Nzc3MDgzLCJleHAiOjE3MTU4NjM0ODN9.f_RcZ0XQKvdRcSRpahvtuCNYV71u9UYwG8qWun8wGNU', 
              'Content-Type': 'multipart/form-data', 
            },
            data : formdata
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });



    }


    return (<>
        <Container maxWidth="ex">

            <Grid container
                spacing={0}
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh' }}
            >
                <Grid md={12}>
                    <CardContent className="form_container">

                        <Typography component="h2">Product Add</Typography>
                        <br />

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup className="logoin-form">

                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Product Name
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        {...register('product_name')}
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.product_name?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />

                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Price
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        {...register('price')}
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.price?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />

                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Fob Price
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        {...register('fob_price')}
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.fob_price?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />

                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Landed Price
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        {...register('landed_price')}
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.landed_price?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />

                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Product Image
                                    </InputLabel>
                                    <Input
                                        type="file"
                                        {...register('product_image')}
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.product_image?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />

                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Image Title
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        {...register('image_title')}
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.image_title?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />

                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Image Alt
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        {...register('image_alt')}
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.image_alt?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />

                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Stock
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        {...register('stock')}
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.stock?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />

                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Min Stock
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        {...register('min_stock')}
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.min_stock?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />


                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Stock Range
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        {...register('stock_range')}
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.stock_range?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />


                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Unit
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        {...register('unit')}
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.unit?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />


                                <FormControl className="formControl">
                                    <InputLabel id="cat_id-select-label">Category</InputLabel>
                                    <Select
                                        labelId="cat_id-select-label"
                                        id="demo-simple-select"
                                        label="cat_id"
                                        {...register('cat_id')}
                                    >
                                        {Category.map((item, index) => (<MenuItem
                                            key={index}
                                            value={item.name}>{item.name}</MenuItem>))}
                                    </Select>

                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.cat_id?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />


                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Product Tags
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        {...register('product_tags')}
                                        placeholder='tag two, tag three'
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.product_tags?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />


                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Source
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        {...register('source')}
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.source?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                                <br />


                                <FormControl className="formControl">
                                    <InputLabel htmlFor="tickets">
                                        Product Color
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        placeholder='Yellow, blue, green, Black'
                                        {...register('product_color')}
                                    />
                                    <FormHelperText className={""}>
                                        <span className="requiredError">{errors.product_color?.message}</span>
                                    </FormHelperText>
                                </FormControl>

                            </FormGroup>
                            <br />
                            <br />
                            <Button type='submit' variant="contained" color="primary" >Submit</Button>

                        </form>
                    </CardContent>
                </Grid>
            </Grid>

        </Container>
    </>)
}
