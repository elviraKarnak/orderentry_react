import React, { useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton
} from 'material-react-table';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { GetUserListHook, GetUserRolesHook, CreateUserHook, DeleteUserHook, EditUserHook } from '../hooks';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    TextField,
    Select,
    FormControl,
    InputLabel,
    FormHelperText,
    MenuItem,
    InputAdornment,
    Box,
    Tooltip,
    Grid,
} from '@mui/material';

import { useForm, Controller, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateSchema, EditSchema } from './ValidationSchema';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function UserList() {

    const navigate = useNavigate();
    const [CreateDialog, setCreateDialog] = useState(false);
    const [EditDialog, setEditDialog] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        control: createFormControl,
        handleSubmit: handleCreateSubmit,
        reset: resetCreateForm,
        formState: { errors: createFormErrors },
    } = useForm({
        resolver: yupResolver(CreateSchema),
    });


    const {
        control: editFormControl,
        handleSubmit: handleEditSubmit,
        setValue: setEditValue,
        getValues: getEditValues,
        reset: resetEditForm,
        formState: { errors: editFormErrors },
    } = useForm({
        resolver: yupResolver(EditSchema),
    });

    /// query hook ///
    const { data: userRoles = [] } = GetUserRolesHook();
    const {
        data: userListData = [],
        isError: userListisError,
        isFetching: userListIsFetching,
        isLoading: userListIsLoading,
        refetch: userListRefetch,
    } = GetUserListHook();


    /// mutation hook ///
    const {
        mutateAsync: createUser,
        isPending: isCreatingUser
    } = CreateUserHook();

    const {
        mutateAsync: editUser,
        isPending: isEditingUser
    } = EditUserHook();

    const {
        mutateAsync: deleteUser,
        isPending: isDeletingUser
    } = DeleteUserHook();



    //// dialog functions ///////////
    const handleCreateDialogOpen = (data) => {
        resetCreateForm();
        setCreateDialog(true);
    };

    const handleCreateDialogClose = () => {
        resetCreateForm();
        setCreateDialog(false);
    };

    const handleEditDialogOpen = (data) => {

        // console.log('handleEditDialogOpen: ', data)

        setEditValue('user_first_name', data.user_first_name);
        setEditValue('user_last_name', data.user_last_name);
        setEditValue('username', data.username);
        setEditValue('email', data.email);
        setEditValue('role_id', data.role_id);
        setEditValue('userId', data.id);


        setEditDialog(true);
    };

    const handleEditDialogClose = () => {
        resetEditForm();
        setEditDialog(false);
    };


    //// table functions ///////////
    const handleCreateUser = async (data) => {
        // console.log("handleCreateUser: ", data);
        await createUser(data);

        Swal.fire({
            title: "User Create!",
            text: "Successfully user create!",
            icon: "success"
        });

        handleCreateDialogClose();

        userListRefetch();
    }

    const handleEditUser = async (data) => {

        console.log("handleEditUser: ", data)

        // table.setEditingRow(null); //exit editing mode

        await editUser(data);

        handleEditDialogClose();

        userListRefetch();
    }


    const handleDeleteUser = (data) => {
        console.log("handleDeleteUser: ", data)


        Swal.fire({
            title: "Do you want to delete this user?",
            showCancelButton: true,
            confirmButtonText: "Ok",
        }).then(async (result) => {
            if (result.isConfirmed) {

                await deleteUser(data.id);
                userListRefetch();

                Swal.fire("Deleted!", "User has been deleted.", "success");
            }
        });
    }

    /// table column ///
    const columns = useMemo(() => [
        {
            accessorKey: 'user_first_name',
            header: 'First Name',
        },
        {
            accessorKey: 'user_last_name',
            header: 'Last Name',
        },
        {
            accessorKey: 'username',
            header: 'Username',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'role_id',
            header: 'Role',
            Cell: ({ renderedCellValue, row }) => {

                // console.log("userRoles table: ", userRoles)
                // console.log(row.original)

                return (<>
                    {userRoles.map((item) => (item.id == row.original.role_id) ? item.role_name : "")}
                </>)
            }
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },

    ], [userRoles]);


    /// table ///
    const table = useMaterialReactTable({
        columns: columns,
        data: userListData,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: false,

        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        getRowId: (row) => row.id,

        initialState: {
            showColumnFilters: false,
            showGlobalFilter: true,
            columnVisibility: {
                id: false,
                Password: false
            },
        },

        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        muiSearchTextFieldProps: {
            size: 'small',
            variant: 'outlined',
        },
        muiPaginationProps: {
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30],
            shape: 'rounded',
            variant: 'outlined',
        },

        state: {
            isLoading: userListIsLoading,
            isSaving: isCreatingUser || isDeletingUser || isEditingUser,
            showAlertBanner: userListisError,
            showProgressBars: userListIsFetching,
        },

        // CRUD operations
        renderTopToolbarCustomActions: ({ table }) => (<>
            <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={handleCreateDialogOpen}
                    >
                        Create New User
                    </Button>
                </Grid>
                {/* <Grid item>
                    <Button
                        variant="contained"
                        onClick={()=>navigate('/change-role-permission')}
                    >
                        Change Role Permission
                    </Button>
                </Grid> */}
            </Grid>
        </>),
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditDialogOpen(row.original)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDeleteUser(row.original)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),

    });


    return (
        <>
            <MaterialReactTable table={table} />


            {/* Dialog for Create User */}
            <Dialog open={CreateDialog} onClose={handleCreateDialogClose} maxWidth="md" fullWidth>
                <DialogTitle>Create User</DialogTitle>
                <form onSubmit={handleCreateSubmit(handleCreateUser)}>
                    <DialogContent>
                        {/* First Name */}
                        <Controller
                            name="user_first_name"
                            control={createFormControl}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!createFormErrors.user_first_name}
                                    helperText={createFormErrors.user_first_name?.message}
                                />
                            )}
                        />

                        {/* Last Name */}
                        <Controller
                            name="user_last_name"
                            control={createFormControl}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!createFormErrors.user_last_name}
                                    helperText={createFormErrors.user_last_name?.message}
                                />
                            )}
                        />

                        {/* Username */}
                        <Controller
                            name="username"
                            control={createFormControl}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!createFormErrors.username}
                                    helperText={createFormErrors.username?.message}
                                />
                            )}
                        />

                        {/* Email */}
                        <Controller
                            name="email"
                            control={createFormControl}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!createFormErrors.email}
                                    helperText={createFormErrors.email?.message}
                                />
                            )}
                        />

                        {/* Role ID */}
                        <Controller
                            name="role_id"
                            control={createFormControl}
                            render={({ field }) => (
                                <FormControl
                                    fullWidth
                                    margin="normal"
                                    error={!!createFormErrors.role_id}
                                >
                                    <InputLabel id="role-id-label">User Role</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="role-id-label"
                                        label="User Role"
                                        variant="outlined"
                                    >
                                        {userRoles.map((role, index) => (
                                            <MenuItem key={index} value={role.id}>
                                                {role.role_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{createFormErrors.role_id?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />

                        {/* Password Field */}
                        <Controller
                            name="user_pass"
                            control={createFormControl}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!createFormErrors.user_pass}
                                    helperText={createFormErrors.user_pass?.message}
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    onMouseDown={(event) => event.preventDefault()}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}

                                />
                            )}
                        />

                        {/* Confirm Password Field */}
                        <Controller
                            name="user_pass_confirm"
                            control={createFormControl}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Confirm Password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type={showConfirmPassword ? "text" : "password"}
                                    error={!!createFormErrors.user_pass_confirm}
                                    helperText={createFormErrors.user_pass_confirm?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    onMouseDown={(event) => event.preventDefault()}
                                                >
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={handleCreateDialogClose} color="secondary" variant="contained">
                            Cancel
                        </Button>
                        <Button type='submit' color="primary" variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>


            {/* Dialog for Edit User */}
            <Dialog open={EditDialog} onClose={handleEditDialogClose} maxWidth="md" fullWidth>
                <DialogTitle>Edit User</DialogTitle>
                <form onSubmit={handleEditSubmit(handleEditUser)}>
                    <DialogContent>
                        {/* First Name */}
                        <Controller
                            name="user_first_name"
                            control={editFormControl}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!editFormErrors.user_first_name}
                                    helperText={editFormErrors.user_first_name?.message}
                                />
                            )}
                        />

                        {/* Last Name */}
                        <Controller
                            name="user_last_name"
                            control={editFormControl}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!editFormErrors.user_last_name}
                                    helperText={editFormErrors.user_last_name?.message}
                                />
                            )}
                        />

                        {/* Username */}
                        <Controller
                            name="username"
                            control={editFormControl}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!editFormErrors.username}
                                    helperText={editFormErrors.username?.message}
                                />
                            )}
                        />

                        {/* Email */}
                        <Controller
                            name="email"
                            control={editFormControl}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    disabled={true}
                                    error={!!editFormErrors.email}
                                    helperText={editFormErrors.email?.message}
                                />
                            )}
                        />

                        {/* Role ID */}
                        <Controller
                            name="role_id"
                            control={editFormControl}
                            render={({ field }) => (
                                <FormControl
                                    fullWidth
                                    margin="normal"
                                    error={!!editFormErrors.role_id}
                                >
                                    <InputLabel id="role-id-label">User Role</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="role-id-label"
                                        label="User Role"
                                        variant="outlined"
                                    >
                                        {userRoles.map((role, index) => (
                                            <MenuItem key={index} value={role.id}>
                                                {role.role_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{editFormErrors.role_id?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />

                        {/* Password Field */}
                        <Controller
                            name="user_pass"
                            control={editFormControl}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!editFormErrors.user_pass}
                                    helperText={editFormErrors.user_pass?.message}
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    onMouseDown={(event) => event.preventDefault()}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}

                                />
                            )}
                        />

                        {/* Confirm Password Field */}
                        <Controller
                            name="user_pass_confirm"
                            control={editFormControl}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Confirm Password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type={showConfirmPassword ? "text" : "password"}
                                    error={!!editFormErrors.user_pass_confirm}
                                    helperText={editFormErrors.user_pass_confirm?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    onMouseDown={(event) => event.preventDefault()}
                                                >
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={handleEditDialogClose} color="secondary" variant="contained">
                            Cancel
                        </Button>
                        <Button type='submit' color="primary" variant="contained">
                            Update
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default UserList;
