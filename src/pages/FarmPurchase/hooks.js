import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { farmOrderItemUpdateApi, farmOrderListAPi, farmOrderUpdateApi } from "../../utils/fetch";


/////////////////////// Query //////////////////////////
export function GetFarmOrderListHook() {
    return useQuery({
        queryKey: ["farm_order_list"],
        queryFn: async () => {
            const response = await farmOrderListAPi();
            console.log("farm order list", response);
            return response.result.data;
        },
    });
}


////////////////////// mutation /////////////////////////////////
export function FarmOrderUpdateHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {

            const order_id = payload.order_id;
            delete payload.order_id;

            const response = await farmOrderUpdateApi(order_id, payload);
            return response;
        },
        onMutate: (paylaod) => {
            console.log("paylaod: ", paylaod);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (responce) => {
            console.log(responce);
            queryClient.invalidateQueries('farm_order_list');
        },
        onError: (error) => {
            console.error(error);
        },
    })
}


export function FarmOrderItemUpdateHook(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {

            const order_item_id = payload.order_item_id;
            delete payload.order_item_id;

            const response = await farmOrderItemUpdateApi(order_item_id, payload);
            return response;
        },
        onMutate: (paylaod) => {
            console.log("paylaod: ", paylaod);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (responce) => {
            console.log(responce);
            queryClient.invalidateQueries('farm_order_list');
        },
        onError: (error) => {
            console.error(error);
        },
    })
}