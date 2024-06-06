import axios from 'axios';
import TokenHelper from './TokenHelper';
const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class BuyerPortalService {

    Search(payload = {}) {
        return axios.get(REACT_APP_API_SERVICE_URL + `/buyer-portal?order_no=${payload.order_no}&customer_id=${payload.customer_id}&sales_rep_id=${payload.sales_rep_id}&shipping_date=${payload.shipping_date}`, TokenHelper.getHeader());

    }

    OrderItemUpdate(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/buyer-portal', payload, TokenHelper.getHeader());
    }

    MultiOrderItemConfirmUpdate(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/buyer-portal-multi-order-item-confirm-update', payload, TokenHelper.getHeader());
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BuyerPortalService();