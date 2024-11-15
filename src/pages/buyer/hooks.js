import { orderItemUpdateApi } from "../../utils/fetch";


export async function orderItemUpdate(payload) {

    const responce = await orderItemUpdateApi(payload);

    console.log(responce);
}