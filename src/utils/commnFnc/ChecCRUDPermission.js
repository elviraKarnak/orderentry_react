import { menueDataAdmin } from "../Constant";

const CheckCRUDPermission = (code) => {

  var permisionData = sessionStorage.getItem('permisionData') ? JSON.parse(sessionStorage.getItem('permisionData')) : {};

  var tempData = {
    add_access: false,
    edit_access: false,
    delete_access: false,
    view_access: false
  };

  if (permisionData && permisionData.length > 0) {

    const menuPermission = permisionData.find(item => item.menuModule.code == code);

    // console.log("menuPermission: ", menuPermission);


    if (menuPermission.add_access == 1) {
      tempData.add_access = true;
    }


    if (menuPermission.edit_access == 1) {
      tempData.edit_access = true;
    }

    if (menuPermission.delete_access == 1) {
      tempData.delete_access = true;
    }

    if (menuPermission.view_access == 1) {
      tempData.view_access = true;
    }

    return tempData;
  }


  return tempData;
};

export default CheckCRUDPermission;