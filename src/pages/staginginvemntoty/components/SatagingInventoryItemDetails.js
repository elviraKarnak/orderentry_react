import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import { SatagingInventoryDefaultStatus } from "../../../utils/Constant";
import Swal from "sweetalert2";
import { SatagingInventoryItemStatusChange } from "../../../utils/fetch";

function SatagingInventoryItemDetails({ row, stagingInventoryRefetch }) {
  const handleStatusChange = (item_id, status) => {
    // console.log(item_id, status);


    Swal.fire({
      title: "Are you sure?",
      text: "You wan't to change Sataging inventory item status!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5936eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // var status_selected_obj = orderDefaultStatus.filter((item) => item.label === e.target.value);
        // status_selected_obj = status_selected_obj[0];
        // console.log(e.target.value);

        // alert(item_id)

        const payload = {
          item_id: item_id,
          status: status,
        };

        var response = await SatagingInventoryItemStatusChange(payload);

        console.log(response)

        if (response.result.status === false) {
          Swal.fire({
            // text: "Sataging Inventory item status change failed.",
            text: response.result.msg,
            icon: "error",
          });
          return;
        }

        Swal.fire({
          text: "Sataging Inventory item status change successfully.",
          icon: "success",
        });

        stagingInventoryRefetch();
      }
    });
  };

  console.log(row.original);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell>Vendor Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>SO#</TableCell>
              <TableCell>PO#</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Farm Price</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row?.original?.inhouseProductEntryDataItems?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell>
                  <img
                    src={item.product_image}
                    alt=""
                    width={"50px"}
                    height={"50px"}
                  />
                </TableCell>
                <TableCell>{item.product_name}</TableCell>
                <TableCell>{item.vendor_name}</TableCell>
                <TableCell>{item.product_category}</TableCell>
                <TableCell>{item.product_color}</TableCell>
                <TableCell>{item.so ? `#${item.so}` : ""}</TableCell>
                <TableCell>{item.po ? `#${item.po}` : ""}</TableCell>
                <TableCell>
                  {/* {item.boxes} {item.box_type} */}
                  {item.quantity} {item.box_type}
                </TableCell>
                <TableCell>{item.farm_price}</TableCell>
                <TableCell>{item.total_price}</TableCell>
                <TableCell>{item.date_received}</TableCell>
                <TableCell>
                  {/* {item.status} */}
                  <Select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    variant="outlined"
                    size="small"
                    className={`dropdown`}
                    disabled={item.status === "transferred" || row?.original?.awb === null}
                  >
                    {SatagingInventoryDefaultStatus.map((status) => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label} 
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SatagingInventoryItemDetails;
