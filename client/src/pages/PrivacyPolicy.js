import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { errorContainer, formAttr } from "../CommonFun/CommonFun";
import { useLocation } from "react-router-dom";
import { PostApi } from "../Api/apiServices";
import { API_PATH } from "../const";
import { toast } from "react-toastify";

const PrivacyPolicy = () => {
 const policyRef = useRef();
 const location = useLocation();
 let appName = location.search?.substring(1);

 const [policy, setPolicy] = useState();

 useEffect(() => getPolicy(), []);

 const getPolicy = () => {
  let data = { table_prefix: appName };
  new Promise((resolve) => resolve(PostApi(API_PATH.getPolicy, data))).then((res) => {
   if (res.status === 200) setPolicy(res.data.data?.content);
  });
 };

 const handleReset = () => policyRef.current.setFieldValue("content", policy);

 const submitFormData = (formData) => {
  new Promise((resolve) => resolve(PostApi(API_PATH.changePolicy, formData))).then((res) => {
   if (res.status === 200) {
    getPolicy();
    toast.success(res.data.message);
   }
  });
 };

 return (
  <>
   <MainLayout>
    <div className="content-main-section">
     <div className="container-fluid">
      <div className="row">
       <div className="col-12">
        <div className="comn-inr-title d-flex align-items-center">
         <h1>Manage Privacy Policy</h1>
        </div>
       </div>
      </div>
      <div className="">
       <div className="">
        <div className="row">
         <Formik
          enableReinitialize
          innerRef={policyRef}
          initialValues={{
           table_prefix: appName,
           content: policy ? policy : "",
          }}
          validationSchema={Yup.object({
           content: Yup.string().required("Content is required."),
          })}
          onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
         >
          {(runform) => (
           <form onSubmit={runform.handleSubmit}>
            <div className="">
             <div className="form-group ">
              <span className="">
               <i className="fa fa-info-circle pe-2" style={{ color: "#5D78FF" }}></i>
               paste your html code here:
              </span>
              <textarea className="form-control mt-2" id="exampleTextarea" placeholder="Enter privacy policy content..." name="content" rows="20" {...formAttr(runform, "content")}></textarea>
              {errorContainer(runform, "content")}
             </div>
            </div>
            <div className="">
             <div className="mt-2">
              <button type="submit" className="btn-smart-comn me-2">
               Submit
              </button>
              <button type="button" className="btn-smart-comn2" onClick={() => handleReset()}>
               Reset
              </button>
             </div>
            </div>
           </form>
          )}
         </Formik>
        </div>
       </div>
      </div>
     </div>
    </div>
   </MainLayout>
  </>
 );
};

export default PrivacyPolicy;
