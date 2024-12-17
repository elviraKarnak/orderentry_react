import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";

const ConfirmDelete = ({ setIsDelete }) => {
  const handleCancel = () => {
    console.log("Cancel action triggered");
  };

  const handleAccept = () => {
    console.log("Accept action triggered");
  };

  return (
    <Box
      sx={{
        p: 5,
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "400px",
        mx: "auto",
        mt: 4,
        textAlign: "center",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h6" gutterBottom mb={5}>
        You want to Delete this Address?
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsDelete(false)}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="error" onClick={handleAccept}>
            Accept
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfirmDelete;
