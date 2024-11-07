// components
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";


import logo from "../../assests/images/logo-img.jpeg";
import loginimage from "../../assests/images/login.png";


import { fmiOrderSystemAppAppLogin } from "../../utils/fetch";

function UserLogin(props) {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const { loginEmail, loginPassword } = data;

    const fetcLoginResponse = await fmiOrderSystemAppAppLogin(
      loginEmail,
      loginPassword
    );

    if (fetcLoginResponse) {
      props.getLoginResponse(true);
    } else {
      alert("Error: Something went wrong");
    }
    setLoading(false);
  };

  return (

    <Grid
      container
      spacing={0}
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${loginimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        minWidth: "100vw",
      }}
    >
      <Grid item xs={12} sm={8} md={3}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem",
            boxShadow: 3,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <CardMedia
            component="img"
            image={logo}
            alt="Logo"
            sx={{ maxWidth: 250, maxHeight: 250, marginBottom: 2 }}
          />
          <Typography variant="h5" component="h2" gutterBottom>
            Login
          </Typography>

          <CardContent sx={{ width: "100%" }}>
            {/* Username field with validation */}
            <Controller
              name="loginEmail"
              control={control}
              rules={{
                required: "Please fill out this field",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Username"
                  variant="outlined"
                  error={!!errors.loginEmail}
                  helperText={errors.loginEmail ? errors.loginEmail.message : ""}
                  autoComplete="off"
                />
              )}
            />

            {/* Password field with validation */}
            <Controller
              name="loginPassword"
              control={control}
              rules={{
                required: "Please fill out this field",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Password"
                  variant="outlined"
                  type="password"
                  error={!!errors.loginPassword}
                  helperText={errors.loginPassword ? errors.loginPassword.message : ""}
                  autoComplete="off"
                />
              )}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              fullWidth
              sx={{ marginTop: 2 }}
              disabled={loading}
              startIcon={(loading && <CircularProgress size={24} sx={{ color: "white" }} />)}
            >
              LOGIN
            </Button>

            {loading && (
              <CircularProgress size={24} sx={{ color: "white" }} />
            )}

          </CardContent>
        </Card>
      </Grid>
    </Grid>

  );
}

export default UserLogin;
