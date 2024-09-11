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
  } from '@mui/material';
import React from 'react'
import { SatagingInventoryDefaultStatus } from '../../utils/Constant'
import Swal from 'sweetalert2';
import { SatagingInventoryItemStatusChange } from '../../utils/fetch';

function SatagingInventoryItemDetails({row,stagingInventoryRefetch}) {


    const handleStatusChange = (item_id, status) => {
        // console.log(item_id, status);
    
        Swal.fire({
          title: "Are you sure?",
          text: "You wan't to change Sataging inventory item status!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#5936eb",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
      }).then(async (result) => {
    
          if (result.isConfirmed) {
              // var status_selected_obj = orderDefaultStatus.filter((item) => item.label === e.target.value);
              // status_selected_obj = status_selected_obj[0];
              // console.log(e.target.value);
    
              // alert(item_id)
    
              const payload = {
                  "item_id": item_id,
                  "status": status
              };
    
              var response = await SatagingInventoryItemStatusChange(payload);
    
              if(response.result.status === false){
                Swal.fire({
                  text: "Sataging Inventory item status change failed.",
                  icon: "error"
                });
                return;
              }
    
              Swal.fire({
                  text: "Sataging Inventory item status change successfully.",
                  icon: "success"
              });
    
              stagingInventoryRefetch();
    
          }
      });
    
      }


      console.log(row.original)


  return (<>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>SO#</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Farm Price</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row?.original?.awbReceiveDataItems?.map (row => (
              <TableRow
                key={row.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.product_name}</TableCell>
                <TableCell><img src={row.image_url} alt='' width={"50px"} height={"50px"} /></TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.color}</TableCell>
                <TableCell>#{row.so}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.farm_price}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>
                  {/* {row.status} */}
                  <Select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  variant="outlined"
                  size="small"
                  className={`dropdown`}
                  disabled={row.status === 'transfer'}
                >
                  {SatagingInventoryDefaultStatus.map(status => (
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
  </>)
}

export default SatagingInventoryItemDetails
