import React from "react";
import { errorContainer, formAttr } from "../CommonFun/CommonFun";
import { Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

export const VersionModal = ({ isUpdate, version, adTitle, adMode, table_prefix, setVersShow, submitFormData }) => {
 return (
  <>
   <Modal.Header closeButton className="">
    <div className="cust-comn-modal-hdr">
     <p>{isUpdate ? "Edit Version" : "Add Version"}</p>
    </div>
   </Modal.Header>
   <Modal.Body>
    <Formik
     enableReinitialize
     initialValues={{
      _id: isUpdate && version?._id,
      title: version ? version?.title : "",
      features: version ? version?.features : "",
      code: version ? version?.code : "",
      enabled: version ? version?.enabled : 0,
      is_force: version ? version?.is_force : 0,
      table_prefix: table_prefix,
      adTitle: adTitle,
      adMode: adMode,
     }}
     validationSchema={Yup.object({
      title: Yup.string().required("Title is required."),
      features: Yup.string().required("Feature is required."),
      code: Yup.string().required("Code is required."),
     })}
     onSubmit={(formData, { resetForm }) => {
      submitFormData(formData, resetForm);
     }}
    >
     {(runform) => (
      <form onSubmit={runform.handleSubmit}>
       <div className="row">
        <div className="col-md-12 mb-3" id="data_view">
         <div className="form-group ">
          <label htmlFor="title" className="form-control-label mt-3">
           Version title:
          </label>
          <input type="text" name="title" className="form-control" id="title" placeholder="Enter title" {...formAttr(runform, "title")} />
          {errorContainer(runform, "title")}
         </div>
         <div className="form-group">
          <label htmlFor="features" className="form-control-label mt-3">
           New features:
          </label>
          <textarea className="form-control" name="features" placeholder="Enter features" id="fetureA" cols="85" rows="5" {...formAttr(runform, "features")}></textarea>
          {errorContainer(runform, "features")}
         </div>
         <div className="form-group">
          <label htmlFor="code" className="form-control-label mt-3">
           Version code:
          </label>
          <input type="number" name="code" placeholder="Enter version code" className="form-control style-input-className" {...formAttr(runform, "code")} />
          {errorContainer(runform, "code")}
         </div>

         <div className="row">
          <div className="col-12 d-flex  mt-3">
           <div className="col-4 d-flex align-items-center">
            <label className="col-4">Status</label>
            <div className="form-check form-switch">
             <input
              className="form-check-input"
              type="checkbox"
              id="offer-status"
              name="enabled"
              defaultChecked={runform?.values?.enabled === 1 ? true : false}
              onChangeCapture={(e) => {
               runform.setFieldValue("enabled", e.target.checked ? 1 : 0);
              }}
             />
            </div>
           </div>

           <div className="col-8 d-flex align-items-center">
            <label className="col-4"> Is forcefully ?</label>
            <div className="form-check form-switch">
             <input
              className="form-check-input"
              type="checkbox"
              id="offer-status"
              name="is_force"
              defaultChecked={runform?.values?.is_force === 1 ? true : false}
              onChangeCapture={(e) => {
               runform.setFieldValue("is_force", e.target.checked ? 1 : 0);
              }}
             />
            </div>
           </div>
          </div>
         </div>
        </div>
        <div className="text-end me-3 mt-3">
         <button type="button" className="btn-smart-comn2 me-2" onClick={() => setVersShow(false)}>
          Close
         </button>
         <button type="submit" className="btn-smart-comn">
          {isUpdate ? "Update" : "Add"}
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

export const NoteModal = ({ version, setNoteShow, submitFormData }) => {
 return (
  <>
   <Modal.Header closeButton className="">
    <div className="cust-comn-modal-hdr">
     <p>Edit Note</p>
    </div>
   </Modal.Header>
   <Modal.Body>
    <Formik
     enableReinitialize
     initialValues={{
      _id: version?._id,
      version_note: version ? version?.version_note : "",
     }}
     validationSchema={Yup.object({
      version_note: Yup.string().required("Note is required."),
     })}
     onSubmit={(formData, { resetForm }) => {
      formData = { ...version, ...formData };
      submitFormData(formData, resetForm);
     }}
    >
     {(runform) => (
      <form onSubmit={runform.handleSubmit}>
       <div className="modal-body" id="data_view">
        <div className="form-group">
         <label htmlFor="version_note" className="form-control-label form-lbl-class  mb-1">
          Note:
         </label>
         <textarea class="form-control" name="version_note" id="version_note" placeholder="Enter note" cols="85" rows="15" {...formAttr(runform, "version_note")}></textarea>
         {errorContainer(runform, "version_note")}
        </div>
       </div>
       <div className="text-end m-3">
        <button type="button" className="btn-smart-comn2 me-2" onClick={() => setNoteShow(false)}>
         Close
        </button>
        <button type="submit" className="btn-smart-comn">
         Edit
        </button>
       </div>
      </form>
     )}
    </Formik>
   </Modal.Body>
  </>
 );
};

export const ModeModal = ({ isUpdate, adMode, latestVersion, allversion, table_prefix, setModeShow, submitAdMode }) => {
 return (
  <>
   <Modal.Header closeButton className="">
    <div className="cust-comn-modal-hdr">
     <p>{isUpdate ? "Edit ad mode" : "Add new mode"}</p>
    </div>
   </Modal.Header>
   <Modal.Body>
    <Formik
     enableReinitialize
     initialValues={{
      _id: isUpdate && adMode?._id,
      ad_token: adMode ? adMode?.ad_token : "",
      ad_keyword: adMode ? adMode?.ad_keyword : "",
      enable: adMode ? adMode?.enable : 0,
      version_Id: latestVersion?._id,
      version: latestVersion?.title,
      table_prefix,
     }}
     validationSchema={Yup.object({
      ad_token: Yup.string().required("Advertisement id required."),
      ad_keyword: Yup.string().required("Keyword required."),
     })}
     onSubmit={(formData, { resetForm }) => {
      submitAdMode(formData, resetForm);
     }}
    >
     {(runform) => (
      <form onSubmit={runform.handleSubmit}>
       <div className="modal-body" id="data_view">
        <div className="form-group">
         <label htmlFor="ad_token" className="form-control-label form-lbl-class  mb-1">
          Advertisement id:
         </label>
         <input type="text" name="ad_token" placeholder="Enter advertisement id" className="form-control style-input-class" {...formAttr(runform, "ad_token")} />
         {errorContainer(runform, "ad_token")}
        </div>
        <div className="form-group mt-3">
         <label htmlFor="ad_keyword" className="form-control-label form-lbl-class  mb-1">
          keyword:
         </label>
         <input type="text" name="ad_keyword" placeholder="Enter keyword" className="form-control  style-input-class" {...formAttr(runform, "ad_keyword")} />
         {errorContainer(runform, "ad_keyword")}
        </div>
       </div>
       <div className="text-end m-3">
        <button type="button" className="btn-smart-comn2 me-2" onClick={() => setModeShow(false)}>
         Close
        </button>
        <button type="submit" className="btn-smart-comn">
         {isUpdate ? "Edit" : "Add"}
        </button>
       </div>
      </form>
     )}
    </Formik>
   </Modal.Body>
  </>
 );
};

export const AdTitleModal = ({ isUpdate, adTitle, latestVersion, table_prefix, setAdTitleShow, submitAdTitle }) => {
 return (
  <>
   <Modal.Header closeButton className="">
    <div className="cust-comn-modal-hdr">
     <p>{isUpdate ? "Edit Ad-title" : "Add new Ad-title"}</p>
    </div>
   </Modal.Header>
   <Modal.Body>
    <Formik
     enableReinitialize
     initialValues={{
      _id: isUpdate && adTitle?._id,
      version_Id: latestVersion?._id,
      adm_name: adTitle ? adTitle?.adm_name : "",
      count: adTitle ? adTitle?.count : 0,
      enable: adTitle ? adTitle?.enable : 0,
      version: latestVersion?.title,
      table_prefix,
     }}
     validationSchema={Yup.object({
      adm_name: Yup.string().required("Title is required."),
     })}
     onSubmit={(formData, { resetForm }) => {
      submitAdTitle(formData, resetForm);
     }}
    >
     {(runform) => (
      <form onSubmit={runform.handleSubmit}>
       <div className="modal-body" id="data_view">
        <div className="form-group">
         <label htmlFor="adm_name" className="form-control-label form-lbl-class mt-2">
          Advertisement title:
         </label>
         <input type="text" name="adm_name" placeholder="Enter advertisement title" className="form-control style-input-class" {...formAttr(runform, "adm_name")} />
         {errorContainer(runform, "adm_name")}
        </div>
        <div className="form-group">
         <label htmlFor="count" className="form-control-label form-lbl-class mt-2">
          Count:
         </label>
         <input type="number" name="count" value="0" placeholder="View on count" className="form-control  style-input-class" min="0" {...formAttr(runform, "count")} />
         {errorContainer(runform, "count")}
        </div>
        <div className="form-group d-flex mt-3 align-item-center">
         <label className="col-2  form-lbl-class">Status</label>
         <div className="form-check form-switch">
          <input
           className="form-check-input"
           type="checkbox"
           id="offer-status"
           name="enable"
           defaultChecked={runform?.values?.enable === 1 ? true : false}
           onChangeCapture={(e) => {
            runform.setFieldValue("enable", e.target.checked ? 1 : 0);
           }}
          />
         </div>
        </div>
       </div>
       <div className="text-end m-3">
        <button type="button" className="btn-smart-comn2 me-2" onClick={() => setAdTitleShow(false)}>
         Close
        </button>
        <button type="submit" className="btn-smart-comn">
         {isUpdate ? "Edit" : "Add"}
        </button>
       </div>
      </form>
     )}
    </Formik>
   </Modal.Body>
  </>
 );
};

export const AdTypeModal = ({ setAdShow, submitAdType }) => {
 return (
  <>
   <Modal.Header closeButton className="">
    <div className="cust-comn-modal-hdr">
     <p>Add Ad-type</p>
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
      submitAdType(formData, resetForm);
     }}
    >
     {(runform) => (
      <form onSubmit={runform.handleSubmit}>
       <div className="row">
        <div className="col-md-12 mb-3" id="data_view">
         <div className="form-group ">
          <label htmlFor="recipient- onClick={stopPropagation}name" className="form-control-label mt-3 mb-2">
           Ad-type
          </label>
          <input type="text" name="vnm" className="form-control" id="title" placeholder="Enter Ad-type" {...formAttr(runform, "title")} />
          {errorContainer(runform, "title")}
         </div>
        </div>
        <div className="text-end mt-3">
         <button type="button" className="btn-smart-comn2 me-2" onClick={() => setAdShow(false)}>
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
  </>
 );
};

export const DeleteConfirmModal = ({ setDelete, setConfirmDel }) => {
 return (
  <>
   <Modal.Body>
    <div className="row">
     <div className="swal2-icon swal2-warning swal2-animate-warning-icon" id="data_view"></div>
     <div>
      <h5 className="text-center m-1 pb-1">Are you sure?</h5>
     </div>
     <div>
      <p className="text-center m-2">You won't be able to revert this!</p>
     </div>
     <div className="text-center mt-3 pb-3">
      <button type="button" className="btn-smart-comn me-2" onClick={() => setConfirmDel()}>
       Yes, delete it!
      </button>
      <button type="button" onClick={() => setDelete(false)} className="btn-smart-comn2">
       Cancel
      </button>
     </div>
    </div>
   </Modal.Body>
  </>
 );
};
