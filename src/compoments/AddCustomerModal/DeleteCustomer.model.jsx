import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { deleteCustomerApi } from "../../utils/fetch";

import { toast } from "react-toastify";

const DeleteCustomer = ({ customerId, setIsDeleteModel, refetch }) => {
  console.log("delete this customer id", customerId);

  const handleDeleteCustomer = async () => {
    try {
      const response = await deleteCustomerApi(customerId);
      if (response.status === true) {
        setIsDeleteModel(false);
        toast.success("Customer Deleted Successfully");
        refetch();
      } else {
        toast.error("Failed to delete Customer");
        setIsDeleteModel(false);
      }
    } catch (error) {
      console.log("error", error);
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
        You want to Delete this Customer?
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="success"
            onClick={() => setIsDeleteModel(false)}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteCustomer}
          >
            Accept
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeleteCustomer;
