import { Formik } from "formik";
import React, { useRef, useState } from "react";
import Cloud from "../Images/clould.svg";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import { errorContainer, formAttr } from "../CommonFun/CommonFun";
import { ImagePostApi } from "../Api/apiServices";
import { API_PATH } from "../const";

const CustomAdModal = ({ update, id, customAd, updateApp, submitFormData, setShow }) => {
 const [banner, setBanner] = useState("");
 const [icon, setIcon] = useState("");
 const [bannerUrl, setBannerUrl] = useState("");
 const [iconUrl, setIconUrl] = useState("");
 const [error, setError] = useState(false);

 const customAdRef = useRef();

 const uploadImage = (e, type) => {
  (iconUrl || bannerUrl) && setError(false);
  const formData = new FormData();
  formData.append("imgPrefix", type === "icon" ? "ICON" : "BANNER");
  formData.append("folderName", "AD");
  formData.append("image", e.target.files[0]);
  type === "banner" ? setBanner(e.target.files[0]) : type === "icon" && setIcon(e.target.files[0]);
  new Promise((resolve) => resolve(ImagePostApi(API_PATH.imgUpload, formData))).then((res) => {
   if (res.status === 200) {
    type === "banner" ? setBannerUrl(res.data.data?.imgUrl) : type === "icon" && setIconUrl(res.data.data?.imgUrl);
   }
  });
 };

 return (
  <>
   <Modal.Header closeButton className="">
    <div className="cust-comn-modal-hdr">
     <p>{update ? "Edit Custom-AD" : "Add Custom-AD"}</p>
    </div>
   </Modal.Header>
   <Modal.Body>
    <Formik
     innerRef={customAdRef}
     enableReinitialize
     initialValues={{
      _id: update && customAd?._id,
      add_title: customAd ? customAd?.add_title : "",
      add_desc: customAd ? customAd?.add_desc : "",
      banner: update ? (bannerUrl ? bannerUrl : customAd?.banner) : bannerUrl,
      icon: update ? (iconUrl ? iconUrl : customAd?.icon) : iconUrl,
      install: customAd ? customAd?.install : "",
      color: customAd ? customAd?.color : "#000000",
      code: customAd ? customAd?.color : "#000000",
      rating: customAd ? customAd?.rating : "",
      review: customAd ? customAd?.review : "",
      download: customAd ? customAd?.download : "",
     }}
     validationSchema={Yup.object({
      add_title: Yup.string().required("required."),
      add_desc: Yup.string().required("required."),
      install: Yup.string().required("required."),
      color: Yup.string().required("required."),
      rating: Yup.string().required("required."),
      download: Yup.string().required("required."),
      review: Yup.string().required("required."),
     })}
     onSubmit={(formData, { resetForm }) => {
      if (!formData.banner || !formData.icon) {
       setError(true);
      } else {
       setError(false);
       update ? updateApp(formData, resetForm) : submitFormData(formData, resetForm);
      }
     }}
    >
     {(runform) => (
      <form onSubmit={runform.handleSubmit}>
       <div className="form-group row pt-3 align-items-center">
        <div className="col-xl-7 text-center">
         <center>
          <label htmlFor="banner">
           <img id="Aoutput" src={banner ? URL.createObjectURL(banner) : customAd ? customAd?.banner : Cloud} style={{ maxWidth: "150px", maxHeight: "150px", height: "150px" }} alt="" />
          </label>
         </center>
        </div>
        <div className="col-xl-5">
         <center>
          <label htmlFor="icon">
           <img id="Aoutput1" src={icon ? URL.createObjectURL(icon) : customAd ? customAd?.icon : Cloud} style={{ maxWidth: "100px", maxHeight: "100px", height: "100px" }} alt="" />
          </label>
         </center>
        </div>
        <div className="col-xl-12 pt-3">
         <center>{error && <span className="text-danger">Banner & icon is required.</span>}</center>
        </div>
       </div>

       <div className="form-group row pt-3">
        <div className="col-xl-7">
         <label className="btn-green btn-block text-center" style={{ padding: "10px" }} htmlFor="banner">
          Browse Banner
          <input type="file" name="banner" className="d-none" id="banner" accept="image/*" onChange={(e) => uploadImage(e, "banner")} />
         </label>
         {/* {errorContainer(runform, "banner")} */}
        </div>

        <div className="col-xl-5">
         <label className="btn-green btn-block text-center" style={{ padding: "10px" }} htmlFor="icon">
          Browse Icon
          <input type="file" name="icon" className="d-none" id="icon" accept="image/*" onChange={(e) => uploadImage(e, "icon")} />
         </label>
         {/* {errorContainer(runform, "icon")} */}
        </div>
       </div>

       <div className="form-group pt-3">
        <label htmlFor="title" className="form-control-label pb-1">
         Title:
        </label>
        <input type="text" name="add_title" className="form-control cad" id="title" placeholder="Enter title" {...formAttr(runform, "add_title")} />
        {errorContainer(runform, "add_title")}
       </div>

       <div className="form-group pt-3">
        <label htmlFor="description" className="form-control-label pb-1">
         Description:
        </label>
        <textarea name="add_desc" className="form-control cad" rows="3" id="description" placeholder="Enter description" {...formAttr(runform, "add_desc")}></textarea>
        {errorContainer(runform, "add_desc")}
       </div>

       <div className="form-group pt-3">
        <label htmlFor="playstorelink" className="form-control-label pb-1">
         Playstore Link:
        </label>
        <input type="text" name="install" className="form-control cad" id="playstorelink" placeholder="Enter playstore link" {...formAttr(runform, "install")} />
        {errorContainer(runform, "install")}
       </div>

       <div className="form-group row pt-3">
        <div className="col-xl-4">
         <label htmlFor="rating" className="form-control-label pb-1">
          Rating:
         </label>
         <input type="text" name="rating" className="form-control cad" id="rating" placeholder="Enter rating" {...formAttr(runform, "rating")} />
         {errorContainer(runform, "rating")}
        </div>
        <div className="col-xl-4">
         <label htmlFor="review" className="form-control-label pb-1">
          Reviews:
         </label>
         <input type="text" name="review" className="form-control cad" id="review" placeholder="Enter review" {...formAttr(runform, "review")} />
         {errorContainer(runform, "review")}
        </div>
        <div className="col-xl-4">
         <label htmlFor="downloads" className="form-control-label pb-1">
          Downloads:
         </label>
         <input type="text" name="download" className="form-control cad" id="downloads" placeholder="Enter downloads" {...formAttr(runform, "download")} />
         {errorContainer(runform, "download")}
        </div>
       </div>

       <div className="form-group row pt-3">
        <div className="col-xl-8">
         <label htmlFor="clrBTCA" className="form-control-label">
          Button Color:
         </label>
         <input type="color" className="form-control cad mt-2 mb-3 p-1" id="clrBTCA" {...formAttr(runform, "color")} onChangeCapture={(e) => runform.setFieldValue("color", e.target.value)} onBlurCapture={(e) => e.target.value && runform.setFieldValue("code", e.target.value)} />
         {errorContainer(runform, "color")}
        </div>
        <div className="col-xl-4">
         <label htmlFor="code" className="form-control-label pb-1">
          Color Code:
         </label>
         <input type="text" className="form-control cad" name="code" id="code" {...formAttr(runform, "code")} onBlurCapture={(e) => e.target.value && runform.setFieldValue("color", e.target.value)} />
        </div>
       </div>

       <div className="text-end mt-4 mb-2 me-1">
        <button type="button" className="btn-smart-comn2 me-2" onClick={() => setShow(false)}>
         Close
        </button>
        <button type="submit" className="btn-smart-comn" id="">
         {update ? "Edit" : "Add"}
        </button>
       </div>
      </form>
     )}
    </Formik>
   </Modal.Body>
  </>
 );
};

