const checkMenuPermission = (code) => {

    var permisionData = sessionStorage.getItem('permisionData') ? JSON.parse(sessionStorage.getItem('permisionData')) : {};

    if (code == "") {
      return true;
    }

    if (permisionData && permisionData.length > 0) {
        
      const menuPermission = permisionData.find(item => item.menuModule.code == code);
      // console.log("menuPermission: ", menuPermission);

      if(menuPermission.full_access==1){
        return true;
      }
      else if(menuPermission.add_access==1){
        return true;
      }
      else if(menuPermission.edit_access==1){
        return true;
      }
      else if(menuPermission.delete_access==1){
        return true;
      }
      else if(menuPermission.view_access==1){
        return true;
      }else{
        return false;
      }
    }
    return false;
  };

  export default checkMenuPermission;