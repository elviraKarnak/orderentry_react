import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const AddressForm = ({ setIsEditOrAdd }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      address_type: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      zipcode: "",
      user_addr_type: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Address Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="address1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address Line 1"
                fullWidth
                size="small"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="address2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address Line 2"
                fullWidth
                size="small"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="address_type"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address Type"
                select
                fullWidth
                size="small"
              >
                <MenuItem value="residential">Residential</MenuItem>
                <MenuItem value="airport">Airport</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Country" fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="State" fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="City" fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="zipcode"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Zip Code" fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="user_addr_type"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address Type (Billing/Shipping)"
                select
                fullWidth
                size="small"
              >
                <MenuItem value="bill">Billing</MenuItem>
                <MenuItem value="ship">Shipping</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button
            variant="outlined"
            type="button"
            fullWidth
            onClick={() => setIsEditOrAdd(false)}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressForm;
