import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { deleteCustomerAddressApi } from "../../utils/fetch";
import { toast } from "react-toastify";

const ConfirmDelete = ({
  setIsDelete,
  deleteAddressId,
  setIsAddressModel,
  refetch,
}) => {
  const handleAccept = async () => {
    console.log("Accept action triggered");

    try {
      const response = await deleteCustomerAddressApi(deleteAddressId);

      if (response.status == true) {
        setIsAddressModel(false);
        refetch();
        toast.success("Successfully Deleted");
      } else {
        toast.error("Failed to delete try again later");
        setIsDelete(false);
      }
    } catch (error) {
      toast.error("Failed to delete try again later");
    }
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
            variant="contained"
            color="success"
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
