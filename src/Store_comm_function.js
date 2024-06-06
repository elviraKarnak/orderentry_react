export const getFromLocal = (name, default_value) => {

    var l_value = localStorage.getItem(name) !== null ? JSON.parse(localStorage.getItem(name)) : default_value;
    return l_value;
}


export const setFromLocal = (name, default_value) => {

    var local_value = JSON.stringify(default_value);
    localStorage.setItem(name, local_value);
}