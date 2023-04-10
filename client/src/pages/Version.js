import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Dropdown, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostApi } from "../Api/apiServices";
import { API_PATH } from "../const";
import { errorContainer, formAttr } from "../CommonFun/CommonFun";
import RtdDatatable from "./Common/DataTable/DataTable";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Version = () => {
 const [versShow, setVersShow] = useState(false);
 const [adShow, setAdShow] = useState(false);
 const [adTitleShow, setAdTitleShow] = useState(false);
 const [modeShow, setModeShow] = useState(false);
 const [data, setData] = useState([]);
 const [isOpen, setIsOpen] = useState(false);
 const [option, set_option] = useState({
  sizePerPage: 10,
  search: "",
  totalRecord: 10,
  page: 1,
  sort: "position",
  order: "ASC",
  entries: true,
 });
 const columns = [
  {
   value: "title",
   label: "Version Title",
   options: {
    filter: false,
    sort: false,
   },
  },
  {
   value: "code",
   label: "Version code",
   options: {
    filter: false,
    sort: false,
   },
  },

  {
   value: "enable",
   label: "Status",
   options: {
    filter: false,
    sort: false,
    customBodyRender: (data, i) => {
     return <div>{data[i]?.enable == 1 ? "Online" : "Offline"}</div>;
    },
   },
  },

  {
   value: "action",
   label: "Action",
   options: {
    filter: false,
    sort: false,
    customBodyRender: (data, i) => {
     return (
      <div className="action-icons">
       <span
        style={{ color: "#93a2dd", cursor: "pointer", fontSize: "20px" }}
        className="pe-2"
        // onClick={() => moveItemUp(data[i]._id)}
       >
        <i className="fa fa-clipboard"></i>
       </span>
       <span
        style={{ color: "#93a2dd", cursor: "pointer", fontSize: "20px" }}
        className="pe-2"
        onClick={() => EditVersion(data[i]?._id)}
       >
        <i className="fa fa-edit "></i>
       </span>

       <span
        style={{ color: "red", cursor: "pointer", fontSize: "20px" }}
        onClick={() => deleteItem(data[i]?._id)}
       >
        <i className="fa fa-trash"></i>
       </span>
      </div>
     );
    },
   },
  },
 ];
 const table_prefix = useLocation()?.search?.substring(1);

 const appModalClose = () => setVersShow(false);
 const stopPropagation = (e) => e.stopPropagation();

 useEffect(() => {
  getAllVersion();
 }, []);

 const getAllVersion = () => {
  new Promise((resolve) =>
   resolve(PostApi(API_PATH.getAllVersion, { table_prefix: table_prefix }))
  ).then((res) => {
   if (res.status === 200) {
    setData(res.data.data);
   }
  });
 };

 const deleteItem = () => {};

 const EditVersion = () => {};

 const submitFormData = (formData, resetForm) => {
  new Promise((resolve) =>
   resolve(PostApi(API_PATH.addVersion, formData))
  ).then((res) => {
   if (res.status === 200) {
    setVersShow(false);
    toast.success(res.data.message);
    resetForm(formData);
   }
  });
 };

 const tableCallBack = (option) => {
  set_option(option);
 };

 return (
  <>
   <MainLayout>
    <div className="content-main-section">
     <div className="container-fluid">
      <div className="container-fluid">
       <div className="row">
        <div className="col-12">
         <div className="comn-inr-title d-flex align-items-center">
          <h1>Manage Version Ads</h1>
         </div>
        </div>
       </div>
       <div className="row">
        <div className="version-row1 p-2">
         <div className="version-btn cust-drop-down mytoggle">
          <Dropdown drop="left-start">
           <Dropdown.Toggle className="mytoggle" id="dropdown">
            <span>Version</span>
           </Dropdown.Toggle>
           <Dropdown.Menu className="mymenu">
            <ul>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input
                type="checkbox"
                id="vercheck1"
                name="vercheck"
                className="m-2"
                onClick={stopPropagation}
               />
               <label htmlFor="vercheck1" onClick={stopPropagation}>
                All
               </label>
              </Dropdown.Item>
             </li>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input
                type="checkbox"
                id="vercheck2"
                name="vercheck"
                className="m-2"
                onClick={stopPropagation}
               />
               <label htmlFor="vercheck2" onClick={stopPropagation}>
                1
               </label>
              </Dropdown.Item>
             </li>
            </ul>
            {/* <Dropdown.Divider /> */}
            <div className="row dropdown-footer">
             <div className="col-12 d-flex">
              <div className="col-2  ms-2">
               <button
                className="d-flex dropdown-button align-items-center "
                onClick={() => setVersShow(true)}
               >
                <i className="fa fa-plus pe-2"></i>
                Add
               </button>
              </div>
              <div className="col-10 text-end ">
               <button className="dropdown-button2 mx-2">Reset</button>
               <button className="dropdown-button">Submit</button>
              </div>
             </div>
            </div>
           </Dropdown.Menu>
          </Dropdown>
         </div>
         <div className="version-btn cust-drop-down mytoggle">
          <Dropdown drop="left-start">
           <Dropdown.Toggle className="mytoggle" id="dropdown">
            <span>Ad Type</span>
           </Dropdown.Toggle>
           <Dropdown.Menu className="mymenu">
            <ul>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input
                type="checkbox"
                id="vercheck1"
                name="vercheck"
                className="m-2"
                onClick={stopPropagation}
               />
               <label htmlFor="vercheck1" onClick={stopPropagation}>
                All
               </label>
              </Dropdown.Item>
             </li>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input
                type="checkbox"
                id="vercheck2"
                name="vercheck"
                className="m-2"
                onClick={stopPropagation}
               />
               <label htmlFor="vercheck2" onClick={stopPropagation}>
                1
               </label>
              </Dropdown.Item>
             </li>
            </ul>
            {/* <Dropdown.Divider /> */}
            <div className="row dropdown-footer">
             <div className="col-12 d-flex">
              <div className="col-2  ms-2">
               <button
                className="d-flex dropdown-button align-items-center "
                onClick={() => setAdShow(true)}
               >
                <i className="fa fa-plus pe-2"></i>
                Add
               </button>
              </div>
              <div className="col-10 text-end ">
               <button className="dropdown-button2 mx-2">Reset</button>
               <button className="dropdown-button">Submit</button>
              </div>
             </div>
            </div>
           </Dropdown.Menu>
          </Dropdown>
         </div>
         <div className="version-btn cust-drop-down mytoggle">
          <Dropdown drop="left-start">
           <Dropdown.Toggle className="mytoggle" id="dropdown">
            <span>Ad Title</span>
           </Dropdown.Toggle>
           <Dropdown.Menu className="mymenu">
            <ul>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input
                type="checkbox"
                id="vercheck1"
                name="vercheck"
                className="m-2"
                onClick={stopPropagation}
               />
               <label htmlFor="vercheck1" onClick={stopPropagation}>
                All
               </label>
              </Dropdown.Item>
             </li>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input
                type="checkbox"
                id="vercheck2"
                name="vercheck"
                className="m-2"
                onClick={stopPropagation}
               />
               <label htmlFor="vercheck2" onClick={stopPropagation}>
                1
               </label>
              </Dropdown.Item>
             </li>
            </ul>
            {/* <Dropdown.Divider /> */}
            <div className="row dropdown-footer">
             <div className="col-12 d-flex">
              <div className="col-2  ms-2">
               <button
                className="d-flex dropdown-button align-items-center"
                onClick={() => setAdTitleShow(true)}
               >
                <i className="fa fa-plus pe-2"></i>
                Add
               </button>
              </div>
              <div className="col-10 text-end ">
               <button className="dropdown-button2 mx-2">Reset</button>
               <button className="dropdown-button">Submit</button>
              </div>
             </div>
            </div>
           </Dropdown.Menu>
          </Dropdown>
         </div>
         <div className="version-btn cust-drop-down mytoggle">
          <Dropdown drop="left-start">
           <Dropdown.Toggle className="mytoggle" id="dropdown">
            <span>Mode</span>
           </Dropdown.Toggle>
           <Dropdown.Menu className="mymenu">
            <ul>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input
                type="checkbox"
                id="vercheck1"
                name="vercheck"
                className="m-2"
                onClick={stopPropagation}
               />
               <label htmlFor="vercheck1" onClick={stopPropagation}>
                All
               </label>
              </Dropdown.Item>
             </li>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input
                type="checkbox"
                id="vercheck2"
                name="vercheck"
                className="m-2"
                onClick={stopPropagation}
               />
               <label htmlFor="vercheck2" onClick={stopPropagation}>
                1
               </label>
              </Dropdown.Item>
             </li>
            </ul>
            {/* <Dropdown.Divider /> */}
            <div className="row dropdown-footer">
             <div className="col-12 d-flex">
              <div className="col-2  ms-2">
               <button
                className="d-flex dropdown-button align-items-center "
                onClick={() => setModeShow(true)}
               >
                <i className="fa fa-plus pe-2"></i>
                Add
               </button>
              </div>
              <div className="col-10 text-end ">
               <button className="dropdown-button2 mx-2">Reset</button>
               <button className="dropdown-button">Submit</button>
              </div>
             </div>
            </div>
           </Dropdown.Menu>
          </Dropdown>
         </div>
        </div>
       </div>
       <div className="row">
        <div className="version-row1 p-2 mt-3">
         <button className="version-btn2">Version Table</button>
         <button className="version-btn2">Ad Title Table</button>
         <button className="version-btn2">Mode Table</button>
        </div>
       </div>
      </div>

      <div className="col-12 mt-3">
       <div className="table-custom-info">
        <RtdDatatable
         data={data}
         columns={columns}
         option={option}
         needPagination={true}
         tableCallBack={tableCallBack}
        />
       </div>
      </div>
     </div>
    </div>
    <Modal
     show={versShow}
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
        features: "",
        code: "",
        enabled: "",
        is_force: "",
        table_prefix: table_prefix,
       }}
       validationSchema={Yup.object({
        title: Yup.string().required("Title is required."),
        features: Yup.string().required("Feature is required."),
        code: Yup.string().required("Code is required."),
       })}
       onSubmit={(formData, { resetForm }) => {
        formData.enabled = formData.enabled ? 1 : 0;
        formData.is_force = formData.is_force ? 1 : 0;
        submitFormData(formData, resetForm);
       }}
      >
       {(runform) => (
        <form onSubmit={runform.handleSubmit}>
         <div className="row">
          <div className="col-md-12 mb-3" id="data_view">
           <div className="form-group ">
            <label
             htmlFor="recipient- onClick={stopPropagation}name"
             className="form-control-label mt-3"
            >
             Version title:
            </label>
            <input
             type="text"
             name="title"
             className="form-control"
             id="title"
             placeholder="Enter title"
             {...formAttr(runform, "title")}
            />
            {errorContainer(runform, "title")}
           </div>
           <div className="form-group">
            <label
             htmlFor="recipient- onClick={stopPropagation}name"
             className="form-control-label mt-3"
            >
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
            <label
             htmlFor="recipient- onClick={stopPropagation}name"
             className="form-control-label mt-3"
            >
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
              <div className="form-check form-switch">
               <input
                className="form-check-input"
                type="checkbox"
                id="offer-status"
                name="enabled"
                {...formAttr(runform, "enabled")}

                // onChange={(e) =>
                //  updateApp({ _id: data[i]._id, enable: e.target.checked ? 1 : 0 })
                // }
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
                {...formAttr(runform, "is_force")}
                // onChange={(e) =>
                //  updateApp({ _id: data[i]._id, enable: e.target.checked ? 1 : 0 })
                // }
               />
              </div>
             </div>
            </div>
           </div>
          </div>
          <div className="text-end me-3 mt-3">
           <button
            type="button"
            className="btn-smart-comn2 me-2"
            onClick={() => setVersShow(false)}
           >
            Close
           </button>
           <button type="submit" className="btn-smart-comn">
            Add
           </button>
          </div>
         </div>
        </form>
       )}
      </Formik>
     </Modal.Body>
    </Modal>

    <Modal
     show={adShow}
     onHide={() => setAdShow(false)}
     size="md"
     className="cust-comn-modal"
     aria-labelledby="contained-modal-title-vcenter"
     centered
    >
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
        submitFormData(formData, resetForm);
       }}
      >
       {(runform) => (
        <form onSubmit={runform.handleSubmit}>
         <div className="row">
          <div className="col-md-12 mb-3" id="data_view">
           <div className="form-group ">
            <label
             htmlFor="recipient- onClick={stopPropagation}name"
             className="form-control-label mt-3 mb-2"
            >
             Ad-type
            </label>
            <input
             type="text"
             name="vnm"
             className="form-control"
             id="title"
             placeholder="Enter Ad-type"
             {...formAttr(runform, "title")}
            />
            {errorContainer(runform, "title")}
           </div>
          </div>
          <div className="text-end mt-3">
           <button
            type="button"
            className="btn-smart-comn2 me-2"
            onClick={() => setAdShow(false)}
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
    <Modal
     show={adTitleShow}
     onHide={() => setAdTitleShow(false)}
     size="md"
     className="cust-comn-modal"
     aria-labelledby="contained-modal-title-vcenter"
     centered
    >
     <Modal.Header closeButton className="">
      <div className="cust-comn-modal-hdr">
       <p>Add new Ad-title</p>
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
         <div className="modal-body" id="data_view">
          <div className="form-group">
           <label
            htmlFor="recipient-name"
            className="form-control-label form-lbl-class mt-2"
           >
            Advertisement title:
           </label>
           <input
            type="text"
            name="admnm"
            placeholder="Enter advertisement title"
            className="form-control style-input-class"
           />
           {errorContainer(runform, "title")}
          </div>
          <div className="form-group">
           <label
            htmlFor="recipient-name"
            className="form-control-label form-lbl-class mt-2"
           >
            Count:
           </label>
           <input
            type="number"
            name="count"
            value="0"
            placeholder="View on count"
            className="form-control  style-input-class"
            min="0"
           />
           {errorContainer(runform, "title")}
          </div>
          <div className="form-group d-flex mt-3 align-item-center">
           <label className="col-2  form-lbl-class">Status</label>
           <div className="form-check form-switch">
            <input
             className="form-check-input"
             type="checkbox"
             id="offer-status"
             defaultChecked
             // onChange={(e) =>
             //  updateApp({ _id: data[i]._id, enable: e.target.checked ? 1 : 0 })
             // }
            />
           </div>
          </div>
         </div>
         <div className="text-end m-3">
          <button
           type="button"
           className="btn-smart-comn2 me-2"
           onClick={() => setAdTitleShow(false)}
          >
           Close
          </button>
          <button type="submit" onclick={() => {}} className="btn-smart-comn">
           Add
          </button>
         </div>
        </form>
       )}
      </Formik>
     </Modal.Body>
    </Modal>

    <Modal
     show={modeShow}
     onHide={() => setModeShow(false)}
     size="md"
     className="cust-comn-modal"
     aria-labelledby="contained-modal-title-vcenter"
     centered
    >
     <Modal.Header closeButton className="">
      <div className="cust-comn-modal-hdr">
       <p>Add new mode</p>
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
         <div className="modal-body" id="data_view">
          <div className="form-group">
           <label
            htmlFor="recipient-name"
            className="form-control-label form-lbl-class  mb-1"
           >
            Advertisement id:
           </label>
           <input
            type="text"
            name="admnm"
            placeholder="Enter advertisement id"
            className="form-control style-input-class"
           />
           {errorContainer(runform, "title")}
          </div>
          <div className="form-group mt-3">
           <label
            htmlFor="recipient-name"
            className="form-control-label form-lbl-class  mb-1"
           >
            keyword:
           </label>
           <input
            type="text"
            name="keyword"
            placeholder="Enter keyword"
            className="form-control  style-input-class"
           />
           {errorContainer(runform, "keyword")}
          </div>
         </div>
         <div className="text-end m-3">
          <button
           type="button"
           className="btn-smart-comn2 me-2"
           onClick={() => setModeShow(false)}
          >
           Close
          </button>
          <button type="submit" onclick={() => {}} className="btn-smart-comn">
           Add
          </button>
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
