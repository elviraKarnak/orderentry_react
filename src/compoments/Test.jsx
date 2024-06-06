import React, { useState } from 'react'

function Test() {

    const [purpose, setPurpose] = useState(false);
  const handlePurposeChange = () => {
    setPurpose(true);
  };

    return (
        <>
            {/* The Modal */}
            <div className="modal  vvvv" id="edit-flowershop">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Edit The Flower Shop
                            </h4>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        {/* Modal body */}
                        <div className="modal-body">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        data-bs-toggle="tab"
                                        href="#menu1"
                                    >
                                        Contact
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                        href="#menu2"
                                    >
                                        Billing
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                        href="#menu3"
                                    >
                                        Shipping
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div
                                    id="menu1"
                                    className="container tab-pane active"
                                >
                                    <form>
                                        <div className="row mb-3">
                                            <label className="col-sm-2 col-form-label">
                                                Customer *
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="The Flower Shop"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label className="col-sm-2 col-form-label">
                                                Email
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    defaultValue="theflowershop@tonyfoss.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label className="col-sm-2 col-form-label">
                                                Phone
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="555-555-5555"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label className="col-sm-2 col-form-label">
                                                Contact
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="Tony"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label className="col-sm-2 col-form-label" />
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="Foss"
                                                />
                                            </div>
                                        </div>
                                        <div className="row edit-buttons">
                                            <label className="col-sm-2 col-form-label" />
                                            <div className="col-sm-9 text-end">
                                                <button
                                                    type="submit"
                                                    className="btn  btn-outline-success rounded-5 cancel-btn"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-success rounded-5 save-btn"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div
                                    id="menu2"
                                    className="container tab-pane fade"
                                >
                                    <form>
                                        <div className="row mb-3">
                                            <label className="col-sm-3 col-form-label">
                                                Address 1
                                            </label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="123 Wizard Lane"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label className="col-sm-3 col-form-label">
                                                Address 2
                                            </label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue=""
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label className="col-sm-3 col-form-label">
                                                City
                                            </label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="Train Station"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label className="col-sm-3 col-form-label">
                                                Postal/ZIP Code
                                            </label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue={12345}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label className="col-sm-3 col-form-label">
                                                Country
                                            </label>
                                            <div className="col-sm-8">
                                                <div className="select-box">
                                                    <select className="form-select">
                                                        <option selected="">
                                                            United States
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label className="col-sm-3 col-form-label">
                                                State
                                            </label>
                                            <div className="col-sm-8">
                                                <div className="select-box">
                                                    <select className="form-select">
                                                        <option selected="">
                                                            Hogwarts
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row edit-buttons">
                                            <label className="col-sm-3 col-form-label" />
                                            <div className="col-sm-8 text-end">
                                                <button
                                                    type="submit"
                                                    className="btn  btn-outline-success rounded-5 cancel-btn"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-success rounded-5 save-btn"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div
                                    id="menu3"
                                    className="container tab-pane fade"
                                >
                                    {/* =================== true ================== */}
                                    {purpose && (
                                        <>
                                            <div id="shipping-info">
                                                <div className="form-check">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        id="radio2"
                                                        name="optradio"
                                                        defaultValue="option2"
                                                    />
                                                    Same as billing address
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="radio2"
                                                    />
                                                </div>
                                                <form>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label">
                                                            Shipping Contact
                                                        </label>
                                                        <div className="col-sm-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue="Tony Foss"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label">
                                                            Phone
                                                        </label>
                                                        <div className="col-sm-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label">
                                                            Address-1
                                                        </label>
                                                        <div className="col-sm-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue="123 Wizard Lane"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label">
                                                            Address-2
                                                        </label>
                                                        <div className="col-sm-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label">
                                                            City
                                                        </label>
                                                        <div className="col-sm-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue="Train Station"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label">
                                                            Postal/ZIP Code
                                                        </label>
                                                        <div className="col-sm-8">
                                                            <div className="select-box">
                                                                <select className="form-select">
                                                                    <option selected="">
                                                                        12345
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label">
                                                            Country
                                                        </label>
                                                        <div className="col-sm-8">
                                                            <div className="select-box">
                                                                <select className="form-select">
                                                                    <option selected="">
                                                                        United States
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label">
                                                            State
                                                        </label>
                                                        <div className="col-sm-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue="Hogwarts"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label">
                                                            Shipping Method
                                                        </label>
                                                        <div className="col-sm-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue="Fedex Priority"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label">
                                                            Delivery Instructions
                                                        </label>
                                                        <div className="col-sm-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row billing-btn-grid">
                                                        <label className="col-sm-3 col-form-label" />
                                                        <div className="col-sm-8 text-end">
                                                            <button
                                                                type="submit"
                                                                className="btn  btn-outline-success rounded-5 cancel-btn"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="btn btn-success rounded-5 save-btn"
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </>
                                    )}

                                    {/* =================== false ================== */}
                                    {!purpose && (
                                        <>
                                            <div id="shipping-method">
                                                <h5>
                                                    <img
                                                        src="images/awesome-check-circle.png"
                                                        alt=""
                                                    />{" "}
                                                    Same as billing address
                                                </h5>
                                                <form>
                                                    <div className="row mt-3 mb-3">
                                                        <label className="col-sm-3 col-form-label">
                                                            Shipping Method
                                                        </label>
                                                        <div className="col-sm-8">
                                                            <div className="select-box">
                                                                <select
                                                                    className="form-select method-select"
                                                                    id="purpose"
                                                                    onChange={
                                                                        handlePurposeChange
                                                                    }
                                                                >
                                                                    <option>
                                                                        Fedex Priority
                                                                    </option>
                                                                    <option>Fedex</option>
                                                                </select>

                                                                {/* <div>
                                                    <div className="divider-height"></div>
                                                    <div id="shipping-method">

                                                    <p>hgellooww 9999 ytrue</p>                                                    </div>
                                                  </div>                                                  </>} */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="divider-height" />
                                                    <div className="row edit-buttons">
                                                        <label className="col-sm-3 col-form-label" />
                                                        <div className="col-sm-8 text-end">
                                                            <button
                                                                type=""
                                                                className="btn  btn-outline-success rounded-5 cancel-btn"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="btn btn-success rounded-5 save-btn"
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Test