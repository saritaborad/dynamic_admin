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
import { AdTitleModal, AdTypeModal, ModeModal, NoteModal, VersionModal } from "../Modals/VersionModal";

const Version = () => {
 const [data, setData] = useState([]);
 const [version, setVersion] = useState("");
 const [isUpdate, setIsUpdate] = useState(false);

 const [versShow, setVersShow] = useState(false);
 const [adShow, setAdShow] = useState(false);
 const [adTitleShow, setAdTitleShow] = useState(false);
 const [modeShow, setModeShow] = useState(false);
 const [noteShow, setNoteShow] = useState(false);
 const [isOpen, setIsOpen] = useState(false);
 const [option, set_option] = useState({
  sizePerPage: 10,
  search: "",
  totalRecord: 10,
  page: 1,
  sort: "createdAt",
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
     return <div>{data[i]?.enabled === 1 ? "Online" : "Offline"}</div>;
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
        onClick={() => {
         setIsUpdate(true);
         setVersion(data[i]);
         setNoteShow(true);
        }}
       >
        <i className="fa fa-clipboard"></i>
       </span>
       <span
        style={{ color: "#93a2dd", cursor: "pointer", fontSize: "20px" }}
        className="pe-2"
        onClick={() => {
         setIsUpdate(true);
         setVersion(data[i]);
         setVersShow(true);
        }}
       >
        <i className="fa fa-edit "></i>
       </span>

       <span style={{ color: "red", cursor: "pointer", fontSize: "20px" }} onClick={() => delVersion(data[i]?._id)}>
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

 const getAllVersion = (search) => {
  let data = { table_prefix: table_prefix, ...option, search: search };
  new Promise((resolve) => resolve(PostApi(API_PATH.getAllVersion, data))).then((res) => {
   if (res.status === 200) {
    set_option({ ...option, totalRecord: res.data.data?.totalRecord });
    setData(res.data.data);
   }
  });
 };

 const delVersion = (id) => {
  let data = { table_prefix: table_prefix, _id: id };
  new Promise((resolve, reject) => {
   resolve(PostApi(API_PATH.delVersion, data));
  }).then((res) => {
   if (res.status === 200) {
    toast.success(res.data.message);
    getAllVersion();
   }
  });
 };

 const submitFormData = (formData, resetForm) => {
  let path = isUpdate ? API_PATH.editVersion : API_PATH.addVersion;
  new Promise((resolve) => resolve(PostApi(path, formData))).then((res) => {
   if (res.status === 200) {
    setVersShow(false);
    setNoteShow(false);
    toast.success(res.data.message);
    resetForm(formData);
    getAllVersion();
   }
  });
 };

 const submitAdTitle = (formData, resetForm) => {
  console.log(formData);
  let path = isUpdate ? API_PATH.addTitle : API_PATH.addTitle;
  new Promise((resolve) => resolve(PostApi(path, formData))).then((res) => {
   if (res.status === 200) {
    setAdTitleShow(false);
    toast.success(res.data.message);
    resetForm(formData);
    getAllVersion();
   }
  });
 };

 const submitAdMode = (formData, resetForm) => {
  let path = isUpdate ? API_PATH.addMode : API_PATH.addMode;
  new Promise((resolve) => resolve(PostApi(path, formData))).then((res) => {
   if (res.status === 200) {
    setModeShow(false);
    toast.success(res.data.message);
    resetForm(formData);
    getAllVersion();
   }
  });
 };

 const tableCallBack = (option) => {
  set_option(option);
  getAllVersion(option.search);
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
               <input type="checkbox" id="version0" name="version0" className="ms-2 me-2" onClick={stopPropagation} />
               <label htmlFor="version0" onClick={stopPropagation}>
                All
               </label>
              </Dropdown.Item>
             </li>
             {data &&
              data?.length > 0 &&
              data?.map((item, i) => {
               return (
                <li key={i}>
                 <Dropdown.Item onClick={stopPropagation}>
                  <input type="checkbox" id={`version${i + 1}`} name={`version${i + 1}`} className="ms-2 me-2" onClick={stopPropagation} />
                  <label htmlFor={`version${i + 1}`} onClick={stopPropagation}>
                   {item?.title}
                  </label>
                 </Dropdown.Item>
                </li>
               );
              })}
            </ul>
            {/* <Dropdown.Divider /> */}
            <div className="row dropdown-footer">
             <div className="col-12 d-flex">
              <div className="col-2  ms-2">
               <button className="d-flex dropdown-button align-items-center" onClick={() => setVersShow(true)}>
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
               <input type="checkbox" id="vercheck1" name="vercheck" className="m-2" onClick={stopPropagation} />
               <label htmlFor="vercheck1" onClick={stopPropagation}>
                All
               </label>
              </Dropdown.Item>
             </li>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input type="checkbox" id="vercheck2" name="vercheck" className="m-2" onClick={stopPropagation} />
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
               <button className="d-flex dropdown-button align-items-center " onClick={() => setAdShow(true)}>
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
               <input type="checkbox" id="vercheck1" name="vercheck" className="m-2" onClick={stopPropagation} />
               <label htmlFor="vercheck1" onClick={stopPropagation}>
                All
               </label>
              </Dropdown.Item>
             </li>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input type="checkbox" id="vercheck2" name="vercheck" className="m-2" onClick={stopPropagation} />
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
               <button className="d-flex dropdown-button align-items-center" onClick={() => setAdTitleShow(true)}>
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
               <input type="checkbox" id="vercheck1" name="vercheck" className="m-2" onClick={stopPropagation} />
               <label htmlFor="vercheck1" onClick={stopPropagation}>
                All
               </label>
              </Dropdown.Item>
             </li>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input type="checkbox" id="vercheck2" name="vercheck" className="m-2" onClick={stopPropagation} />
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
               <button className="d-flex dropdown-button align-items-center " onClick={() => setModeShow(true)}>
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
        <RtdDatatable data={data} columns={columns} option={option} needPagination={true} tableCallBack={tableCallBack} />
       </div>
      </div>
     </div>
    </div>

    <Modal show={versShow} onHide={() => appModalClose()} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <VersionModal isUpdate={isUpdate} version={version} table_prefix={table_prefix} submitFormData={submitFormData} setVersShow={setVersShow} />
    </Modal>

    <Modal show={adTitleShow} onHide={() => setAdTitleShow(false)} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <AdTitleModal setAdTitleShow={setAdTitleShow} submitAdTitle={submitAdTitle} allversion={data} table_prefix={table_prefix} />
    </Modal>

    <Modal show={modeShow} onHide={() => setModeShow(false)} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <ModeModal allversion={data} setModeShow={setModeShow} submitAdMode={submitAdMode} table_prefix={table_prefix} />
    </Modal>

    <Modal show={noteShow} onHide={() => setNoteShow(false)} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <NoteModal version={version} setNoteShow={setNoteShow} submitFormData={submitFormData} />
    </Modal>

    <Modal show={adShow} onHide={() => setAdShow(false)} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <AdTypeModal setAdShow={setAdShow} />
    </Modal>
   </MainLayout>
  </>
 );
};

export default Version;
