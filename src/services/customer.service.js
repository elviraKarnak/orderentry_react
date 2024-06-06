import axios from 'axios';
import TokenHelper from './TokenHelper';
const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class CustomerService {

    create(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/customer',payload,TokenHelper.getHeader());

    }

    findAll(payload){
        return axios.get(REACT_APP_API_SERVICE_URL + `/customer?payload=${payload}`,TokenHelper.getHeader());
    }

    findOne(id){
        return axios.get(REACT_APP_API_SERVICE_URL + `/customer/${id}`,TokenHelper.getHeader());
    }

    update(payload){
        return axios.put(REACT_APP_API_SERVICE_URL + '/customer',payload,TokenHelper.getHeader());
    }


    updateShipMethod(payload){
        return axios.put(REACT_APP_API_SERVICE_URL + '/customer-ship-method',payload,TokenHelper.getHeader());
    }

    


}


// eslint-disable-next-line import/no-anonymous-default-export
export default new CustomerService();
