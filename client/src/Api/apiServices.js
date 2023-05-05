import axios from "axios";

export const GetApi = async (path) => {
 let token_Data = "";
 if (localStorage.getItem("dynamic_admin")) {
  token_Data = localStorage.getItem("dynamic_admin");
 }
 let headers = { Authorization: token_Data };
 const GetApiData = await fetch(path, { headers: headers })
  .then((response) => {
   return response;
  })
  .catch((err) => {
   return err.response;
  });
 return GetApiData;
};

export const PostApi = (path, data) => {
 return new Promise((resolve, reject) => {
  resolve(
   axios
    .post(path, data, { withCredentials: true })
    .then((res) => {
     return res;
    })
    .catch((err) => {
     return err;
    })
  );
 });
};

export function ImagePostApi(path, body) {
 let Ctype = "multipart/form-data";
 let token = "";
 if (localStorage.getItem("dynamic_admin")) {
  token = "Bearer " + localStorage.getItem("dynamic_admin");
 }
 let headers = { Authorization: token, "Content-Type": Ctype, Accept: "application/pdf" };
 const PostApiData = axios
  .post(path, body, { headers: headers })
  .then((response) => {
   return response;
  })
  .catch((err) => {
   return err;
  });
 return PostApiData;
}
