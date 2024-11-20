import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography, Box, FormControlLabel, Checkbox, Button } from '@mui/material';
import Header from '../../common/Header';
import { GetMenuModulesHook, EditRolePermissionHook } from './hooks';

function ChangeRolePermission() {

  const navigate = useNavigate();

  /// query hook ///
  const { data: responseData = {
    roleData: [],
    rolePermissionData: [],
    menuData: []
  } } = GetMenuModulesHook();


  /// mutation hook ///
  const {
    mutateAsync: updateRolePermission,
  } = EditRolePermissionHook();


  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [rolePermissions, setRolePermissions] = useState([]);


  const handleRoleChange = (roleId) => {
    setSelectedRoleId(roleId);


    const filteredPermissions = responseData.rolePermissionData.filter(
      (permission) => permission.role_id === roleId
    );
    setRolePermissions(filteredPermissions);
  };


  const handlePermissionChange = async (moduleId, permissionType, value) => {
    // Update the permissions in the state
    setRolePermissions((prevPermissions) => {
      const updatedPermissions = prevPermissions.map((perm) => {
        if (perm.module_id === moduleId) {
          if (permissionType === 'full_access') {
            return {
              ...perm,
              full_access: value ? 1 : 0,
              add_access: value ? 1 : 0,
              edit_access: value ? 1 : 0,
              delete_access: value ? 1 : 0,
              view_access: value ? 1 : 0,
            };
          }
          const updatedPermission = { ...perm, [permissionType]: value ? 1 : 0 };
          const allPermissionsSelected =
            updatedPermission.add_access &&
            updatedPermission.edit_access &&
            updatedPermission.delete_access &&
            updatedPermission.view_access;

          return {
            ...updatedPermission,
            full_access: allPermissionsSelected ? 1 : 0,
          };
        }
        return perm;
      });

      // API call
      saveRolePermissions(moduleId, updatedPermissions.find((perm) => perm.module_id === moduleId));
      return updatedPermissions;
    });
  };


  const saveRolePermissions = async (moduleId, updatedPermission) => {
    try {
      console.log("saveRolePermissions: ", moduleId, updatedPermission);

      const payload = {
        id: updatedPermission.id,
        // module_id: updatedPermission.module_id,
        full_access: updatedPermission.full_access,
        add_access: updatedPermission.add_access,
        edit_access: updatedPermission.edit_access,
        delete_access: updatedPermission.delete_access,
        view_access: updatedPermission.view_access,
      };

      await updateRolePermission(payload);

    } catch (error) {
      console.error(error);
    }
  }


  // useEffect(() => {
  //   console.log("selectedRoleId", selectedRoleId)
  //   console.log("rolePermissions", rolePermissions)
  // }, [selectedRoleId, rolePermissions]);

  return (
    <>
      <Grid container>
        <Grid item sm={12}>
          <Header />
        </Grid>

        <Grid item sm={12}>
          <Typography variant="h4" className="title">
            Change Role Permission

            <Button type="submit" marginLeft={2} variant="contained" color="primary" onClick={() => navigate(-1)}>Back</Button>
          </Typography>

        </Grid>

        <Grid item sm={3}>
          <Typography variant="h6" className="title">
            <FormControl fullWidth margin="normal">
              <InputLabel id="user_role_list">User Role List</InputLabel>
              <Select
                labelId="user_role_list"
                label="User Role List"
                variant="outlined"
                value={selectedRoleId || ''}
                onChange={(e) => handleRoleChange(e.target.value)}
              >
                {responseData.roleData.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.role_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>
        </Grid>

        {/* ///////////////////////////////////////////////////////////////////////// */}
        {/* ////////////////////////////// Menu List //////////////////////////////// */}
        {/* ///////////////////////////////////////////////////////////////////////// */}
        {selectedRoleId && (
          <Grid item sm={10}>
            {responseData.menuData.map((menu, index) => {
              const currentPermissions = rolePermissions.find(
                (perm) => perm.module_id === menu.id
              ) || { add_access: 0, edit_access: 0, delete_access: 0, view_access: 0 };

              return (
                <Box
                  key={index}
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: 4,
                    padding: 3,
                    marginBottom: 3,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      marginBottom: 2,
                      textAlign: 'left',
                      fontWeight: 'bold',
                      color: '#333',
                    }}
                  >
                    {menu.name}
                  </Typography>

                  {/* Full Access Checkbox */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!currentPermissions.full_access}
                        onChange={(e) =>
                          handlePermissionChange(menu.id, 'full_access', e.target.checked)
                        }
                      />
                    }
                    label="Full Access"
                    sx={{
                      marginBottom: 2,
                      width: '100%',
                      textAlign: 'left',
                      color: '#555',
                    }}
                  />

                  {/* Permissions */}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: 2,
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!currentPermissions.add_access}
                          onChange={(e) =>
                            handlePermissionChange(menu.id, 'add_access', e.target.checked)
                          }
                        />
                      }
                      label="Add Permission"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!currentPermissions.edit_access}
                          onChange={(e) =>
                            handlePermissionChange(menu.id, 'edit_access', e.target.checked)
                          }
                        />
                      }
                      label="Edit Permission"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!currentPermissions.delete_access}
                          onChange={(e) =>
                            handlePermissionChange(menu.id, 'delete_access', e.target.checked)
                          }
                        />
                      }
                      label="Delete Permission"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!currentPermissions.view_access}
                          onChange={(e) =>
                            handlePermissionChange(menu.id, 'view_access', e.target.checked)
                          }
                        />
                      }
                      label="View Permission"
                    />
                  </Box>
                </Box>
              );
            })}
          </Grid>
        )}

      </Grid>
    </>
  );
}

export default ChangeRolePermission;
