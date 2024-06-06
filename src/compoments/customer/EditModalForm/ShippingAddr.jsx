import React, { useEffect, useState } from 'react';
import { useFormContext } from "react-hook-form";
import { Form, InputGroup } from 'react-bootstrap';
import countryState from '../../../services/countryState.service';

function ShippingAddr(props) {

  const { register, formState: { errors }, reset, setValue, getValues } = useFormContext();


  const [State, setState] = useState([]);
  const [ChkForm, setChkForm] = useState(false);

  // const [sameBillAddr, setsameBillAddr] = useState(props.CustomerData?.same_bill_addr_status == 1 ? true : false);

  // console.log(sameBillAddr)

  const getStatesByCountryIdFirst = async (country_id) => {
    var responce = await countryState.getStateBycountryId(country_id);
    setState([...responce.data.data])
    setValue("ship_state_id", props.CustomerData.ship_addr.ship_state_id);
    setChkForm(true)

  }

  const getStatesByCountryIdSecond = async (country_id) => {
    var responce = await countryState.getStateBycountryId(country_id);
    setState([...responce.data.data])

  }




  const setsameBillAddrChange = (e) => {

    // console.log(e.target.checked)
    // alert(e.target.checked)


    props.setsameBillAddr(e.target.checked)

    if (!e.target.checked) {
      setValue("ship_method", "")
      setValue("ship_contact_name", "")
      setValue("ship_phone", "")
      setValue("ship_addr_1", "")
      setValue("ship_addr_2", "")
      setValue("ship_country_id", "")
      setValue("ship_state_id", "")
      setValue("ship_city_name", "")
      setValue("ship_zip_code", "")
      setValue("ship_delivery_ins", "")
    }
    else {
      // ====== for skip validation ===========
      setValue("ship_method", props.CustomerData.ship_addr.ship_method)
      setValue("ship_contact_name", "aa")
      setValue("ship_phone", "1234567890")
      setValue("ship_addr_1", "aa")
      setValue("ship_addr_2", "")
      setValue("ship_country_id", "aa")
      setValue("ship_state_id", "aa")
      setValue("ship_city_name", "aa")
      setValue("ship_zip_code", "123456")
      setValue("ship_delivery_ins", "")
    }

  }

  useEffect(() => {
    if (props.CustomerData != null) {
      if (props.CustomerData.ship_addr.ship_country_id) {
        getStatesByCountryIdFirst(props.CustomerData.ship_addr?.ship_country_id);
      }


      // ====== for skip validation ===========
      if (props.CustomerData.same_bill_addr_status == '1') {
        props.setsameBillAddr(true)
        setValue("same_bill_addr_status",true)
        setValue("ship_method", props.CustomerData.ship_addr.ship_method)
        setValue("ship_contact_name", "aa")
        setValue("ship_phone", "1234567890")
        setValue("ship_addr_1", "aa")
        setValue("ship_addr_2", "")
        setValue("ship_country_id", "aa")
        setValue("ship_state_id", "aa")
        setValue("ship_city_name", "aa")
        setValue("ship_zip_code", "123456")
        setValue("ship_delivery_ins", "")
      }

    }

   

  }, [props.CustomerData, ChkForm])


  return (
    <>
      <div id="shipping-info">
        <div className="form-check">

          <Form.Check
            type="checkbox"
            defaultChecked={props.sameBillAddr}
            {...register("same_bill_addr_status")}
            onChange={setsameBillAddrChange}
          />

          {/* <input
            type="checkbox"
            className="form-check-input"
            id="radio2"
            value={sameBillAddr}
            // defaultValue={false}
            {...register("same_bill_addr_status")}
            onChange={(e) => setsameBillAddrChange(e.target.value)}
          /> */}
          Same as billing address
          <label
            className="form-check-label"
            htmlFor="radio2"
          />
        </div>

        {props.sameBillAddr && <>
          <div id="shipping-method">
            <div className="row mt-3 mb-3">
              <label className="col-sm-3 col-form-label">
                Shipping Method
              </label>
              <div className="col-sm-8">
                <Form.Select
                  {...register("ship_method")}
                  isInvalid={!!errors.ship_method}
                >
                  <option value={""}> select </option>
                  <option key={`key-m-1`} value={'fob'}> FOB </option>
                  <option key={`key-m-2`} value={'fedex'}> FEDEX </option>
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.ship_method?.message}
                </Form.Control.Feedback>
              </div>
            </div>
          </div>
        </>}

        {!props.sameBillAddr &&
          <>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">
                Shipping Contact
              </label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  placeholder="shipping contact"
                  {...register("ship_contact_name")}

                  isInvalid={!!errors.ship_contact_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ship_contact_name?.message}
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">
                Phone
              </label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  placeholder="phone"
                  {...register("ship_phone")}
                  isInvalid={!!errors.ship_phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ship_phone?.message}
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">
                Address 1
              </label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  placeholder="address 1"
                  {...register("ship_addr_1")}
                  isInvalid={!!errors.ship_addr_1}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ship_addr_1?.message}
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
                  {...register("ship_addr_2")}
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
                    {...register("ship_country_id")}
                    isInvalid={!!errors.ship_country_id}
                    onChange={(e) => getStatesByCountryIdSecond(e.target.value)}
                  >
                    <option value={""}> select </option>
                    {props.Country.map((item) => (
                      <option key={`${item.id}`} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    {errors.ship_country_id?.message}
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
                    {...register("ship_state_id")}
                    isInvalid={!!errors.ship_state_id}
                  >
                    <option value={""}> select </option>
                    {State.map((item) => (
                      <option key={`${item.id}`} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    {errors.ship_state_id?.message}
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
                  {...register("ship_city_name")}
                  isInvalid={!!errors.ship_city_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ship_city_name?.message}
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
                  {...register("ship_zip_code")}
                  isInvalid={!!errors.ship_zip_code}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ship_zip_code?.message}
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">
                Shipping Method
              </label>
              <div className="col-sm-8">
                <Form.Select
                  {...register("ship_method")}
                  isInvalid={!!errors.ship_method}
                >
                  <option value={""}> select </option>
                  <option key={`key-m-1`} value={'fob'}> FOB </option>
                  <option key={`key-m-2`} value={'fedex'}> FEDEX </option>
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.ship_method?.message}
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">
                Delivery Instructions
              </label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  placeholder="delivery instructions"
                  {...register("ship_delivery_ins")}
                  isInvalid={!!errors.ship_delivery_ins}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ship_delivery_ins?.message}
                </Form.Control.Feedback>
              </div>
            </div>

          </>}

        <div className="row billing-btn-grid">
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
              type="submit"
              className="btn btn-success rounded-5 save-btn"
            >
              Save
            </button>
          </div>
        </div>

      </div>
    </>
  )
}

export default ShippingAddr