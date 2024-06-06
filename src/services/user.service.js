import axios from 'axios';
import TokenHelper from './TokenHelper';
const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class UserService {

    login(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/user/login', payload, TokenHelper.getHeader());

    }

    // ==== not use =====
    registration(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/user/register', payload, TokenHelper.getHeader());

    }

    subUserCreate(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/user/sub-user', payload, TokenHelper.getHeader());

    }

    subUserUpdate(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/user/sub-user', payload, TokenHelper.getHeader());

    }


    userAdvanceSearch(payload) {
        return axios.get(REACT_APP_API_SERVICE_URL + `/user/sub-user?email=${payload.email}&limit=${payload.limit}&page_no=${payload.page_no}`, TokenHelper.getHeader());
    }

    AllSaleRepsList(payload) {
        return axios.get(REACT_APP_API_SERVICE_URL + `/user/all-sub-user`, TokenHelper.getHeader());
    }


    userSingleData(payload) {
        return axios.get(REACT_APP_API_SERVICE_URL + `/user/sub-user/${payload}`, TokenHelper.getHeader());
    }


    usetActiveStatusChange(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/user/sub-user-status', payload, TokenHelper.getHeader());

    }


    userDelete(payload){
        return axios.delete(REACT_APP_API_SERVICE_URL + '/user/sub-user/'+payload.userID, TokenHelper.getHeader());
    }


}


// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
