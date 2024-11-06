import {
    useQuery,
} from "@tanstack/react-query";
import { fmiOrderSystemAppProductOrderEntrySearch } from "../../../utils/fetch";
import { toast } from "react-toastify";


const ProductList = async ({ ProductDataSearch, SelectCustomerData, DeliveryDate }) => {

    console.log("DeliveryDate ", DeliveryDate);

    if (DeliveryDate == undefined || DeliveryDate == null) {
        // toast.warning("Please select delivery date");
        return [];
    }

    // console.log(
    //   "SelectCustomerData.ship_addr.ship_method ",
    //   SelectCustomerData.ship_addr
    // );

    var payload = {
        search_text: ProductDataSearch.search_text.trim(),
        shipping_model: SelectCustomerData?.ship_addr?.ship_method === "fob" ? "fob" : "landed", // landed or fob
        page: ProductDataSearch.page,
        limit: ProductDataSearch.limit,
        shop_by_branch: ProductDataSearch.shop_by_branch ? '1' : '0',
    };

    // alert(JSON.stringify(payload));

    // var responce = await productService.productSearch(payload);
    let responce = await fmiOrderSystemAppProductOrderEntrySearch(payload);


    console.log(responce, " ======== product node data hook ====");

    // return;

    if (responce.status) {

        const responceData = responce.result.results;


        if (responceData.length > 0) {

            // var tempArr = userState.ProductData;

            var tempArr = [];

            // var pIdArr = [];

            // for (var item of tempArr) {
            //     var p_id = item.product_details.id;
            //     pIdArr.push(p_id);
            // }

            for (var i of responceData) {

                // if (!pIdArr.includes(i.id)) {

                var total_price = ((Number(i.cost_price) * 100) / (100 - Number(i.margin_data.t_1_m)));
                total_price = (total_price * Number(i.minqty)).toFixed(2);

                var temp = {
                    product_details: i,
                    quantity: i.minqty,
                    total: total_price,
                    margin: i.margin_data.t_1_m,
                    temp_product_id: i.id,
                    status: 'new',
                };

                tempArr.push(temp);
                // }
            }

            console.log("tempArr hook  ", tempArr);

            return tempArr;

        } else {
            return [];
        }

    }

};


export default function UseFetchOrderProducts({ ProductDataSearch, SelectCustomerData, DeliveryDate }) {
    return useQuery({
        queryKey: ["order_products", ProductDataSearch, SelectCustomerData, DeliveryDate],
        queryFn: () => ProductList({ ProductDataSearch, SelectCustomerData, DeliveryDate }),
    });
}
