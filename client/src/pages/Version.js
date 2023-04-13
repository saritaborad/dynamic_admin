import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Dropdown, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostApi, SessionPostAPI } from "../Api/apiServices";
import { API_PATH } from "../const";
import { errorContainer, formAttr } from "../CommonFun/CommonFun";
import RtdDatatable from "./Common/DataTable/DataTable";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AdTitleModal, AdTypeModal, ModeModal, NoteModal, VersionModal } from "../Modals/VersionModal";

const Version = () => {
 const [versionData, setVersionData] = useState([]);
 const [adTitleData, setAdTitleData] = useState([]);
 const [adModeData, setAdModeData] = useState([]);
 const [uniqueAdMode, setUniqueAdMode] = useState([]);

 const [tableData, setTableData] = useState([]);
 const [tableColumn, setTableColumn] = useState([]);

 const [verFilter, setVerFilter] = useState("");
 const [titleFilter, setTitleFilter] = useState("");
 const [modeFilter, setModeFilter] = useState("");

 const [version, setVersion] = useState("");
 const [adTitle, setAdTitle] = useState("");
 const [adMode, setAdMode] = useState("");
 const [latestVersion, setLatestVersion] = useState("");

 const [isUpdate, setIsUpdate] = useState(false);
 const [versShow, setVersShow] = useState(false);
 const [adShow, setAdShow] = useState(false);
 const [adTitleShow, setAdTitleShow] = useState(false);
 const [modeShow, setModeShow] = useState(false);
 const [noteShow, setNoteShow] = useState(false);

 const [active, setActive] = useState(1);
 const [isOpen, setIsOpen] = useState(false);
 const table_prefix = useLocation()?.search?.substring(1);
 const stopPropagation = (e) => e.stopPropagation();

 const [option, set_option] = useState({
  sizePerPage: 10,
  totalRecord: 10,
  page: 1,
  sort: "code",
  order: "DSC",
 });
 const columns1 = [
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
     return <span className={data[i]?.enabled === 1 ? "online" : "offline"}>{data[i]?.enabled === 1 ? "Online" : "Offline"}</span>;
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
 const columns2 = [
  {
   value: "version",
   label: "Version",
   options: {
    filter: false,
    sort: false,
   },
  },
  {
   value: "adm_name",
   label: "Advertisement title",
   options: {
    filter: false,
    sort: false,
   },
  },

  {
   value: "count",
   label: "Count",
   options: {
    filter: false,
    sort: false,
   },
  },
  {
   value: "count",
   label: "Visibility mode",
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
     return <span className={data[i]?.enabled === 1 ? "online" : "offline"}>{data[i]?.enabled === 1 ? "Online" : "Offline"}</span>;
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
         setAdTitle(data[i]);
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
         setAdTitle(data[i]);
         setAdTitleShow(true);
        }}
       >
        <i className="fa fa-edit "></i>
       </span>

       <span style={{ color: "red", cursor: "pointer", fontSize: "20px" }} onClick={() => delTitle(data[i]?._id, data[i]?.version_Id)}>
        <i className="fa fa-trash"></i>
       </span>
      </div>
     );
    },
   },
  },
 ];
 const columns3 = [
  {
   value: "version",
   label: "Version",
   options: {
    filter: false,
    sort: false,
   },
  },
  {
   value: "adm_name",
   label: "Advertisement Title",
   options: {
    filter: false,
    sort: false,
   },
  },
  {
   value: "ad_token",
   label: "Advertisement ID",
   options: {
    filter: false,
    sort: false,
   },
  },
  {
   value: "ad_keyword",
   label: "	Key Word",
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
     return <span className={data[i]?.enabled === 1 ? "online" : "offline"}>{data[i]?.enabled === 1 ? "Online" : "Offline"}</span>;
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
         setAdMode(data[i]);
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
         setAdMode(data[i]);
         setModeShow(true);
        }}
       >
        <i className="fa fa-edit "></i>
       </span>

       <span style={{ color: "red", cursor: "pointer", fontSize: "20px" }} onClick={() => delMode(data[i]?._id, data[i]?.version_Id)}>
        <i className="fa fa-trash"></i>
       </span>
      </div>
     );
    },
   },
  },
 ];

 useEffect(() => {
  getAllAdTitle();
  getAllAdMode();
  getAllVersion();
 }, []);

 const getAllVersion = (search) => {
  let data = { table_prefix: table_prefix, ...option, search: search };
  new Promise((resolve) => resolve(PostApi(API_PATH.getAllVersion, data))).then((res) => {
   if (res.status === 200) {
    const maxObject = res.data.data?.length > 0 ? res.data.data?.reduce((a, b) => (a?.code > b?.code ? a : b)) : null;
    setLatestVersion(maxObject);
    set_option({ ...option, totalRecord: res.data.data?.totalRecord });
    setVersionData(res.data.data);
    setTableData(res.data.data);
    setTableColumn(columns1);
    setActive(1);
   }
  });
 };

 const getAllAdTitle = () => {
  let data = { table_prefix: table_prefix };
  new Promise((resolve) => resolve(PostApi(API_PATH.getAllAdTitle, data))).then((res) => {
   if (res.status === 200) {
    set_option({ ...option, totalRecord: res.data.data?.totalRecord });
    setAdTitleData(res.data.data);
    setTableData(res.data.data);
    setTableColumn(columns2);
    setActive(2);
   }
  });
 };

 const getAllAdMode = () => {
  let data = { table_prefix: table_prefix };
  new Promise((resolve) => resolve(PostApi(API_PATH.getAllAdMode, data))).then((res) => {
   if (res.status === 200) {
    set_option({ ...option, totalRecord: res.data.data?.totalRecord });
    setAdModeData(res.data.data);
    setUniqueAdMode(adModeData?.filter((obj, index, self) => index === self?.findIndex((t) => t?.ad_keyword === obj?.ad_keyword)));
    setTableData(res.data.data);
    setTableColumn(columns3);
    setActive(3);
   }
  });
 };

 const delVersion = (id) => {
  let data = { table_prefix: table_prefix, _id: id };
  new Promise((resolve, reject) => resolve(PostApi(API_PATH.delVersion, data))).then((res) => {
   if (res.status === 200) {
    toast.success(res.data.message);
    getAllVersion();
   }
  });
 };

 const delTitle = (id, vId) => {
  let data = { table_prefix: table_prefix, _id: id, version_Id: vId };
  new Promise((resolve, reject) => resolve(PostApi(API_PATH.delTitle, data))).then((res) => {
   if (res.status === 200) {
    toast.success(res.data.message);
    getAllAdTitle();
   }
  });
 };

 const delMode = (id, vId) => {
  let data = { table_prefix: table_prefix, _id: id, version_Id: vId };
  new Promise((resolve, reject) => resolve(PostApi(API_PATH.delMode, data))).then((res) => {
   if (res.status === 200) {
    toast.success(res.data.message);
    getAllAdMode();
   }
  });
 };

 const submitFormData = (formData, resetForm) => {
  let path = isUpdate ? API_PATH.editVersion : API_PATH.addVersion;
  new Promise((resolve) => resolve(PostApi(path, formData))).then((res) => {
   if (res.status === 200) {
    setVersShow(false);
    setNoteShow(false);
    setIsUpdate(false);
    toast.success(res.data.message);
    resetForm(formData);
    getAllVersion();
   }
  });
 };

 const submitAdTitle = (formData, resetForm) => {
  if (versionData?.length === 0) {
   setAdTitleShow(false);
   return;
  }
  let path = isUpdate ? API_PATH.editTitle : API_PATH.addTitle;
  new Promise((resolve) => resolve(PostApi(path, formData))).then((res) => {
   if (res.status === 200) {
    setAdTitleShow(false);
    setIsUpdate(false);
    toast.success(res.data.message);
    resetForm(formData);
    getAllAdTitle();
   }
  });
 };

 const submitAdMode = (formData, resetForm) => {
  if (versionData?.length === 0 || adTitleData?.length === 0) {
   setModeShow(false);
   return;
  }
  let path = isUpdate ? API_PATH.editMode : API_PATH.addMode;
  new Promise((resolve) => resolve(PostApi(path, formData))).then((res) => {
   if (res.status === 200) {
    setModeShow(false);
    setIsUpdate(false);
    toast.success(res.data.message);
    resetForm(formData);
    getAllAdMode();
   }
  });
 };

 const tableCallBack = (option) => {
  set_option(option);
  getAllVersion(option.search);
 };

 const changeTable = (type) => {
  setActive(type);
  type === 1 ? getAllVersion() : type === 2 ? getAllAdTitle() : type === 3 && getAllAdMode();
 };

 const versionFilter = (e, item) => {
  if (e.target.checked) {
   setVerFilter((prev) => [...prev, item]);
  } else {
   setVerFilter((prev) => prev?.filter((item1) => item?._id !== item1?._id));
  }
 };

 const addFilter = (filter, type) => {
  let data = type === 1 ? { verFilter: filter } : type === 2 ? { titleFilter: filter } : type === 3 && { modeFilter: filter };
  new Promise((resolve) => resolve(PostApi(API_PATH.addFilter, data))).then((res) => {});
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

             {versionData &&
              versionData?.length > 0 &&
              versionData?.map((item, i) => {
               return (
                <li key={i}>
                 <Dropdown.Item onClick={stopPropagation}>
                  <input type="checkbox" id={`version${i + 1}`} name={`version${i + 1}`} className="ms-2 me-2" onClick={stopPropagation} onChange={(e) => versionFilter(e, item)} />
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
               <button className="dropdown-button" onClick={() => addFilter(verFilter, 1)}>
                Submit
               </button>
              </div>
             </div>
            </div>
           </Dropdown.Menu>
          </Dropdown>
         </div>
         {/* <div className="version-btn cust-drop-down mytoggle">
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
         </div> */}
         <div className="version-btn cust-drop-down mytoggle">
          <Dropdown drop="left-start">
           <Dropdown.Toggle className="mytoggle" id="dropdown">
            <span>Ad Title</span>
           </Dropdown.Toggle>
           <Dropdown.Menu className="mymenu">
            <ul>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input type="checkbox" id="adtitle0" name="adtitle0" className="m-2" onClick={stopPropagation} />
               <label htmlFor="adtitle0" onClick={stopPropagation}>
                All
               </label>
              </Dropdown.Item>
             </li>
             {adTitleData?.length > 0 &&
              adTitleData?.map((item, i) => {
               return (
                <li>
                 <Dropdown.Item onClick={stopPropagation}>
                  <input type="checkbox" id={`adtitle${i + 1}`} name={`adtitle${i + 1}`} className="m-2" onClick={stopPropagation} />
                  <label htmlFor={`adtitle${i + 1}`} onClick={stopPropagation}>
                   {item?.adm_name}
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
               <input type="checkbox" id="admode0" name="admode0" className="m-2" onClick={stopPropagation} />
               <label htmlFor="admode0" onClick={stopPropagation}>
                All
               </label>
              </Dropdown.Item>
             </li>

             {uniqueAdMode?.length > 0 &&
              uniqueAdMode?.map((item, i) => {
               return (
                <li>
                 <Dropdown.Item onClick={stopPropagation}>
                  <input type="checkbox" id={`admode${i + 1}`} name={`admode${i + 1}`} className="m-2" onClick={stopPropagation} />
                  <label htmlFor={`admode${i + 1}`} onClick={stopPropagation}>
                   {item?.ad_keyword}
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
         <button className={`version-btn2 ${active === 1 ? "active" : ""}`} onClick={() => changeTable(1)}>
          Version Table
         </button>
         <button className={`version-btn2 ${active === 2 ? "active" : ""}`} onClick={() => changeTable(2)}>
          Ad Title Table
         </button>
         <button className={`version-btn2 ${active === 3 ? "active" : ""}`} onClick={() => changeTable(3)}>
          Mode Table
         </button>
        </div>
       </div>
      </div>

      <div className="col-12 mt-3">
       <div className="table-custom-info">
        <RtdDatatable data={tableData} columns={tableColumn} option={option} needPagination={true} tableCallBack={tableCallBack} />
       </div>
      </div>
     </div>
    </div>

    <Modal show={versShow} onHide={() => setVersShow(false)} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <VersionModal isUpdate={isUpdate} version={version} adTitle={adTitleData} adMode={uniqueAdMode} table_prefix={table_prefix} submitFormData={submitFormData} setVersShow={setVersShow} />
    </Modal>

    <Modal show={adTitleShow} onHide={() => setAdTitleShow(false)} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <AdTitleModal isUpdate={isUpdate} adTitle={adTitle} latestVersion={latestVersion} setAdTitleShow={setAdTitleShow} submitAdTitle={submitAdTitle} allversion={versionData} table_prefix={table_prefix} />
    </Modal>

    <Modal show={modeShow} onHide={() => setModeShow(false)} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <ModeModal isUpdate={isUpdate} adMode={adMode} latestVersion={latestVersion} allversion={versionData} setModeShow={setModeShow} submitAdMode={submitAdMode} table_prefix={table_prefix} />
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
