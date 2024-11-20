import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import {
    getUserRolesApi,
    getUserListApi,
    createUserApi,
    deleteUserApi,
    editUserApi,
    getMenuModulesApi,
    editRolePermissionApi,
} from "../../utils/fetch";


/////////////////////// Query //////////////////////////

// data: stagingInventoryData = [],
// isError: stagingInventoryisError,
// isFetching: stagingInventoryIsFetching,
// isLoading: stagingInventoryIsLoading,
// refetch: stagingInventoryRefetch,

/**
 *
 * @returns {Object}
 * - `data` {Array}
 * - `isError` {boolean}
 * - `isFetching` {boolean}
 * - `isLoading` {boolean}
 * - `refetch` {Function}
 */
function GetUserRolesHook() {
    return useQuery({
        queryKey: ["user_roles"],
        queryFn: async () => {
            const response = await getUserRolesApi();
            console.log("user roles", response);

            var temp = response.result.data.filter(
                (item) => ![1, 5].includes(item.id)
            );

            // console.log("dddddddddddd",temp)

            // return response.result.data;
            return temp;
        },
    });
}

/**
 *
 * @returns {Object}
 * - `data` {Array}
 * - `isError` {boolean}
 * - `isFetching` {boolean}
 * - `isLoading` {boolean}
 * - `refetch` {Function}
 */
function GetUserListHook() {
    return useQuery({
        queryKey: ["user_list"],
        queryFn: async () => {
            const response = await getUserListApi();
            console.log("user list", response);
            return response.result.userData;
            // return [];
        },
    });
}

/**
 *
 * @returns {Object}
 * - `data` {Object} {roleData,rolePermissionData, menuData}
 * - `isError` {boolean}
 * - `isFetching` {boolean}
 * - `isLoading` {boolean}
 * - `refetch` {Function}
 */
function GetMenuModulesHook() {
    return useQuery({
        queryKey: ["menu_list"],
        queryFn: async () => {
            const response = await getMenuModulesApi();
            console.log("GetMenuModulesHook", response);
            return {
                roleData: response.result.roleData,
                rolePermissionData: response.result.rolePermissionData,
                menuData: response.result.menuData,
            };
            // return [];
        },
    });
}

////////////////////// mutation /////////////////////////////////

// mutateAsync: createUser,
// isPending: isCreatingUser

/**
 *
 * @returns {Object}
 * - `mutateAsync` {Array}
 * - `isPending` {boolean}
 * - `isSuccess` {Function}
 * - `isError` {boolean}
 * - `error` {object}
 */
function CreateUserHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (paylaod) => {
            const response = await createUserApi(paylaod);
            return response;
        },
        onMutate: (newUserInfo) => {
            console.log("newUserInfo: ", newUserInfo);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (responce) => {
            console.log(responce);
            queryClient.invalidateQueries('user_list');
        },
        onError: (error) => {
            console.error(error);
        },
    });
}

/**
 *
 * @returns {Object}
 * - `mutateAsync` {Array}
 * - `isPending` {boolean}
 * - `isSuccess` {Function}
 * - `isError` {boolean}
 * - `error` {object}
 */
function EditUserHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (paylaod) => {
            let userId = paylaod.userId;
            delete paylaod.userId;
            delete paylaod.email;

            const response = await editUserApi(userId, paylaod);

            return response;
        },
        onMutate: (newUserInfo) => {
            console.log("newUserInfo: ", newUserInfo);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (response) => {
            console.log(response);

            if (response.status) {
                Swal.fire("Updated!", "User has been updated.", "success");
            } else {
                Swal.fire("Warning!", response.error.message, "warning");
            }

            queryClient.invalidateQueries('user_list');
        },
        onError: (error) => {
            console.error(error);
        },
    });
}

/**
 *
 * @param {number} userId
 */
function DeleteUserHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId) => {
           const responce = await deleteUserApi(userId);
            return responce;
        },
        onMutate: (newUserInfo) => {
            console.log("newUserInfo: ", newUserInfo);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (responce) => {
            console.log(responce);
            queryClient.invalidateQueries('user_list');
        },
        onError: (error) => {
            console.error(error);
        },
    });
}

/**
 *
 * @returns {Object}
 * - `mutateAsync` {Array}
 * - `isPending` {boolean}
 * - `isSuccess` {Function}
 * - `isError` {boolean}
 * - `error` {object}
 */
function EditRolePermissionHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (paylaod) => {
            let id = paylaod.id;
            delete paylaod.id;

            const response = await editRolePermissionApi(id, paylaod);

            return response;
        },
        onMutate: (newUserInfo) => {
            console.log("newUserInfo: ", newUserInfo);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (response) => {
            console.log(response);
            

            if (response.status) {
                toast.success("Change role permission successfully");
            } else {
                Swal.fire("Warning!", response.error.message, "warning");
            }

             queryClient.invalidateQueries('menu_list');
        },
        onError: (error) => {
            console.error(error);
        },
    });
}

export {
    GetUserRolesHook,
    GetUserListHook,
    CreateUserHook,
    EditUserHook,
    DeleteUserHook,
    GetMenuModulesHook,
    EditRolePermissionHook,
};
