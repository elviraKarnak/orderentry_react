/**
 * 
 * @param {*} event 
 * @param {*} fileUrl 
 */
export const downloadAnyFile = (event, fileUrl, fileName) => {
    try {

        event.preventDefault();

        fileName = "-" + fileUrl.split('/').pop();
        const link = document.createElement('a');
        link.href = fileUrl;
        link.target = "_blank";
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }
    catch (error) {
        console.error('Error downloading the file:', error);
    }
}
