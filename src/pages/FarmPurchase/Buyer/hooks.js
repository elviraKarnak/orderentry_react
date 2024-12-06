import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { farmInvoiceFileDeleteApi, farmInvoiceFileUploadApi, farmOrderItemStatusUpdateApi, farmOrderItemUpdateApi, farmOrderListAPi, farmOrderStatusUpdateApi, farmOrderUpdateBYAdminApi } from "../../../utils/fetch";


export const disableStatus = ['accepted', 'canceled'];

/////////////////////// Query //////////////////////////
export function GetFarmOrderListHook(role_id, user_id) {
    return useQuery({
        queryKey: ["farm_order_list_admin"],
        queryFn: async () => {

            // console.log(role_id, user_id)

            var farm_id = null;

            if (role_id == 4) {
                farm_id = user_id;
            }

            // alert(role_id)

            const response = await farmOrderListAPi(farm_id);
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

            const response = await farmOrderUpdateBYAdminApi(order_id, payload);
            return response;
        },
        onMutate: (paylaod) => {
            console.log("paylaod: ", paylaod);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (responce) => {
            console.log(responce);

            if(responce.result.status){
                toast.success("Farm Order Updated Successfully");
            }else{
                toast.warning(responce.result.message);
            }

            queryClient.invalidateQueries('farm_order_list_admin');
        },
        onError: (error) => {
            console.error(error);
        },
    })
}


export function FarmOrderItemUpdateHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {

            const id = payload.id;
            delete payload.id;

            const response = await farmOrderItemUpdateApi(id, payload);
            return response;
        },
        onMutate: (paylaod) => {
            console.log("paylaod: ", paylaod);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (responce) => {
            console.log(responce);
            queryClient.invalidateQueries('farm_order_list_admin');
        },
        onError: (error) => {
            console.error(error);
        },
    })
}



export function FarmOrderStatusUpdateHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {

            const payload = {
                order_id: data.order_id,
                status: data.status
            }

            const response = await farmOrderStatusUpdateApi(payload);
            return response;
        },
        onMutate: (paylaod) => {
            console.log("paylaod: ", paylaod);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (responce) => {
            console.log(responce);
            queryClient.invalidateQueries('farm_order_list_admin');
        },
        onError: (error) => {
            console.error(error);
        },
    })
}




export function FarmOrderItemStatusUpdateHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {

            const payload = {
                id: data.id, // order meta table id
                status: data.status
            }

            const response = await farmOrderItemStatusUpdateApi(payload);
            return response;
        },
        onMutate: (paylaod) => {
            console.log("paylaod: ", paylaod);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (responce) => {
            console.log(responce);
            queryClient.invalidateQueries('farm_order_list_admin');
        },
        onError: (error) => {
            console.error(error);
        },
    })
}



export function FarmOrderInvoiceFileUploadHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {

            // const payload={
            //     id: data.id, // order meta table id
            //     invoice_file: data.invoice_file
            // }

            const payload = new FormData();
            payload.append("id", data.id);
            payload.append("invoice_file", data.invoice_file);


            const response = await farmInvoiceFileUploadApi(payload);
            return response;
        },
        onMutate: (paylaod) => {
            console.log("paylaod: ", paylaod);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (responce) => {
            console.log(responce);
            queryClient.invalidateQueries('farm_order_list_admin');
        },
        onError: (error) => {
            console.error(error);
        },
    })
}



export function FarmOrderInvoiceFileDeleteHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {

            // const payload={
            //     id: data.id, // order meta table id
            //     invoice_file: data.invoice_file
            // }

            // const payload = new FormData();
            // payload.append("id", data.id);


            const response = await farmInvoiceFileDeleteApi(data);
            return response;
        },
        onMutate: (paylaod) => {
            console.log("paylaod: ", paylaod);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (responce) => {
            console.log(responce);
            queryClient.invalidateQueries('farm_order_list_admin');
        },
        onError: (error) => {
            console.error(error);
        },
    })
}