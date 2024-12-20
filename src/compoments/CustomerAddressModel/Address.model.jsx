import React, { useEffect, useState } from "react";
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
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { toast } from "react-toastify";
import { setDefaultAddressApi } from "../../utils/fetch";
import { getSingleCustomerAddressApi } from "../../utils/fetch";

// ----------------------------- Address card component  START ------------------------->
const UserAddressCard = ({
  type,
  address,
  setIsInfo,
  setInfoData,
  setIsEditOrAdd,
  setIsDelete,
  setForm,
  setIsAddressModel,
  setDeleteAddressId,
  refetch,
}) => {
  console.log("====== Address Card ======\n", address);

  async function handleDefaultAddress() {
    try {
      if (address.primary_addr_status == 1) {
        toast.warning("Already Default Address");
        return;
      } else {
        const response = await setDefaultAddressApi(address.user_id, {
          id: address.id,
          user_addr_type: address.user_addr_type,
        });

        if (response.status == true) {
          toast.success("Successfully Set as Default Address");
          setIsAddressModel(false);
          refetch();
        } else {
          toast.error("Failed to set as Default Address");
        }
      }
    } catch (error) {
      toast.error("Failed to set as Default Address");
    }
  }

  return (
    <Card
      sx={{
        minWidth: 250,
        width: "300px",
        padding: 0,
        flex: "0 0 auto",
        boxShadow: "1",
        border: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      {/* Address Details */}
      <Checkbox
        color="success"
        title={
          address.primary_addr_status == 1
            ? "Default Address"
            : "Mark as Default"
        }
        sx={{ marginBottom: "0" }}
        checked={address.primary_addr_status == 1}
        onClick={handleDefaultAddress}
      />

      <CardContent>
        <Box
          display="flex"
          gap={2}
          flexDirection="column"
          sx={{ padding: "0 1rem" }}
        >
          {/* Address Info */}
          <Box flexGrow={1} sx={{ padding: "0" }}>
            <Typography variant="body1">{address.name},</Typography>
            <Typography variant="body1">
              {address.address1.split("").slice(0, 35).join("") + "..."}
            </Typography>
          </Box>
          {/* Action Buttons */}
          <Box display="flex" gap={1}>
            <IconButton
              color="error"
              size="small"
              title="delete"
              onClick={() => {
                setDeleteAddressId(address.id);
                setIsDelete(true);
              }}
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              color="primary"
              size="small"
              title="edit"
              onClick={() => {
                setForm({
                  data: address,
                  formType: "Edit",
                  addressType: type,
                  user_id: address.user_id,
                });
                setIsEditOrAdd(true);
              }}
            >
              <EditIcon />
            </IconButton>

            <Button
              size="small"
              color="secondary"
              variant="outlined"
              onClick={() => {
                setInfoData(address);
                setIsInfo(true);
              }}
            >
              Show More...
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// XXXXXXXXXXXXXXXXXXX Address card component  END XXXXXXXXXXXXXXXXXXXXXXX

// ----------------------------- Address Section component  START ------------------------->
const UserAddressSection = ({
  type,
  customer,
  setIsEditOrAdd,
  setIsInfo,
  setIsDelete,
  setForm,
  setInfoData,
  setIsAddressModel,
  setDeleteAddressId,
  refetch,
}) => {
  let addresses =
    type == "Billing"
      ? customer.userAddress.bill_addr
      : customer.userAddress.ship_addr;

  // addresses = ["sample address"];

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
          onClick={() => {
            setForm({
              data: {},
              formType: "New",
              addressType: type,
              user_id: customer.id,
            });
            setIsEditOrAdd(true);
          }}
        >
          <AddCircleOutlineIcon fontSize="medium" />
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
        {addresses.length > 0 ? (
          addresses.map((address, index) => {
            console.log("====== single address ======\n", address);
            return (
              <UserAddressCard
                key={index}
                type={type}
                address={address}
                setIsInfo={setIsInfo}
                setInfoData={setInfoData}
                setIsEditOrAdd={setIsEditOrAdd}
                setIsDelete={setIsDelete}
                setForm={setForm}
                setIsAddressModel={setIsAddressModel}
                setDeleteAddressId={setDeleteAddressId}
                refetch={refetch}
              />
            );
          })
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              height: "100%",
              padding: 3,
              border: "1px dashed #ccc",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "700", marginBottom: 1 }}
            >
              No Addresses
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Add a new address to get started.
            </Typography>
            <IconButton
              color="primary"
              size="large"
              sx={{ marginTop: 2 }}
              onClick={() => {
                setForm({
                  data: {},
                  formType: "New",
                  addressType: type,
                  user_id: customer.id,
                });
                setIsEditOrAdd(true);
              }}
            >
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};
// XXXXXXXXXXXXXXXXXXX Address Section component  END XXXXXXXXXXX

//  ------------------- Main component START ---------------------------->
const UserAddressInfo = ({ setIsAddressModel, selectedCustomer, refetch }) => {
  console.log("===== First customer log ======\n", selectedCustomer);
  const [isEditOrAdd, setIsEditOrAdd] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [infoData, setInfoData] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [deleteAddressId, setDeleteAddressId] = useState();
  const [form, setForm] = useState({
    data: {},
    formType: "", // New || Edit
    addressType: "", // Billling || Shipping
    user_id: "",
  });

  // const [customerAddressList, setCustomerAddressList] = useState();

  // async function fetchCustomerAddress() {
  //   try {
  //     const response = await getSingleCustomerAddressApi(selectedCustomer.id);
  //     // console.log("====== response ======\n", response);
  //     if (response.status == true) {
  //       setCustomerAddressList(response.result);
  //       printAddress();
  //     } else {
  //       toast.error("Failed to fetch customer address");
  //     }
  //   } catch (error) {
  //     toast.error("Failed to fetch customer address");
  //   }
  // }

  // function printAddress() {
  //   console.log(
  //     "====== Single Customer Address List ======\n",
  //     customerAddressList
  //   );
  // }

  // useEffect(() => {
  //   fetchCustomerAddress();
  // }, []);

  const spanStyle = {
    color: "black",
    fontWeight: "400",
  };

  if (isEditOrAdd) {
    return (
      <EditAddressFormModel
        setIsEditOrAdd={setIsEditOrAdd}
        form={form}
        refetch={refetch}
        setIsAddressModel={setIsAddressModel}
      />
    );
  }
  if (isInfo) {
    return (
      <InfoModel
        setIsInfo={setIsInfo}
        infoData={infoData}
        setIsAddressModel={setIsAddressModel}
      />
    );
  }
  if (isDelete) {
    return (
      <DeleteAddressModel
        setIsDelete={setIsDelete}
        refetch={refetch}
        deleteAddressId={deleteAddressId}
        setIsAddressModel={setIsAddressModel}
      />
    );
  } else {
    return (
      <Box
        sx={{
          maxWidth: "1000px",
          width: "95%",
          margin: "auto",
          backgroundColor: "white",
          padding: "1rem 1rem",
          borderRadius: "10px",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ position: "sticky", paddingTop: "1rem" }}>
          <Box sx={{ position: "absolute", right: "0%", top: "0%" }}>
            <IconButton
              aria-label="close"
              color="error"
              title="Close"
              onClick={() => setIsAddressModel(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box>
            <Grid container spacing={0} alignItems="center">
              {/* Name */}
              <Grid item xs={12} sm={6} md={3} spacing={0}>
                <IconButton
                  sx={{
                    color: "#1976d2",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  title="name"
                >
                  <PersonOutlineOutlinedIcon />
                  <span style={spanStyle}>
                    {selectedCustomer.user_first_name}{" "}
                    {selectedCustomer.user_last_name}
                  </span>
                </IconButton>
              </Grid>
              {/* Email */}
              <Grid item xs={12} sm={6} md={3} spacing={0}>
                <IconButton
                  sx={{
                    color: "#1976d2",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  title="email"
                >
                  <EmailOutlinedIcon />
                  <span style={spanStyle}>{selectedCustomer.email}</span>
                </IconButton>
              </Grid>
              {/* Phone */}
              <Grid item xs={12} sm={6} md={3}>
                <IconButton
                  sx={{
                    color: "#1976d2",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  title="phone"
                >
                  <CallOutlinedIcon />
                  <span style={spanStyle}>{selectedCustomer.user_phone}</span>
                </IconButton>
              </Grid>
              {/* Company */}
              <Grid item xs={12} sm={6} md={3}>
                <IconButton
                  sx={{
                    color: "#1976d2",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  title="company"
                >
                  <StoreOutlinedIcon />
                  <span style={spanStyle}>{selectedCustomer.company}</span>
                </IconButton>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ marginTop: "0.1rem", marginBottom: "0.1rem" }} />
        </Box>

        <Box
          sx={{
            overflowY: "auto",
            height: "100%",
            padding: "1rem",
            scrollbarWidth: "none",
          }}
        >
          {/* Address Sections */}

          {/*------------------------- Billling Address section ---------------------------*/}
          <UserAddressSection
            type="Billing"
            customer={selectedCustomer}
            setIsEditOrAdd={setIsEditOrAdd}
            setIsInfo={setIsInfo}
            setInfoData={setInfoData}
            setIsDelete={setIsDelete}
            setForm={setForm}
            setIsAddressModel={setIsAddressModel}
            setDeleteAddressId={setDeleteAddressId}
            refetch={refetch}
          />
          <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />

          {/*------------------------- Shipping Address section ---------------------------*/}
          <UserAddressSection
            type="Shipping"
            customer={selectedCustomer}
            setIsEditOrAdd={setIsEditOrAdd}
            setIsInfo={setIsInfo}
            setInfoData={setInfoData}
            setIsDelete={setIsDelete}
            setForm={setForm}
            setIsAddressModel={setIsAddressModel}
            setDeleteAddressId={setDeleteAddressId}
            refetch={refetch}
          />
        </Box>
      </Box>
    );
  }
};

export default UserAddressInfo;
