import React from "react";
import { Box, Grid, Typography, IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function UserInfoCard({ setIsInfo }) {
  const userInfo = [
    { label: "Identification", value: "123456789" },
    { label: "Name", value: "Bootdey" },
    { label: "Lastname", value: "Bootstrap" },
    { label: "Username", value: "bootnipets" },
    { label: "Role", value: "Admin" },
    { label: "Email", value: "noreply@email.com" },
    { label: "Created", value: "20 Jul 20014" },
    { label: "Modified", value: "20 Jul 20014 20:00:00" },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        position: "relative",
        maxWidth: 600,
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
            <Grid item xs={4}>
              <Typography variant="body2" fontWeight="bold">
                {item.label}:
              </Typography>
            </Grid>
            <Grid item xs={8}>
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
