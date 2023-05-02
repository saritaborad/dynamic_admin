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
 const location = useLocation();
 let appName = location.search?.substring(1);
 const [policy, setPolicy] = useState();
 const policyRef = useRef();

 useEffect(() => getPolicy(), []);

 const getPolicy = () => {
  let data = { table_prefix: appName };
  new Promise((resolve) => resolve(PostApi(API_PATH.getPolicy, data))).then((res) => {
   if (res.status === 200) {
    setPolicy(res.data.data?.content);
   }
  });
 };

 const handleReset = () => {
  policyRef.current.setFieldValue("content", policy);
 };

 const submitFormData = (formData, resetForm) => {
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
         <h1>Privacy Policy</h1>
        </div>
       </div>
      </div>

      <div class="">
       <div class="">
        <div class="row">
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
          onSubmit={(formData, { resetForm }) => {
           submitFormData(formData, resetForm);
          }}
         >
          {(runform) => (
           <form onSubmit={runform.handleSubmit}>
            <div class="">
             <div class="form-group ">
              {/* <label className="mb-2" for="exampleTextarea">
               Add privacy policy
              </label> */}
              <textarea class="form-control" id="exampleTextarea" placeholder="Enter privacy policy content..." name="content" rows="20" {...formAttr(runform, "content")}></textarea>
              {errorContainer(runform, "content")}
             </div>
            </div>
            <div class="">
             <div class="mt-2">
              <button type="submit" class="btn-smart-comn me-2">
               Submit
              </button>
              <button type="button" class="btn-smart-comn2" onClick={() => handleReset()}>
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
