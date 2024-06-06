import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import CircleRight from "../../assets/images/arrow-alt-circle-right.png";
import IonicIos from "../../assets/images/ionic-ios-add-circle.png";
import IonicIosSmall from "../../assets/images/iconic-ios-add-circle-small.png";
import Sidebar from "../Sidebar";

import DatePicker, { setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import CustomerSelectDropdown from "../../compoments/customer/CustomerSelectDropdown";
import CustomerAutoSearch from "../../compoments/customer/CustomerAutoSearch";
import customerService from "../../services/customer.service";
import Moment from 'react-moment';
import CustomPagination from '../../compoments/CustomPagination';
import OrderService from '../../services/order.service'
import moment from "moment";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import { userContext } from "../../Store";

setDefaultLocale("es");

function Index() {
  const { userState, dispatch } = useContext(userContext)
  const [TotalPrice, setTotalPrice] = useState(0.00);

  var date = new Date();
  date.setDate(date.getDate() - 7);

  const [FormDate, setFormDate] = useState(date);
  const [ToDate, setToDate] = useState(new Date());


  const [CustomerData, setCustomerData] = useState([]);
  const [SelectCustomerData, setSelectCustomerData] = useState(null);
  const [EditModalChangeStatus, setEditModalChangeStatus] = useState(false);

  const [TableData, setTableData] = useState([]);

  const [AdvanceSearch, setAdvanceSearch] = useState({
    customer_id: '',
    sales_rep_id: '',
    order_status: '',
    order_no: "",
    form_date: null,
    to_date: null,
    limit: 10,
    page_no: 1
  })

  const [othersOption, setOthersOption] = useState({
    activePage: 1,
    itemsCountPerPage: 0,
    totalItemsCount: 0,
    pageRangeDisplayed: 0
  })

  const navigate=useNavigate();


  var order_status_color = (status) => {

    if (status === "saved")
      return { "backgroundColor": "#61B7D6" }

    if (status === "buy")
      return { "backgroundColor": "#A312B1" }

    if (status === "processing")
      return { "backgroundColor": "#aa001d" }

    if (status === "confimed")
      return { "backgroundColor": "#A312B1" }

    if (status === "abandoned")
      return { "backgroundColor": "#d47e0c" }

    if (status === "shipped")
      return { "backgroundColor": "#66B100" }

  }

  // const getCustomerList = async () => {
  //   var responce = await customerService.findAll("");
  //   setCustomerData(responce.data.data)
  // }



  const advanceSearchData = async (pageNumber) => {

    // alert(formDate)

    var payload = {
      customer_id: AdvanceSearch.customer_id,
      order_status: AdvanceSearch.order_status,
      order_no: AdvanceSearch.order_no,
      form_date: moment((AdvanceSearch.form_date ? AdvanceSearch.form_date : FormDate)).format("YYYY-MM-DD"),
      to_date: moment((AdvanceSearch.to_date ? AdvanceSearch.to_date : ToDate)).format("YYYY-MM-DD"),
      limit: AdvanceSearch.limit,
      page_no: pageNumber
    }

    console.log(payload);



    var responce = await OrderService.orderSearch(payload);

    console.log(responce.data)



    var pageObj = {
      activePage: pageNumber,
      itemsCountPerPage: AdvanceSearch.limit,
      totalItemsCount: responce.data.total_count,
      pageRangeDisplayed: responce.data.total_page
    }

    setOthersOption(pageObj);
    setTableData(responce.data.data);
    setTotalPrice(responce.data.total_price)


  }


  const handlePageChange = (pageNumber) => {
    // You can also make an API call or update your data based on the new page number

    advanceSearchData(pageNumber);


  };

  const orderStatus = async (id, order_status) => {

    var payload = {
      id: id,
      order_status: order_status
    }

    var responce = await OrderService.orderStatus(payload);

    if (responce.data.status) {
      toast.success(responce.data.msg)
    }

    handlePageChange(1);

  }

  const disableEditDelete = (status) => {
    if (status === "saved")
      return false

    if (status === "buy")
      return false

    if (status === "abandoned")
      return false

    if (status === "processing")
      return true

    if (status === "confimed")
      return true

    if (status === "shipped")
      return true
  }


  const OederDelete = async (id) => {

    // alert(id);
    // return;

    await OrderService.oederDelete(id);

    await advanceSearchData(1);

  }

  const EditOrder = async (order_id, customer_id) => {

     // === order_data_reset ====
     dispatch({ type: "order_data_reset" });

    navigate("/edit-order", { state: { order_id, customer_id } })

  }

  const selectedSingleCustomerGet=async(id)=>{
    // alert(1)

    var responce = await customerService.findOne(id);
    if (responce.data.status) {
      // console.log(responce.data.data[0])
        navigate("/new-order",{state:{selectCustomerData:responce.data.data[0]}});
    } else {
        toast.error(responce.data.msg)
    }

  }

  useEffect(() => {
    // getCustomerList();

    if (SelectCustomerData != null) {

      setAdvanceSearch({ ...AdvanceSearch, customer_id: SelectCustomerData.id });
    } else {
      setAdvanceSearch({ ...AdvanceSearch, customer_id: '' });
    }


  }, [SelectCustomerData])


  useEffect(() => {
    handlePageChange(1)
  }, [AdvanceSearch])



  return (
    <>
      <Row className="order_top_row d-lg-flex align-items-center">
        <Col lg={2}>
          <h2>Orders</h2>
        </Col>

        <Col lg={6}>
          <div className="sales clearfix">
            <div className="sales-left">
              <span>Sales Period Total</span>
              <h3>${TotalPrice}</h3>
            </div>
            <div className="sales-right">
              <span>Sales Range</span>
              <h5>



                {AdvanceSearch.form_date != null || AdvanceSearch.to_date != null ? <>

                  {/* ====== form date and to date */}
                  {<Moment date={AdvanceSearch.form_date} format="MM/DD/YY" />} to {<Moment date={AdvanceSearch.to_date} format="MM/DD/YY" />}

                </> : <>
                  {<Moment date={FormDate} format="MM-DD-YY" />} to {<Moment date={ToDate} format="MM-DD-YY" />}
                </>}


              </h5>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div className="text-lg-end">
            <Link to="/new-order" className="new-order-btn btn btn-info">
              Create new order
            </Link>
            <div className="create-btn-sec">
              <img src={IonicIos} alt="" className="circle-right" />
              <button type="button" className="create-btn">
                Create new customer
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="order_filter_row">
        <Col lg={3}>
          <div className="select-box">
            {/* <CustomerSelectDropdown options={CustomerData} setSelectCustomerData={setSelectCustomerData} EditModalChangeStatus={EditModalChangeStatus} /> */}


            <CustomerAutoSearch setSelectCustomerData={setSelectCustomerData} EditModalChangeStatus={EditModalChangeStatus} />


          </div>
        </Col>
        <Col lg={2}>
          <div className="select-box">
            <Form.Select value={AdvanceSearch.order_status} onChange={(e) => setAdvanceSearch({ ...AdvanceSearch, order_status: e.target.value })} >
              <option value="">All Status</option>
              <option key={"save_1"} value={"saved"} >Saved</option>
              <option key={"buy_2"} value={"buy"} >Buy</option>
              <option key={"processing_3"} value={"processing"} >Processing</option>
              <option key={"confimed_4"} value={"confimed"} >Confimed</option>
              <option key={"abandoned_5"} value={"abandoned"} >Abandoned</option>
              <option key={"shipped_6"} value={"shipped"} >Shipped</option>
            </Form.Select>
          </div>
        </Col>
        <Col lg={4}>
          <Row className="gx-2">
            <Col lg={6}>
              <div className="input-group">

                <DatePicker
                  locale="es"
                  showIcon
                  closeOnScroll={true}
                  placeholderText="From"
                  selected={AdvanceSearch.form_date}
                  onChange={(date) => setAdvanceSearch({ ...AdvanceSearch, form_date: date })}
                  className={"form-control"}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="input-group">

                <DatePicker
                  locale="es"
                  showIcon
                  closeOnScroll={true}
                  placeholderText="To"
                  selected={AdvanceSearch.to_date}
                  onChange={(date) => setAdvanceSearch({ ...AdvanceSearch, to_date: date })}
                  className={"form-control"}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={3}>
          <Form.Control
            type="text"
            className="form-control"
            placeholder="Enter Order #"
            value={AdvanceSearch.order_no}
            onChange={(e) => setAdvanceSearch({ ...AdvanceSearch, order_no: e.target.value })}
          />
        </Col>
      </Row>
      <Row>
        <div className="table-responsive">
        <Table hover className="order_status_table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Order Number</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>


            {TableData.map((item, index) => (
              <>
                <tr key={index}>
                  <td>{item.order_date && <Moment date={item.order_date} format="YYYY-MM-DD" />}</td>
                  <td>#{item.order_no}</td>
                  <td>{item.customer_name}</td>
                  <td>${item.total_amount}</td>
                  <td>
                    {/* <button className="btn saved-btn">Saved</button> */}
                    <div class={`btn saved-btn `} style={order_status_color(item.order_status)} >
                      <select class="form-control" style={order_status_color(item.order_status)} value={item.order_status} onChange={(e) => orderStatus(item.id, e.target.value)} >

                        <option key={"saved" + index} value={"saved"} >Saved</option>
                        <option key={"buy" + index} value={"buy"} >Buy</option>
                        <option key={"processing" + index} value={"processing"} >Processing</option>
                        <option key={"confimed" + index} value={"confimed"} >Confimed</option>
                        <option key={"abandoned" + index} value={"abandoned"} >Abandoned</option>
                        <option key={"shipped" + index} value={"shipped"} >Shipped</option>

                      </select>
                    </div>
                    <span className="create-btn-sec">
                      <img
                        src={IonicIosSmall}
                        alt=""
                        className="circle-right"
                      />
                      <button type="button" className="create-btn" onClick={()=>selectedSingleCustomerGet(item.customer_id)}>
                        Start Order
                      </button>
                    </span>
                  </td>
                  <td>
                    <div className="edit_name">

                      <Button className="black" disabled={disableEditDelete(item.order_status)} onClick={() => EditOrder(item.id, item.customer_id)}>Edit</Button>

                      <Button className="black" disabled={disableEditDelete(item.order_status)} onClick={() => OederDelete(item.id)}>Cancel</Button>

                    </div>
                  </td>
                </tr>
              </>
            ))}



          </tbody>
        </Table>
        </div>
        {/* -====== pagination =========== */}
        {TableData.length > 0 && <CustomPagination handlePageChange={handlePageChange} othersOption={othersOption} />}


      </Row>
    </>
  );
}

export default Index;
