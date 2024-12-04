export default function getFarmList() {
    try {
        var farmUserList = window.sessionStorage.getItem('farmUserList');

        // console.log(JSON.parse(farmUserList))

        var newResut = { label: "select farm", value: "" }

        if (farmUserList) {
            var result = JSON.parse(farmUserList);

            // result.unshift(newResut);

            return result;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}