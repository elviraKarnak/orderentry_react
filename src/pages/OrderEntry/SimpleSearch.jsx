import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CircleRight from "../../assests/images/arrow-alt-circle-right.png";
import IonicIos from "../../assests/images/ionic-ios-add-circle.png";
import CustomerCreateModalForm from "../../compoments/customer/CreateModalForm";
import CustomerEditModalForm from "../../compoments/customer/EditModalForm";
// import CustomerSelectDropdown from "../../compoments/customer/CustomerSelectDropdown";
import CustomerAutoSearch from "../../compoments/customer/CustomerAutoSearch";
import customerService from "../../services/customer.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import Loader from "../Loader/CommonLoader";
import Header from "../../common/Header";
import { userContext } from "../../Store";



function SimpleSearch() {
  // const [CustomerData, setCustomerData] = useState([]);
  const [SelectCustomerData, setSelectCustomerData] = useState(null);
  const [Step, setStep] = useState(1);
  const [EditModalChangeStatus, setEditModalChangeStatus] = useState(false);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const { userState, dispatch } = useContext(userContext);

  // const getCustomerList = async () => {
  //   var responce = await customerService.findAll("");
  //   setCustomerData(responce.data.data)
  // }

  // useEffect(() => {
  //   getCustomerList();
  // }, [EditModalChangeStatus])

  const selectedSingleCustomerGet = async (id) => {
    // alert(1)

    var responce = await customerService.findOne(id);
    if (responce.data.status) {
      // console.log(responce.data.data[0])
      navigate("/new-order", { state: { selectCustomerData: responce.data.data[0] } });
    } else {
      toast.error(responce.data.msg)
    }

  }


  const shipMethodChnage = async (e) => {
    setLoader(true);
    var value = e.target.value;
    var id = SelectCustomerData.ship_addr.id;

    var responce = await customerService.updateShipMethod({
      ship_method: value,
      id: id
    });
    setLoader(false)
  }

  useEffect(() => {
    dispatch({ type: "order_data_reset", value: "" });
  }, []);


  return (
    <>
      {loader && <Loader />}
      {/* =================== status-publish ================================ */}

      <Header />

      <div className="order-search">
        <h1>Orders Entry</h1>
        <span>Start an order for a customer.</span>
        <div className="search-box">
          <Form>
            <Row>
              <Col lg={6}>

                {/* <CustomerSelectDropdown options={CustomerData} setSelectCustomerData={setSelectCustomerData} EditModalChangeStatus={EditModalChangeStatus} /> */}

                <CustomerAutoSearch setSelectCustomerData={setSelectCustomerData} EditModalChangeStatus={EditModalChangeStatus} />

                {/* {SelectCustomerData != null && console.log(SelectCustomerData)} */}

              </Col>
              <Col lg={3}>
                {/* <Link to="/order-entry-advance">
                  <button type="button">Advance search
                    <img src={CircleRight} alt="" className="circle-right" />
                  </button>
                </Link> */}
              </Col>
            </Row>

            {/* {SelectCustomerData === null && <>
              <Row>
                <Col lg={10} className="text-center">
                  <div className="create-btn-sec">
                    <img src={IonicIos} alt="" />
                    <Button className="create-btn"
                      data-bs-toggle="modal"
                      data-bs-target=".customer-create-form">
                      Create new customer
                    </Button>
                  </div>
                </Col>
              </Row>
            </>} */}

          </Form>

          {/* ============== select customer show ============== */}
          {SelectCustomerData != null && <>
            <div className="billing-grid">
              <div className="row">
                <div className="col-lg-6">
                  <div className="bill-info">
                    <small>Bill to</small>
                    <h3>{SelectCustomerData?.company_name}</h3>
                    <h4>{SelectCustomerData?.firstname} {SelectCustomerData?.lastname}</h4>
                    <span>
                      Customer# <strong>{SelectCustomerData?.customer_no}</strong>
                    </span>
                    <p>
                      <a href={`mailto:${SelectCustomerData?.email}`}>
                        {SelectCustomerData?.email}
                      </a>
                    </p>
                    <p

                      className="green-link"
                      data-bs-toggle="modal"
                      data-bs-target=".customer-edit-form"
                      onClick={() => setStep(1)}
                    >
                      Edit The Flower Shop. Choose A Different Customer
                    </p>



                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="bill-info">
                    <small>Ship to</small>
                    <h3>{SelectCustomerData?.company_name}</h3>
                    <h4>{SelectCustomerData?.ship_addr.ship_contact_name}</h4>
                    <h4>
                      {SelectCustomerData.ship_addr.ship_addr_1 && <>{SelectCustomerData.ship_addr.ship_addr_1},</>}

                      {SelectCustomerData.ship_addr.ship_addr_2 && <>{SelectCustomerData.ship_addr.ship_addr_2},</>}

                      {SelectCustomerData.ship_addr.ship_country_name && <>{SelectCustomerData.ship_addr.ship_country_name},</>}

                      {SelectCustomerData.ship_addr.ship_state_name && <>{SelectCustomerData.ship_addr.ship_state_name},</>}

                      {SelectCustomerData.ship_addr.ship_city_name && <>{SelectCustomerData.ship_addr.ship_city_name},</>}

                      {SelectCustomerData.ship_addr.ship_zip_code && <>{SelectCustomerData.ship_addr.ship_zip_code}</>}

                    </h4>
                    <p className="green-link edit-shiping" data-bs-toggle="modal"
                      data-bs-target=".customer-edit-form" onClick={() => setStep(3)} >
                      Edit Shipping Address
                    </p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="bill-info">
                    <small>Ship Method</small>
                    <div className="select-box">
                      <select className="form-select" onChange={shipMethodChnage}>

                        <option selected="">select</option>
                        <option selected={SelectCustomerData?.ship_addr.ship_method === "fob" ? "selected" : ""} value={"fob"}>FOB</option>
                        <option selected={SelectCustomerData?.ship_addr.ship_method === "fedex" ? "selected" : ""} value={"fedex"}>FedEx Priority</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>}

        </div>
      </div>
      <div className="text-md-end">
        <Button disabled={SelectCustomerData != null ? false : true} className={`new-order-btn btn  ${SelectCustomerData != null ? "green" : "btn-info"}`}
          onClick={() => selectedSingleCustomerGet(SelectCustomerData?.id)}
        >
          Start new order
        </Button>
      </div>

      {/* ====== modal ======== */}
      <CustomerCreateModalForm />
      {SelectCustomerData != null && <CustomerEditModalForm id={SelectCustomerData?.id} Step={Step} setEditModalChangeStatus={setEditModalChangeStatus} EditModalChangeStatus={EditModalChangeStatus} />}




    </>
  );
}

export default SimpleSearch;
