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
import { AddcustomerAddressApi } from "../../utils/fetch";
import { editCustomerAddressApi } from "../../utils/fetch";
import { toast } from "react-toastify";

const AddressForm = ({ setIsEditOrAdd, form, refetch, setIsAddressModel }) => {
  console.log("====== This is form state =====\n", form);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: form.data.name || "",
      email: form.data.email || "",
      phone: form.data.phone || "",
      contact_one: form.data.contact_one || "",
      contact_two: form.data.contact_two || "",
      address_type: form.data.address_type || "residential",
      address1: form.data.address1 || "",
      address2: form.data.address2 || "",
      country: form.data.country || "",
      state: form.data.state || "",
      city: form.data.city || "",
      zipcode: form.data.zipcode || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (form.formType == "New") {
        data.user_id = form.user_id;
        data.user_addr_type = form.addressType == "Billing" ? "bill" : "ship";

        const resonse = await AddcustomerAddressApi(data);

        if (resonse.status == true) {
          toast.success("Successfully Added");
          setIsEditOrAdd(false);
          refetch();
          setIsAddressModel(false);
        } else {
          toast.error("Failed to add try again later");
        }
      } else {
        const response = await editCustomerAddressApi(data, form.data.id);
        if (response.status == true) {
          toast.success("Successfully Edited");
          setIsEditOrAdd(false);
          refetch();
          setIsAddressModel(false);
        } else {
          toast.error("Failed to Edit try again later");
        }
      }
    } catch (error) {
      toast.error("In Catch: Failed to add");
      console.log("Error while adding or editing customer address", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 600,
        width: "90%",
        maxHeight: 900,
        height: "82%",
        mx: "auto",
        p: 4,
        backgroundColor: "white",
        borderRadius: "10px",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {form.addressType} Address
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Name" fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Email" fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Phone" fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="contact_one"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Contact 1" fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="contact_two"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Contact 2" fullWidth size="small" />
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

        {/* <Grid item xs={12} sm={6}>
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
                <MenuItem
                  value={`${form.addressType == "Billing" ? "bill" : "ship"}`}
                >
                  {form.addressType}
                </MenuItem>
              </TextField>
            )}
          />
        </Grid> */}

        <Grid item xs={12} sm={12}>
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button
            variant="contained"
            color="error"
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
