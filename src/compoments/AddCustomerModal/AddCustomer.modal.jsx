import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { customerAddApi } from "../../utils/fetch";
import { customerEditApi } from "../../utils/fetch";
import { customerAddSchema } from "./ValidationSchema";
import { customerEditSchema } from "./ValidationSchema";
import { CUSTOMER_SERVICE_REPRESENTATIVE_LIST } from "../../utils/Constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ResponsiveForm = ({
  setIsModelOpen,
  refetch,
  type,
  selectedCustomer,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [compShowPassword, setCompShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formResolver, setFormResolver] = useState(
    type == "add" ? customerAddSchema : customerEditSchema
  );

  const [formDefaultValue, setFormDefaultValue] = useState(
    type == "add"
      ? {
          email: "",
          username: "",
          user_first_name: "",
          user_last_name: "",
          phone: "",
          customer_serivce_representative: "None",
          customer_no: "",
          user_pass: "",
          user_pass_confirm: "",
          company: "",
        }
      : {
          // email: selectedCustomer.email,
          username: selectedCustomer.username,
          user_first_name: selectedCustomer.user_first_name,
          user_last_name: selectedCustomer.user_last_name,
          phone: selectedCustomer.user_phone,
          customer_serivce_representative:
            selectedCustomer.user_customer_serivce_representative,
          customer_no: selectedCustomer.user_customer_no,
          user_pass: "",
          user_pass_confirm: "",
          company: selectedCustomer.company,
        }
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: formDefaultValue,
    resolver: yupResolver(formResolver),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      switch (type) {
        case "add":
          if (data.user_pass !== data.user_pass_confirm) {
            toast.error("Password did not match");
            setLoading(false);
            return;
          }

          const responseData = await customerAddApi(data);

          if (responseData.status == true) {
            toast.success("Customer Added Successfully");
            if (refetch) {
              refetch();
              setIsModelOpen(false);
              // setLoading(false);
            } else {
              setIsModelOpen(false);
              // setLoading(false);
            }
          } else {
            // setLoading(false);
            toast.error(
              `${responseData.error.response.data.validation.body.message}`
            );
          }
          break;

        //================== Second case for edit =================
        case "edit":
          if (data.user_pass === "" && data.user_pass_confirm === "") {
            delete data.user_pass;
            delete data.user_pass_confirm;

            const response = await customerEditApi(data, selectedCustomer.id);

            if (response.status == true) {
              toast.success("Customer Updated Successfully");
              refetch();
              setIsModelOpen(false);
              setLoading(false);
            } else {
              toast.error("Failed to update customer");
              setLoading(false);
            }
          } else {
            if (data.user_pass !== data.user_pass_confirm) {
              toast.error("Password did not match");
              setLoading(false);
              return;
            }

            const response = await customerEditApi(data, selectedCustomer.id);
            if (response.status == true) {
              toast.success("Customer Updated Successfully");
              refetch();
              setIsModelOpen(false);
              setLoading(false);
            } else {
              toast.error("Failed to update customer");
              setLoading(false);
            }
          }
          break;
      }
    } catch (error) {
      toast.error(`${error}`);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        width: "100%",
        backgroundColor: "#fff",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        {type == "edit" ? "Update Customer" : "Create New Customer"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Email */}
          {type == "add" && (
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    size="small"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
          )}

          {/* User Name */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  type="text"
                  fullWidth
                  size="small"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
          </Grid>

          {/* user first name */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="user_first_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  size="small"
                  error={!!errors.user_first_name}
                  helperText={errors.user_first_name?.message}
                />
              )}
            />
          </Grid>

          {/* user Last Name */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="user_last_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  size="small"
                  error={!!errors.user_last_name}
                  helperText={errors.user_last_name?.message}
                />
              )}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  fullWidth
                  size="small"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Grid>

          {/* Customer Service Representative */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="customer_serivce_representative"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <InputLabel>Customer Service Representative</InputLabel>
                  <Select {...field} label="Customer Service Representative">
                    {CUSTOMER_SERVICE_REPRESENTATIVE_LIST.map((item, index) => (
                      <MenuItem value={item.value} key={index}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          {/* Customer No */}
          <Grid item xs={6}>
            <Controller
              name="customer_no"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="customer Number"
                  fullWidth
                  type="number"
                  error={!!errors.customer_no}
                  helperText={errors.customer_no?.message}
                  size="small"
                />
              )}
            />
          </Grid>

          {/* user password */}
          <Grid item xs={6}>
            <Controller
              name="user_pass"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="User Password"
                  fullWidth
                  error={!!errors.user_pass}
                  helperText={errors.user_pass?.message}
                  type={showPassword ? "text" : "password"}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* user pass confirm */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="user_pass_confirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  fullWidth
                  type={compShowPassword ? "text" : "password"}
                  error={!!errors.user_pass_confirm}
                  helperText={errors.user_pass_confirm?.message}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setCompShowPassword(!compShowPassword)}
                          edge="end"
                        >
                          {compShowPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* company */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company"
                  fullWidth
                  error={!!errors.company}
                  helperText={errors.company?.message}
                  size="small"
                />
              )}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              Submit
            </Button>
          </Grid>

          {/* Reset Button */}

          <Grid item xs={6}>
            <Button variant="outlined" fullWidth onClick={() => reset()}>
              Reset
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => setIsModelOpen(false)}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ResponsiveForm;
