import React, { useEffect, useState } from 'react';
import { useFormContext } from "react-hook-form";
import { Form } from 'react-bootstrap';
import countryState from '../../../services/countryState.service';

function BillingAddr(props) {

  const { register, formState: { errors } } = useFormContext();

 
  const [State, setState] = useState([]);



  const getStatesByCountryId = async (country_id) => {
    var responce = await countryState.getStateBycountryId(country_id);
    setState([...responce.data.data])

  }

  

  

  return (
    <>
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">
          Address 1
        </label>
        <div className="col-sm-8">
          <Form.Control
            type="text"
            placeholder="address 1"
            {...register("bill_addr_1")}
            isInvalid={!!errors.bill_addr_1}
          />
          <Form.Control.Feedback type="invalid">
            {errors.bill_addr_1?.message}
          </Form.Control.Feedback>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">
          Address 2
        </label>
        <div className="col-sm-8">
          <Form.Control
            type="text"
            placeholder="address 2"
            {...register("bill_addr_2")}
          />

        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">
          Country
        </label>
        <div className="col-sm-8">
          <div className="select-box">
            <Form.Select
              {...register("bill_country_id")}
              isInvalid={!!errors.bill_country_id}
              onChange={(e) => getStatesByCountryId(e.target.value)}
            >
              <option value={""}> select </option>
              {props.Country.map((item) => (
                <option key={`${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {errors.bill_country_id?.message}
            </Form.Control.Feedback>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">
          State
        </label>
        <div className="col-sm-8">
          <div className="select-box">
            <Form.Select
              {...register("bill_state_id")}
              isInvalid={!!errors.bill_state_id}
            >
              <option value={""}> select </option>
              {State.map((item) => (
                <option key={`${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {errors.bill_state_id?.message}
            </Form.Control.Feedback>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">
          City
        </label>
        <div className="col-sm-8">
          <Form.Control
            type="text"
            placeholder="city"
            {...register("bill_city_name")}
            isInvalid={!!errors.bill_city_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.bill_city_name?.message}
          </Form.Control.Feedback>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">
          Postal/ZIP Code
        </label>
        <div className="col-sm-8">
          <Form.Control
            type="text"
            placeholder="postal/zip code"
            {...register("bill_zip_code")}
            isInvalid={!!errors.bill_zip_code}
          />
          <Form.Control.Feedback type="invalid">
            {errors.bill_zip_code?.message}
          </Form.Control.Feedback>
        </div>
      </div>

      <div className="row edit-buttons">
        <label className="col-sm-3 col-form-label" />
        <div className="col-sm-8 text-end">
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
            className="btn  btn-outline-success rounded-5 cancel-btn"
            onClick={props.onBack}
          >
            Back
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

export default BillingAddr