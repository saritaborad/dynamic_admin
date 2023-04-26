const isEmptyObj = (obj) => {
 if (Object.keys(obj)?.length === 0) {
  return true;
 } else {
  return false;
 }
};

const getTimeStamp = () => {
 const now = new Date();
 const year = now.getFullYear();
 const month = String(now.getMonth() + 1).padStart(2, "0"); // add leading zero if needed
 const day = String(now.getDate()).padStart(2, "0"); // add leading zero if needed
 const hour = String(now.getHours()).padStart(2, "0"); // add leading zero if needed
 const minute = String(now.getMinutes()).padStart(2, "0"); // add leading zero if needed
 const second = String(now.getSeconds()).padStart(2, "0"); // add leading zero if needed
 const timestamp = `${year}${month}${day}${hour}${minute}${second}`;
 return timestamp;
};

module.exports = { isEmptyObj, getTimeStamp };
