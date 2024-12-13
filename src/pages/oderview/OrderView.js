import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Orderdatatable from "./Orderdatatable";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import Header from "../../common/Header";

// redux
import { useDispatch } from "react-redux";
import { commonActions } from "../../redux/reducers/Common";
import AddCustomer from "../../compoments/AddCustomerModal/AddCustomer.modal";

function OrderView() {
  const dispatch = useDispatch();
  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    dispatch(commonActions.setPageTitle("Order View"));
  }, []);

  return (
    <>
      {isModelOpen &&
        ReactDOM.createPortal(
          <div
            style={{
              width: "100%",
              height: "100vh",
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "1000",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddCustomer setIsModelOpen={setIsModelOpen} />
          </div>,
          document.getElementById("portal-root")
        )}
      <div>
        <div className="data_table-head">
          <Grid container spacing={2}>
            <Grid md={7}>
              <div className="order_sum-row">
                <div>
                  <Typography variant="h3" className="title">
                    Orders
                  </Typography>
                </div>
                <div className="order_sumr_block">
                  <List>
                    <ListItem>
                      <span className="title">Sales Period Total</span>
                      <label className="value">$24,793.01</label>
                    </ListItem>
                    <ListItem>
                      <span className="title">Sales Range</span>
                      <label className="date">10/21/21 to 10/30/21</label>
                    </ListItem>
                  </List>
                </div>
              </div>
            </Grid>
            <Grid md={5}>
              <div className="btn_parent-auto">
                <List className="btn_group-block">
                  <ListItem>
                    <Button className="btn_cro">
                      <Link to="/order-entry">Create new order</Link>
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      className="btn_nc"
                      onClick={() => setIsModelOpen(true)}
                    >
                      Create new customer
                    </Button>
                  </ListItem>
                </List>
              </div>
            </Grid>
          </Grid>
          <div className="container-fluid">
            <Orderdatatable />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderView;
