import React from "react";
import { Box, Grid, Typography, IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function UserInfoCard({ setIsInfo, infoData }) {
  const userInfo = [
    // { label: "Identification", value: "123456789" },
    { label: "Name", value: infoData.name || "" },
    { label: "Email", value: infoData.email || "" },
    { label: "Phone", value: infoData.phone || "" },
    { label: "Contact 1", value: infoData.contact_one || "" },
    { label: "Contact 2", value: infoData.contact_two || "" },
    { label: "Address Type", value: infoData.address_type || "" },
    { label: "Address 1", value: infoData.address1 || "" },
    { label: "Address 2", value: infoData.address2 || "" },
    { label: "Country", value: infoData.country || "" },
    { label: "State", value: infoData.state || "" },
    { label: "City", value: infoData.city || "" },
    { label: "ZipCode", value: infoData.zipcode || "" },
    { label: "User Address Type", value: infoData.user_addr_type || "" },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        position: "relative",
        maxWidth: 800,
        width: "90%",
        margin: "auto",
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={() => setIsInfo(false)}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
        color="error"
      >
        <CloseIcon />
      </IconButton>

      {/* Title */}
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2, textAlign: "center" }}
      >
        Information
      </Typography>

      {/* User Info */}
      <Grid container spacing={2}>
        {userInfo.map((item, index) => (
          <Grid container item xs={12} key={index}>
            <Grid item xs={6}>
              <Typography variant="body2" fontWeight="bold">
                {item.label}:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {item.value}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
