import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostApi } from "../Api/apiServices";
import { API_PATH } from "../const";
import { errorContainer, formAttr } from "../CommonFun/CommonFun";

const Version = () => {
 const [show, setShow] = useState(true);
 const appModalClose = () => {
  setShow(false);
 };
 const submitFormData = (formData, resetForm) => {
  new Promise((resolve) => resolve(PostApi(API_PATH.addApp, formData))).then(
   (res) => {
    if (res.status === 200) {
     setShow(false);
    }
   }
  );
 };

 return (
  <>
   <MainLayout>
    <Modal
     show={show}
     onHide={() => appModalClose()}
     size="md"
     className="cust-comn-modal"
     aria-labelledby="contained-modal-title-vcenter"
     centered
    >
     <Modal.Header closeButton className="">
      <div className="cust-comn-modal-hdr">
       <p>Add Version</p>
      </div>
     </Modal.Header>
     <Modal.Body>
      <Formik
       enableReinitialize
       initialValues={{
        _id: "",
        title: "",
       }}
       validationSchema={Yup.object({
        title: Yup.string().required("Title is required."),
       })}
       onSubmit={(formData, { resetForm }) => {
        submitFormData(formData, resetForm);
       }}
      >
       {(runform) => (
        <form onSubmit={runform.handleSubmit}>
         {/* <div className="row">
          <div className="col-md-12 mb-3">
           <label className="form-lbl-className mb-2">Title</label>
           <input
            type="text"
            {...formAttr(runform, "title")}
            className="form-control style-input-className"
            name="title"
            placeholder="Enter title here"
           />
           {errorContainer(runform, "title")}
          </div>
          <div className="col-12 text-end mt-5 mb-4">
           <button type="submit" className="btn-smart-comn px-4 me-2">
            Add
           </button>
           <button
            className="btn-smart-comn2 px-4"
            type="button"
            onClick={() => appModalClose()}
           >
            Cancel
           </button>
          </div>
         </div> */}
         <div className="row">
          <div className="col-md-12 mb-3" id="data_view">
           <div className="form-group ">
            <label for="recipient-name" className="form-control-label mt-3">
             Version title:
            </label>
            <input
             type="text"
             name="vnm"
             className="form-control"
             id="title"
             placeholder="Enter title"
             {...formAttr(runform, "title")}
            />
            {errorContainer(runform, "title")}
           </div>
           <div className="form-group">
            <label for="recipient-name" className="form-control-label mt-3">
             New features:
            </label>
            <textarea
             className="form-control"
             name="features"
             placeholder="Enter features"
             id="fetureA"
             cols="85"
             rows="5"
             {...formAttr(runform, "features")}
            ></textarea>
            {errorContainer(runform, "features")}
           </div>
           <div className="form-group">
            <label for="recipient-name" className="form-control-label mt-3">
             Version code:
            </label>
            <input
             type="number"
             name="code"
             placeholder="Enter version code"
             className="form-control style-input-className"
             {...formAttr(runform, "code")}
            />
            {errorContainer(runform, "code")}
           </div>

           <div className="row">
            <div className="col-12 d-flex  mt-3">
             <div className="col-4 d-flex align-items-center">
              <label className="col-4">Status</label>
              <input type="checkbox" name="enbl" />
             </div>

             <div className="col-8 d-flex align-items-center">
              <label className="col-4"> Is forcefully ?</label>
              <input type="checkbox" name="is_force" />
             </div>
            </div>
           </div>
          </div>
          <div className="modal-footer">
           <button
            type="button"
            className="btn-smart-comn2"
            data-dismiss="modal"
           >
            Close
           </button>
           <button type="submit" onClick={() => {}} className="btn-smart-comn">
            Add
           </button>
          </div>
         </div>
        </form>
       )}
      </Formik>
     </Modal.Body>
    </Modal>
   </MainLayout>
  </>
 );
};

export default Version;
