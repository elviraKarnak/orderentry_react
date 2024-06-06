import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import CircleRight from '../../assets/images/arrow-alt-circle-right.png';
import IonicIos from '../../assets/images/iconic-ios-add-circle-small.png';


function index() {
    return (
        <>
            <div className="order-search search-box">
                <h1>Customers</h1>
                <span>Start an order for a customer.</span>
                <Link to="/">
                    <button type="button">Simple search
                        <img src={CircleRight} alt="" className="circle-right" />
                    </button>
                </Link>


                <div className="row d-lg-flex align-items-center top-row">
                    <div className="col-lg-5">
                        <div className="search-input autocomplete">
                            <input
                                id="myInput"
                                type="text"
                                name="myCountry"
                                className="form-control"
                                placeholder="Type Customer Name"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="select-box">
                            <select className="form-select">
                                <option selected="">All States</option>
                                <option value={1}>FedEx Priority</option>
                                <option value={2}>FedEx Priority</option>
                                <option value={3}>FedEx Priority</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="select-box">
                            <select className="form-select">
                                <option selected="">All Sales Rep</option>
                                <option value={1}>FedEx Priority</option>
                                <option value={2}>FedEx Priority</option>
                                <option value={3}>FedEx Priority</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="create-btn-sec pt-lg-0">
                            <img src={IonicIos} alt="" />

                            <button type="button" className="create-btn">Create new customer</button>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table table-hover order-table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Sales Rep</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>State</th>
                        <th>Last Order</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="company_name">
                            The Robin's Nest Flower Shoppe
                            <div className="edit_name">
                                <a href="#" className="edit_user">
                                    Edit User |
                                </a>
                                <a href="#" className="remove_user">
                                    Remove
                                </a>
                            </div>
                        </td>
                        <td>Anthony Vergara</td>
                        <td className="company_mail">
                            robinsnestflowers@zoominternet.net
                        </td>
                        <td>(814) 734-7117</td>
                        <td>PA</td>
                        <td>10/21/2021</td>
                        <td>
                            <button
                                type="submit"
                                className="new-order-btn btn btn-info green"
                            >
                                Start order
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="company_name">
                            Royal Event And Design
                            <div className="edit_name">
                                <a href="#" className="edit_user">
                                    Edit User |
                                </a>
                                <a href="#" className="remove_user">
                                    Remove
                                </a>
                            </div>
                        </td>
                        <td>Grace Perdomo</td>
                        <td className="company_mail">debi@royaleventsan sswsign.com</td>
                        <td>(704) 488-9717</td>
                        <td>NC</td>
                        <td>10/21/2021</td>
                        <td>
                            <button
                                type="submit"
                                className="new-order-btn btn btn-info green"
                            >
                                Start order
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="company_name">
                            101 Flowers
                            <div className="edit_name">
                                <a href="#" className="edit_user">
                                    Edit User |
                                </a>
                                <a href="#" className="remove_user">
                                    Remove
                                </a>
                            </div>
                        </td>
                        <td>Anthony Vergara</td>
                        <td className="company_mail">101.flowers@gmail.com</td>
                        <td>(818) 878-9101</td>
                        <td>CA</td>
                        <td>10/21/2021</td>
                        <td>
                            <button
                                type="submit"
                                className="new-order-btn btn btn-info green"
                            >
                                Start order
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="company_name">
                            The Robin's Nest Flower Shoppe
                            <div className="edit_name">
                                <a href="#" className="edit_user">
                                    Edit User |
                                </a>
                                <a href="#" className="remove_user">
                                    Remove
                                </a>
                            </div>
                        </td>
                        <td>Anthony Vergara</td>
                        <td className="company_mail">
                            robinsnestflowers@ zoominternet.net
                        </td>
                        <td>(814) 734-7117</td>
                        <td>PA</td>
                        <td>10/21/2021</td>
                        <td>
                            <button
                                type="submit"
                                className="new-order-btn btn btn-info green"
                            >
                                Start order
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="company_name">
                            Royal Event And Design
                            <div className="edit_name">
                                <a href="#" className="edit_user">
                                    Edit User |
                                </a>
                                <a href="#" className="remove_user">
                                    Remove
                                </a>
                            </div>
                        </td>
                        <td>Grace Perdomo</td>
                        <td className="company_mail">debi@royaleventsan sswsign.com</td>
                        <td>(704) 488-9717</td>
                        <td>NC</td>
                        <td>10/21/2021</td>
                        <td>
                            <button
                                type="submit"
                                className="new-order-btn btn btn-info green"
                            >
                                Start order
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default index;
