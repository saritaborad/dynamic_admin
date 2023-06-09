const give_response = (res, status_code, success, message, data = null) => {
 var data = data == null ? {} : data;
 var json_to_send = { code: status_code, message: message, data: data };
 return res.status(status_code).json(json_to_send);
};

module.exports = give_response;
