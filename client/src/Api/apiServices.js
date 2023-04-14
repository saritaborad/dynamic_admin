import axios from "axios";

export const GetApi = async (path) => {
 let token_Data = "";
 if (localStorage.getItem("strusertoken")) {
  token_Data = localStorage.getItem("strusertoken");
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

// export const PostApi = async (path, body) => {
//  let token_Data = "";
//  if (localStorage.getItem("strusertoken")) {
//   token_Data = localStorage.getItem("strusertoken");
//  }
//  const options = {
//   method: "POST",
//   headers: { Authorization: token_Data, "Content-Type": "application/json" },
//   body: JSON.stringify(body),
//  };
//  const PostApiData = await fetch(path, options)
//   .then((response) => {
//    console.log(response);
//    return response;
//   })
//   .catch((err) => {
//    return err.response;
//   });
//  return PostApiData;
// };

export const PostApi = (path, data) => {
 return new Promise((resolve, reject) => {
  resolve(
   axios
    .post(path, data, { headers: { withCredentials: true } })
    .then((res) => {
     return res;
    })
    .catch((err) => {
     return err;
    })
  );
 });
};

export const ImageApi = async (path, body) => {
 let token_Data = "";
 if (localStorage.getItem("strusertoken")) {
  token_Data = localStorage.getItem("strusertoken");
 }
 const options = {
  method: "POST",
  headers: { Authorization: token_Data },
  body: body,
 };
 const PostApiData = await fetch(path, options)
  .then((response) => {
   return response;
  })
  .catch((err) => {
   return err.response;
  });
 return PostApiData;
};

export function SessionPostAPI(path, body, type) {
 let Ctype = type === "image" ? "multipart/form-data" : "application/json";
 let token = "";
 if (localStorage.getItem("startgeekuser")) {
  token = "Bearer " + localStorage.getItem("startgeekuser");
 }
 let headers = { Authorization: token, "Content-Type": Ctype, Accept: "application/pdf", withCredentials: true };
 const PostApiData = axios
  .post(path, body, { headers: headers })
  .then((response) => {
   return response;
  })
  .catch((err) => {
   if (err.response.status === 401) {
    window.location.href = "/login";
   }
   return err.response;
  });
 return PostApiData;
}
