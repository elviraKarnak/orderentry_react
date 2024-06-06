import axios from 'axios';
import TokenHelper from './TokenHelper';
const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class OrderService {

    orderSearch(payload) {
        return axios.get(REACT_APP_API_SERVICE_URL + `/order?customer_id=${payload.customer_id}&order_status=${payload.order_status}&order_no=${payload.order_no}&form_date=${payload.form_date}&to_date=${payload.to_date}&limit=${payload.limit}&page_no=${payload.page_no}`,TokenHelper.getHeader());

    }

    orderStatus(payload){
        return axios.put(REACT_APP_API_SERVICE_URL + '/order-status',payload,TokenHelper.getHeader());
    }

    newOrderAdd(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + `/order`,payload,TokenHelper.getHeader());

    }

    singleOrderItemList(id){
        return axios.get(REACT_APP_API_SERVICE_URL + `/order/${id}`,TokenHelper.getHeader());
    }

    OrderItemDelete(id){
        return axios.delete(REACT_APP_API_SERVICE_URL + `/order-item/${id}`,TokenHelper.getHeader());
    }


    orderPlace(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + `/order-place`,payload,TokenHelper.getHeader());

    }

    oederDelete(id)
    {
        return axios.delete(REACT_APP_API_SERVICE_URL + `/order/${id}`,TokenHelper.getHeader());
    }


 


}


// eslint-disable-next-line import/no-anonymous-default-export
export default new OrderService();
