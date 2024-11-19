import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getUserRolesApi, getUserListApi, createUserApi, deleteUserApi } from "../../utils/fetch";


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
        queryKey: ['user_roles'],
        queryFn: async () => {
            const response = await getUserRolesApi();
            console.log("user roles", response)

            var temp = response.result.data.filter((item) => ![1, 5].includes(item.id));

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
        queryKey: ['user_list'],
        queryFn: async () => {
            const response = await getUserListApi();
            console.log("user list", response)
            return response.result.userData;
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
            await createUserApi(paylaod);
        },
        onMutate: (newUserInfo) => {
            console.log("newUserInfo: ", newUserInfo);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (responce) => {
            console.log(responce)
        },
        onError: (error) => {
            console.error(error)
        }

    });

}



function DeleteUserHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId) => {
            await deleteUserApi(userId);
        },
        onMutate: (newUserInfo) => {
            console.log("newUserInfo: ", newUserInfo);

            // queryClient.invalidateQueries('user_list');
        },
        onSuccess: (responce) => {
            console.log(responce)
        },
        onError: (error) => {
            console.error(error)
        }

    });

}


export {
    GetUserRolesHook,
    GetUserListHook,
    CreateUserHook,
    DeleteUserHook,
};