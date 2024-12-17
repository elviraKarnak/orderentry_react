import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Typography,
  Button,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import EditAddressFormModel from "./EditAddressForm.model";
import InfoModel from "./Info.model";
import DeleteAddressModel from "./ConfirmDeleteAddress.model";

const UserAddressCard = ({
  type,
  addressInfo,
  setIsInfo,
  setIsEditOrAdd,
  setIsDelete,
}) => {
  return (
    <Card
      sx={{
        minWidth: 250,
        padding: 1,
        flex: "0 0 auto",
        boxShadow: "3",
      }}
    >
      {/* Address Details */}
      <Checkbox color="success" title="Mark as Default" />

      <CardContent>
        <Box display="flex" gap={2} flexDirection="column" padding={1}>
          {/* Address Info */}
          <Box flexGrow={1}>
            <Typography>{addressInfo}</Typography>
          </Box>
          {/* Action Buttons */}
          <Box display="flex" gap={1}>
            <IconButton
              color="error"
              size="small"
              title="delete"
              onClick={() => setIsDelete(true)}
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              color="primary"
              size="small"
              title="edit"
              onClick={() => setIsEditOrAdd(true)}
            >
              <EditIcon />
            </IconButton>

            <Button
              size="small"
              color="inherit"
              variant="outlined"
              onClick={() => setIsInfo(true)}
            >
              Show More...
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const UserAddressSection = ({
  type,
  addresses,
  setIsEditOrAdd,
  setIsInfo,
  setIsDelete,
}) => {
  return (
    <Box>
      {/* Address Type Header with Add Button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Typography variant="h6" sx={{ fontWeight: "800" }}>
          {type} Address
        </Typography>
        <IconButton
          color="primary"
          size="small"
          onClick={() => setIsEditOrAdd(true)}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>

      {/* Single Row Scrollable Container for Address Cards */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: 2,
          paddingBottom: 1,
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "4px",
          },
        }}
      >
        {addresses.map((address, index) => (
          <UserAddressCard
            key={index}
            type={type}
            addressInfo={address}
            setIsInfo={setIsInfo}
            setIsEditOrAdd={setIsEditOrAdd}
            setIsDelete={setIsDelete}
          />
        ))}
      </Box>
    </Box>
  );
};

//  ------------------- main component -------------------------
const UserAddressInfo = ({ setIsAddressModel, selectedCustomer }) => {
  const spanStyle = {
    color: "black",
  };

  const [isEditOrAdd, setIsEditOrAdd] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const shippingAddresses = [
    "Shipping Address 1: 123 Main St, City",
    "Shipping Address 2: 456 Side St, City",
  ];
  const billingAddresses = [
    "Billing Address 1: 789 Billing Rd, City",
    "Billing Address 2: 321 Pay Ln, City",
  ];

  if (isEditOrAdd) {
    return <EditAddressFormModel setIsEditOrAdd={setIsEditOrAdd} />;
  }
  if (isInfo) {
    return <InfoModel setIsInfo={setIsInfo} />;
  }
  if (isDelete) {
    return <DeleteAddressModel setIsDelete={setIsDelete} />;
  } else {
    return (
      <Box
        sx={{
          maxWidth: "1000px",
          width: "95%",
          margin: "auto",
          backgroundColor: "white",
          padding: "1rem 2rem",
          borderRadius: "10px",
        }}
      >
        {/* Selected User Info Header */}

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            aria-label="close"
            color="error"
            title="Close"
            onClick={() => setIsAddressModel(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="primary">
            <Box display="block">
              <div>
                Name:{" "}
                <span style={spanStyle}>
                  {selectedCustomer.user_first_name}{" "}
                  {selectedCustomer.user_last_name}
                </span>
              </div>
              <div>
                Email: <span style={spanStyle}>{selectedCustomer.email}</span>{" "}
              </div>
              <div>
                Phone:{" "}
                <span style={spanStyle}>{selectedCustomer.user_phone}</span>
              </div>
              <div>
                Company:{" "}
                <span style={spanStyle}>{selectedCustomer.company}</span>
              </div>
            </Box>
          </Typography>
        </Box>

        <Divider sx={{ marginTop: "0.1rem", marginBottom: "0.1rem" }} />

        {/* Address Sections */}
        <UserAddressSection
          type="Billing"
          addresses={billingAddresses}
          setIsEditOrAdd={setIsEditOrAdd}
          setIsInfo={setIsInfo}
          setIsDelete={setIsDelete}
        />
        <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />

        <UserAddressSection
          type="Shipping"
          addresses={shippingAddresses}
          setIsEditOrAdd={setIsEditOrAdd}
          setIsInfo={setIsInfo}
          setIsDelete={setIsDelete}
        />
      </Box>
    );
  }
};

export default UserAddressInfo;
