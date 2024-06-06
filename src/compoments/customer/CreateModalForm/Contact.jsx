import React from 'react';
import { useFormContext } from "react-hook-form";
import { Form } from 'react-bootstrap';

function Contact(props) {

    const { register, formState: { errors } } = useFormContext();



    return (
        <>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">
                    Customer *
                </label>
                <div className="col-sm-9">
                    <Form.Control
                        type="text"
                        placeholder="customer name"
                        {...register("company_name")}
                        isInvalid={!!errors.company_name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.company_name?.message}
                    </Form.Control.Feedback>
                </div>
            </div>

            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">
                    Email
                </label>
                <div className="col-sm-9">
                    <Form.Control
                        type="email"
                        placeholder="email"
                        {...register("email")}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                    </Form.Control.Feedback>
                </div>
            </div>

            {/* <div className="row mb-3">
                <label className="col-sm-2 col-form-label">
                    Username
                </label>
                <div className="col-sm-9">
                    <Form.Control
                        type="text"
                        placeholder="username"
                        {...register("username")}
                        isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.username?.message}
                    </Form.Control.Feedback>
                </div>
            </div> */}


            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">
                    Phone
                </label>
                <div className="col-sm-9">
                    <Form.Control
                        type="number"
                        placeholder="555-555-5555"
                        {...register("phone")}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone?.message}
                    </Form.Control.Feedback>
                </div>
            </div>

            {/* <div className='row mb-3'>
                <label className="col-sm-2 col-form-label">
                    Customer Service Representative
                </label>
                <div className="col-sm-9">
                    <Form.Select aria-label="Default select example"
                        {...register("customer_service_representative")}
                        isInvalid={!!errors.customer_service_representative}
                    >
                        <option value="900" selected >Angelique C. Crespo</option>
                        <option value="654">Antonio Crespo</option>
                        <option value="658">Brian Benjamin</option>
                        <option value="648">Daniel Crespo</option>
                        <option value="656">Grace Perdomo</option>
                        <option value="18267">Randy Lopez</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.customer_service_representative?.message}
                    </Form.Control.Feedback>
                </div>
            </div> */}

            {/* <div className="row mb-3">
                <label className="col-sm-2 col-form-label">
                    Customer Number
                </label>
                <div className="col-sm-9">
                    <Form.Control
                        type="text"
                        placeholder=""
                        {...register("customer_no")}
                    />
                </div>
            </div> */}

            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">
                    Contact
                </label>
                <div className="col-sm-9">

                    <Form.Control
                        type="text"
                        placeholder="firstname"
                        {...register("firstname")}
                        isInvalid={!!errors.firstname}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstname?.message}
                    </Form.Control.Feedback>

                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label" />
                <div className="col-sm-9">


                    <Form.Control
                        type="text"
                        placeholder="lastname"
                        {...register("lastname")}
                        isInvalid={!!errors.lastname}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastname?.message}
                    </Form.Control.Feedback>


                </div>
            </div>
            <div className="row edit-buttons">
                <label className="col-sm-2 col-form-label" />
                <div className="col-sm-9 text-end">
                    <button
                        type="button"
                        className="btn  btn-outline-success rounded-5 cancel-btn"
                        data-bs-dismiss="modal"
                        onClick={props.onCancle}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-success rounded-5 save-btn"
                        onClick={props.onNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default Contact