import { Formik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import { errorContainer, formAttr } from "../CommonFun/CommonFun";

const AppModal = ({ update, title, id, updateApp, submitFormData, appModalClose }) => {
 return (
  <>
   <Modal.Header closeButton className="">
    <div className="cust-comn-modal-hdr">
     <p>{update ? "Edit Application" : "Add New Application"}</p>
    </div>
   </Modal.Header>
   <Modal.Body>
    <Formik
     enableReinitialize
     initialValues={{
      _id: update && id,
      title: title ? title : "",
     }}
     validationSchema={Yup.object({
      title: Yup.string().required("Title is required."),
     })}
     onSubmit={(formData, { resetForm }) => (update ? updateApp(formData, resetForm) : submitFormData(formData, resetForm))}
    >
     {(runform) => (
      <form onSubmit={runform.handleSubmit}>
       <div className="row">
        <div className="col-md-12 mb-3">
         <label className="form-lbl-class mb-2">Title</label>
         <input type="text" {...formAttr(runform, "title")} className="form-control style-input-class" name="title" placeholder="Enter title here" />
         {errorContainer(runform, "title")}
        </div>
        <div className="col-12 text-end mt-5 mb-4">
         <button type="submit" className="btn-smart-comn px-4 me-2">
          {update ? "Update" : "Add"}
         </button>
         <button className="btn-smart-comn2 px-4" type="button" onClick={() => appModalClose()}>
          Cancel
         </button>
        </div>
       </div>
      </form>
     )}
    </Formik>
   </Modal.Body>
  </>
 );
};

export default AppModal;
