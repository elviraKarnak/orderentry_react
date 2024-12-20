import React, { useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function UserInfoCard({ setIsInfo, infoData }) {
  const userInfoRef = useRef(); // Reference for the section to export as PDF

  const userInfo = [
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

  const downloadPDF = async () => {
    const element = userInfoRef.current; // Get the element

    // Use html2canvas to capture the element as a canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Increase scale for better resolution
      useCORS: true, // Allow cross-origin resources
    });

    // Get the image data from the canvas
    const imgData = canvas.toDataURL("image/jpeg", 0.7); // Use JPEG with 70% quality to reduce size

    // Initialize jsPDF
    const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size

    // Calculate dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // Account for 10mm margin on each side
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add image to PDF with margins
    const xOffset = 10; // 10mm left margin
    const yOffset = 10; // 10mm top margin
    pdf.addImage(imgData, "JPEG", xOffset, yOffset, pdfWidth, pdfHeight);

    // Save the PDF with a dynamic name
    pdf.save(
      `${infoData.name || "UserInfo"}_${infoData.user_addr_type}_address.pdf`
    );
  };

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
        color={"primary"}
        sx={{ mb: 2, textAlign: "center" }}
      >
        Customer Information
      </Typography>

      {/* User Info Section */}
      <div ref={userInfoRef}>
        <Grid container spacing={2}>
          {userInfo.map((item, index) => (
            <Grid
              container
              item
              xs={12}
              key={index}
              sx={{ borderBottom: "1px dotted rgb(0,0,0,0.3)" }}
            >
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.secondary"
                >
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
      </div>

      {/* Download Button */}
      <Box mt={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={downloadPDF}>
          Download as PDF
        </Button>
      </Box>
    </Paper>
  );
}