const BannerModal = ({ update, id, bannerData, updateApp, submitFormData, setShow }) => {
 const [banner, setBanner] = useState("");
 const [icon, setIcon] = useState("");
 const [bannerUrl, setBannerUrl] = useState("");
 const [iconUrl, setIconUrl] = useState("");
 const [error, setError] = useState(false);

 const uploadImage = (e, type) => {
  (iconUrl || bannerUrl) && setError(false);
  const formData = new FormData();
  formData.append("imgPrefix", type === "icon" ? "ICON" : "BANNER");
  formData.append("folderName", "AD");
  formData.append("image", e.target.files[0]);
  type === "banner" ? setBanner(e.target.files[0]) : type === "icon" && setIcon(e.target.files[0]);
  new Promise((resolve) => resolve(ImagePostApi(API_PATH.imgUpload, formData))).then((res) => {
   if (res.status === 200) {
    type === "banner" ? setBannerUrl(res.data.data?.imgUrl) : type === "icon" && setIconUrl(res.data.data?.imgUrl);
   }
  });
 };

 return (
  <>
   <Modal.Header closeButton className="">
    <div className="cust-comn-modal-hdr">
     <p>{update ? "Add New Banner" : "Edit New Banner"}</p>
    </div>
   </Modal.Header>
   <Modal.Body>
    <Formik
     enableReinitialize
     initialValues={{
      _id: update && bannerData?._id,
      icon: update ? (iconUrl ? iconUrl : bannerData?.icon) : iconUrl,
      banner: update ? (bannerUrl ? bannerUrl : bannerData?.banner) : bannerUrl,
      color: bannerData ? bannerData?.color : "#000000",
      code: bannerData ? bannerData?.color : "#000000",
      design_page: bannerData ? bannerData?.design_page : "",
     }}
     validationSchema={Yup.object({
      design_page: Yup.string().required("required."),
      color: Yup.string().required("required."),
     })}
     onSubmit={(formData, { resetForm }) => {
      if (!formData.banner || !formData.icon) {
       setError(true);
      } else {
       setError(false);
       update ? updateApp(formData, resetForm) : submitFormData(formData, resetForm);
      }
     }}
    >
     {(runform) => (
      <form onSubmit={runform.handleSubmit}>
       <div className="form-group row pt-3 align-items-center">
        <div className="col-xl-7 text-center">
         <center>
          <label htmlFor="banner">
           <img id="Aoutput" src={banner ? URL.createObjectURL(banner) : bannerData ? bannerData?.banner : Cloud} style={{ maxWidth: "150px", maxHeight: "150px", height: "150px" }} alt="" />
          </label>
         </center>
        </div>
        <div className="col-xl-5">
         <center>
          <label htmlFor="icon">
           <img id="Aoutput1" src={icon ? URL.createObjectURL(icon) : bannerData ? bannerData?.icon : Cloud} style={{ maxWidth: "100px", maxHeight: "100px", height: "100px" }} alt="" />
          </label>
         </center>
        </div>
        <div className="col-xl-12 pt-3">
         <center>{error && <span className="text-danger">Banner & icon is required.</span>}</center>
        </div>
       </div>

       <div className="form-group row pt-3">
        <div className="col-xl-7">
         <label className="btn-green btn-block text-center" style={{ padding: "10px" }} htmlFor="banner">
          Browse Banner
          <input type="file" name="banner" className="d-none" id="banner" accept="image/*" onChange={(e) => uploadImage(e, "banner")} />
         </label>
         {/* {errorContainer(runform, "banner")} */}
        </div>

        <div className="col-xl-5">
         <label className="btn-green btn-block text-center" style={{ padding: "10px" }} htmlFor="icon">
          Browse Icon
          <input type="file" name="icon" className="d-none" id="icon" accept="image/*" onChange={(e) => uploadImage(e, "icon")} />
         </label>
         {/* {errorContainer(runform, "icon")} */}
        </div>
       </div>

       <div className="form-group pt-3">
        <label htmlFor="title" className="form-control-label pb-1">
         Design Page:
        </label>
        <input type="text" name="add_title" className="form-control cad" id="title" placeholder="Enter design page link" {...formAttr(runform, "add_title")} />
        {errorContainer(runform, "add_title")}
       </div>

       <div className="form-group row pt-3">
        <div className="col-xl-8">
         <label htmlFor="clrBTCA" className="form-control-label">
          Button Color:
         </label>
         <input type="color" className="form-control cad mt-2 mb-3 p-1" id="clrBTCA" {...formAttr(runform, "color")} onChangeCapture={(e) => runform.setFieldValue("color", e.target.value)} onBlurCapture={(e) => e.target.value && runform.setFieldValue("code", e.target.value)} />
         {errorContainer(runform, "color")}
        </div>
        <div className="col-xl-4">
         <label htmlFor="code" className="form-control-label pb-1">
          Color Code:
         </label>
         <input type="text" className="form-control cad" name="code" id="code" {...formAttr(runform, "code")} onBlurCapture={(e) => e.target.value && runform.setFieldValue("color", e.target.value)} />
        </div>
       </div>

       <div className="text-end mt-4 mb-2 me-1">
        <button type="button" className="btn-smart-comn2 me-2" onClick={() => setShow(false)}>
         Close
        </button>
        <button type="submit" className="btn-smart-comn" id="">
         {update ? "Edit" : "Add"}
        </button>
       </div>
      </form>
     )}
    </Formik>
   </Modal.Body>
  </>
 );
};

export default { CustomAdModal, BannerModal };
