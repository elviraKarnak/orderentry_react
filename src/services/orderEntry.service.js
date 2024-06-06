import axios from 'axios';
import TokenHelper from './TokenHelper';
const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class OrderEntryService {

    advanceSearch(payload) {
        return axios.get(REACT_APP_API_SERVICE_URL + `/order-entry-advance-search?customer_id=${payload.customer_id}&state_id=${payload.state_id}&sales_rep_id=${payload.sales_rep_id}&limit=${payload.limit}&page_no=${payload.page_no}`,TokenHelper.getHeader());

    }

    


}


// eslint-disable-next-line import/no-anonymous-default-export
export default new OrderEntryService();
