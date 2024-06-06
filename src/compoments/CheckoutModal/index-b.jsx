import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Circle from '../../assets/images/circle.png';
import Loading from '../../assets/images/loading.png';
import Cart from '../../assets/images/cart.png';
import Card1 from '../../assets/images/card1.png';
import Visa from '../../assets/images/visa.png';
import Delete from '../../assets/images/delete.png'
import AwesomeCheckCircle from '../../assets/images/awesome-check-circle.png';
import IconicaddCircle from '../../assets/images/iconic-ios-add-circle-small.png';
import { useNavigate } from "react-router-dom"

function Index() {

    const navigate = useNavigate();
    const [placeOrderLoader, setplaceOrderLoader] = useState(false);


    const placeOrder = () => {
        setplaceOrderLoader(true)
    }


    const billingactive = () => {

        var dataadded = document.getElementsByClassName("dataadded");
        dataadded[0].classList.remove("active");
        dataadded[1].classList.remove("active");
        dataadded[2].classList.remove("active");

        var brokendata = document.getElementsByClassName("brokendata");
        brokendata[0].classList.remove("active");
        brokendata[1].classList.remove("active");
        brokendata[2].classList.remove("active");
        brokendata[1].classList.add("active");

        var billing = document.getElementById("billing");
        billing.classList.add("active");


        navigate(`/new-order`)
    }



    return (<>
        {/* <div className="text-lg-end">
            <Button
                type="button"
                className="btn btn-secondary rounded-5 cart-btn"
                data-bs-toggle="modal"
                data-bs-target="#checkoutModal"
            >
                <img src={Cart} alt="" className="cart" />
                Total $0.00
            </Button>

        </div> */}

        {/* The Modal */}
        <div className="modal" id="checkoutModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="inner-modal-row">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h3 className="modal-title">Delivery Date</h3>
                            <h5>Tuesday. September 30</h5>
                            <Button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            />
                        </div>
                        {/* Modal body */}
                        <div className="modal-body">
                            <div className="order-total-table">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Product Description</th>
                                                <th>Unit Pice</th>
                                                <th>Quantity</th>
                                                <th>Amount</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="company_name">Super Sun 50CM</td>
                                                <td>$0.65</td>
                                                <td>25 ST</td>
                                                <td className="amount-col">$34.50</td>
                                                <td>
                                                    <img src={Delete} alt="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="company_name">Geraldine50CM</td>
                                                <td>$0.65</td>
                                                <td>25 ST</td>
                                                <td className="amount-col">$34.50</td>
                                                <td>
                                                    <img src={Delete} alt="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="company_name">Teres 50CM</td>
                                                <td>$0.65</td>
                                                <td>25 ST</td>
                                                <td className="amount-col">$34.50</td>
                                                <td>
                                                    <img src={Delete} alt="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="company_name">Cherry Brandy 50CM</td>
                                                <td>$0.65</td>
                                                <td>25 ST</td>
                                                <td className="amount-col">$34.50</td>
                                                <td>
                                                    <img src={Delete} alt="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="company_name">Freedom 50CM</td>
                                                <td>$0.65</td>
                                                <td>25 ST</td>
                                                <td className="amount-col">$34.50</td>
                                                <td>
                                                    <img src={Delete} alt="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="company_name">Cherry Brandy 50CM</td>
                                                <td>$0.65</td>
                                                <td>25 ST</td>
                                                <td className="amount-col">$34.50</td>
                                                <td>
                                                    <img src={Delete} alt="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="company_name">Super Sun 50CM</td>
                                                <td>$0.65</td>
                                                <td>25 ST</td>
                                                <td className="amount-col">$34.50</td>
                                                <td>
                                                    <img src={Delete} alt="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="company_name">Freedom 50CM</td>
                                                <td>$0.65</td>
                                                <td>25 ST</td>
                                                <td className="amount-col">$34.50</td>
                                                <td>
                                                    <img src={Delete} alt="" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* Modal footer */}
                        <div className="modal-footer">
                            <div className="order-total">
                                <p>
                                    <span className="subtotal">Subtotal $103.50</span>
                                </p>
                                <p>
                                    <span className="subtotal">
                                        Shipping &amp; Handling $0.00
                                    </span>
                                </p>
                                <p>
                                    <span className="total">Total</span>{" "}
                                    <span className="amount">$103.50</span>
                                </p>
                                <Link
                                    to="#"
                                    className="new-order-btn btn btn-info"
                                    data-bs-toggle="modal"
                                    data-bs-target="#shippingModal"
                                >
                                    Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* The Modal */}
        {!placeOrderLoader ? <>

            <div className="modal" id="shippingModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="inner-modal-row">
                            {/* Modal Header */}
                            <div className="modal-header">
                                <h3 className="modal-title">Delivery Date</h3>
                                <h5>Tuesday. September 30</h5>
                                <Button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                />
                            </div>
                            {/* Modal body */}
                            <div className="modal-body">
                                <ul className="nav nav-tabs">
                                    <li className="nav-item ">
                                        <a
                                            className="nav-link active brokendata"
                                            data-bs-toggle="tab"
                                            href="#shipping"
                                        >
                                            Shipping
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link brokendata"
                                            data-bs-toggle="tab"
                                            href="#billing"
                                        >
                                            Billing
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link brokendata"
                                            data-bs-toggle="tab"
                                            href="#confirm"
                                        >
                                            Confirmation
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div id="shipping" className="container dataadded  tab-pane active">
                                        <h2>Confirm shipping address</h2>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-lg-6">
                                                <div className="row d-flex align-items-center shipping-address-row">
                                                    <div className="col-lg-3">
                                                        <img src={IconicaddCircle} alt="" />
                                                    </div>
                                                    <div className="col-lg-9">
                                                        <div className="bill-info">
                                                            <h3>The Flower Shop</h3>
                                                            <h4>Tony Foss</h4>
                                                            <h4>
                                                                123 NW Big Street <br /> Big Town, Miami 12345
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="create-btn-sec">
                                                    <img src={IconicaddCircle} alt="" />
                                                    <button type="button" className="create-btn">
                                                        Add new shipping address
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <span className="primary">Primary</span>
                                            </div>
                                            <div className="col-lg-4">
                                                <Link to="#" className="green-link edit-shiping">
                                                    Edit Shipping Address
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="bill-info confirm_shipping">
                                                    <small>Confirm shipping method</small>
                                                    <div className="select-box">
                                                        <select className="form-select">
                                                            <option selected="">FedEx Priority</option>
                                                            <option value={1}>FedEx Priority</option>
                                                            <option value={2}>FedEx Priority</option>
                                                            <option value={3}>FedEx Priority</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Modal footer */}
                                        <div className="modal-footer">
                                            <div className="order-total">
                                                <p>
                                                    <span className="subtotal">Subtotal $103.50</span>
                                                </p>
                                                <p>
                                                    <span className="subtotal">
                                                        Shipping &amp; Handling $0.00
                                                    </span>
                                                </p>
                                                <p>
                                                    <span className="total">Total</span>{" "}
                                                    <span className="amount">$103.50</span>
                                                </p>
                                                <Button
                                                    onClick={billingactive}
                                                    className="new-order-btn btn btn-info green"
                                                >
                                                    Continue
                                                </Button>





                                            </div>
                                        </div>
                                    </div>
                                    <div id="billing" className="container dataadded tab-pane fade ">
                                        <h2>Billing Information</h2>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <img src={AwesomeCheckCircle} alt="" />
                                                        </td>
                                                        <td>
                                                            <img src={Card1} alt="" />
                                                        </td>
                                                        <td>xxxx xxxx xxxx 8940</td>
                                                        <td>10/26</td>
                                                        <td>1234</td>
                                                        <td>
                                                            <span className="primary">Primary</span>
                                                        </td>
                                                        <td>
                                                            <Link to="#">Edit Card</Link>{" "}
                                                            <Link to="#">Remove Card</Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <img src={Circle} alt="" />
                                                        </td>
                                                        <td>
                                                            <img src={Visa} alt="" />
                                                        </td>
                                                        <td>xxxx xxxx xxxx 2244</td>
                                                        <td>10/26</td>
                                                        <td>1234</td>
                                                        <td>
                                                            <span className="primary green-link">
                                                                Make Primary
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <Link to="#">Edit Card</Link>{" "}
                                                            <Link to="#">Remove Card</Link>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="create-btn-sec">
                                            <img src={IconicaddCircle} alt="" />
                                            <Button type="button" className="create-btn">
                                                Add new credit card
                                            </Button>
                                        </div>
                                        <div className="create-btn-sec">
                                            <img src={Circle} alt="" />
                                            <span className="payments">Pay later</span>
                                        </div>
                                        <div className="modal-footer">
                                            <div className="order-total">
                                                <p>
                                                    <span className="subtotal">Subtotal $103.50</span>
                                                </p>
                                                <p>
                                                    <span className="subtotal">
                                                        Shipping &amp; Handling $0.00
                                                    </span>
                                                </p>
                                                <p>
                                                    <span className="total">Total</span>{" "}
                                                    <span className="amount">$103.50</span>
                                                </p>
                                                <Button
                                                    type="button"
                                                    onClick={placeOrder}
                                                    className="new-order-btn btn btn-info green place-order"
                                                >
                                                    Place Order
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="confirm" className="container dataadded tab-pane fade ">
                                        Confirmation
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </> : <>

            <div className="loading">
                <div className="loading-text">
                    <h2>Order processing please wait!</h2>
                    <img src={Loading} className="loader" alt="" />
                </div>
            </div>
        </>}

    </>)
}

export default Index