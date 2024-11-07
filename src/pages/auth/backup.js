// components
import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";

// files
import loginimage from "../../assests/images/login.png";
import logo from "../../assests/images/logo-img.jpeg";

// functions
import { fmiOrderSystemAppAppLogin } from "../../utils/fetch";

function UserLogin(props) {
  const requiredErrorMessage = "Please Fill Out This Feild";

  const [requiredLoginEmail, setrequiredLoginEmail] = useState("hidden");
  const [requiredLoginPassword, setrequiredLoginPassword] = useState("hidden");
  const [emailValidatorText, setemailValidatorText] = useState("hidden");

  const [loginEmail, setloginEmail] = useState("");
  const [loginPasswoard, setloginPasswoard] = useState("");

  //login functions
  const loginEmaiHandaler = (e) => {
    setloginEmail(e.target.value);
    setemailValidatorText("hidden");
    setrequiredLoginEmail("hidden");
  };
  const loginPasswoardHandaler = (e) => {
    setloginPasswoard(e.target.value);
    setrequiredLoginPassword("hidden");
  };
  // login submit
  const onLoginFormSubmit = (e) => {
    const loginEmailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (loginEmail === "") {
      setrequiredLoginEmail("visiable");
    } else {
      setrequiredLoginEmail("hidden");
      if (!loginEmailPattern.test(loginEmail)) {
        setemailValidatorText("visiable");
      } else {
        setemailValidatorText("hidden");
      }
    }
    loginPasswoard === ""
      ? setrequiredLoginPassword("visiable")
      : setrequiredLoginPassword("hidden");

    if (
      loginEmail === "" ||
      !loginEmailPattern.test(loginEmail) ||
      loginPasswoard === ""
    ) {
      return;
    }
    async function getLoginResponse() {
      const fetcLoginResponse = await fmiOrderSystemAppAppLogin(
        loginEmail,
        loginPasswoard
      );
      if (fetcLoginResponse) {
        props.getLoginResponse(true);
      } else {
        alert(`Error: Something went wrong`);
      }
    }
    getLoginResponse();
  };
  return (
    <Container maxWidth="ex">
      <Card sx={{ display: "flex" }}>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid md={6}>
            <CardContent className="form_container">
              <CardMedia component="img" image={logo} alt="FlowerMarketPlace" />
              <Typography component="h2">Login</Typography>
              <FormGroup className="logoin-form">
                <FormControl className="formControl">
                  <InputLabel htmlFor="tickets">Username</InputLabel>
                  <Input
                    id="loginemail"
                    type="text"
                    value={loginEmail}
                    onChange={loginEmaiHandaler}
                  />
                  <FormHelperText className={requiredLoginEmail}>
                    <span className="requiredError">
                      {requiredErrorMessage}
                    </span>
                  </FormHelperText>
                  <FormHelperText className={emailValidatorText}>
                    <span className="validationError">Enter Valid Email</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <FormControl className="formControl">
                  <InputLabel htmlFor="tickets">Password</InputLabel>
                  <Input
                    id="loginpass"
                    value={loginPasswoard}
                    type="password"
                    onChange={loginPasswoardHandaler}
                  />
                  <FormHelperText className={requiredLoginPassword}>
                    <span className="requiredError">
                      {requiredErrorMessage}
                    </span>
                  </FormHelperText>
                </FormControl>
              </FormGroup>
              <br /> <br />
              <Button
                variant="contained"
                color="primary"
                onClick={onLoginFormSubmit}
                className="loginlogoutbtn"
              >
                LOGIN
              </Button>
            </CardContent>
          </Grid>
          <Grid md={6}>
            <CardMedia
              component="img"
              image={loginimage}
              alt="FlowerMarketPlace"
            />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default UserLogin;
