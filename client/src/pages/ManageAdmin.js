import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import MainLayout from "../components/layout/MainLayout";
import RtdDatatable from "./Common/DataTable/DataTable";
import { Dropdown, Modal } from "react-bootstrap";
import { ReactComponent as Loader } from "../Images/loader.svg";
import { PostApi } from "../Api/apiServices";
import { API_PATH } from "../const";
import AppModal from "../Modals/AppModal";
import { AppContext } from "../Context/AppContext";
import { DeleteConfirmModal } from "../Modals/DeleteConfirmModal";
import { StatusFilter } from "../components/Common/Common";

let arr = [];

const ManageAdmin = () => {
 const { setActiveApp } = useContext(AppContext);
 const [title, setTitle] = useState("");
 const [show, setShow] = useState(false);
 const [update, setUpdate] = useState(false);
 const [id, setId] = useState("");
 const [data, setData] = useState([]);
 const [selectedItem, setSelectedItem] = useState("All");
 const [deleteConfirm, setDeleteConfirm] = useState(false);
 const [loader, setLoader] = useState(false);
 const [option, set_option] = useState({
  sizePerPage: 10,
  search: "",
  totalRecord: 10,
  page: 1,
  sort: "position",
  order: "ASC",
  entries: true,
  showSearch: true,
  checkbox: true,
 });

 const columns = [
  {
   value: "title",
   label: "Title",
   options: {
    filter: false,
    sort: false,
   },
  },
  {
   value: "table_prefix",
   label: "DB Prefix",
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
     return <div>{data[i]?.enable === 1 ? "Online" : "Offline"}</div>;
    },
   },
  },
  {
   value: "createdAt",
   label: "Date",
   options: {
    filter: false,
    sort: false,
    customBodyRender: (data, i) => {
     return <div>{moment(data[i]?.createdAt).format("DD-MM-YYYY  hh:mm A")}</div>;
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
      <div className="action-icons" key={i}>
       {i !== 0 ? (
        <span style={{ color: "#93a2dd", cursor: "pointer" }} onClick={() => moveItemUp(data[i]._id, i)}>
         <i className="fa fa-arrow-up"></i>
        </span>
       ) : (
        <span className="ms-3"></span>
       )}
       {i !== data.length - 1 ? (
        <span style={{ color: "#93a2dd", cursor: "pointer" }} onClick={() => moveItemDown(data[i]._id)}>
         <i className="fa fa-arrow-down"></i>
        </span>
       ) : (
        <span className="p-2"></span>
       )}
       <div className="cust-drop-down-menu">
        <Dropdown drop="left">
         <Dropdown.Toggle className="cust-drop-btn" id="dropdown">
          <span style={{ color: "#93a2dd" }}>
           <i className="fa fa-cog"></i>
          </span>
         </Dropdown.Toggle>
         <Dropdown.Menu>
          <ul>
           <li>
            <Dropdown.Item
             onClick={() => {
              setTitle(data[i]?.title);
              setId(data[i]?._id);
              setShow(true);
              setUpdate(true);
             }}
            >
             <i className="fa fa-edit pe-2"></i>
             Edit Details
            </Dropdown.Item>
           </li>
           <li>
            <Dropdown.Item onClick={() => moveFirst(data[i]._id)}>
             <i className="fa fa-angle-double-up pe-2"></i>
             Move First
            </Dropdown.Item>
           </li>
           <li>
            <Dropdown.Item onClick={() => moveLast(data[i]._id)}>
             <i className="fa fa-angle-double-down pe-2"></i>
             Move Last
            </Dropdown.Item>
           </li>
          </ul>
         </Dropdown.Menu>
        </Dropdown>
       </div>
       <div className="form-check form-switch" key={data[i]?._id}>
        <input className="form-check-input" type="checkbox" id="offer-status" defaultChecked={data[i]?.enable === 1 ? true : false} onChange={(e) => updateApp({ _id: data[i]._id, enable: e.target.checked ? 1 : 0 })} />
       </div>
       <span
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => {
         setId(data[i]?._id);
         setDeleteConfirm(true);
         arr = [];
        }}
       >
        <i className="fa fa-trash"></i>
       </span>
      </div>
     );
    },
   },
  },
 ];

 useEffect(() => getAllApp(), []);

 const getAllApp = (status, search) => {
  let data = status || status === 0 ? { enable: status, ...option } : { ...option, search: search };
  new Promise((resolve) => resolve(PostApi(API_PATH.getAllApp, data)))
   .then((res) => {
    setLoader(true);
    if (res.status === 200) {
     setLoader(false);
     const { allApp = [], activeApp = [], totalRecord } = res.data.data;
     setData(allApp?.sort((a, b) => a?.position - b?.position));
     setActiveApp(activeApp?.sort((a, b) => a?.position - b?.position));
     set_option({ ...option, totalRecord: totalRecord });
    } else {
     setLoader(false);
    }
   })
   .catch((err) => {
    setLoader(false);
    toast.error(err.message);
   });
 };

 const updatePosition = (newItems) => {
  new Promise((resolve) => resolve(PostApi(API_PATH.updatePosition, { newItems }))).then((res) => {
   if (res.status === 200) {
    setShow(false);
    toast.success(res.data.message);
    getAllApp();
   }
  });
 };

 const submitFormData = (formData, resetForm) => {
  new Promise((resolve) => resolve(PostApi(API_PATH.addApp, formData))).then((res) => {
   if (res.status === 200) {
    toast.success(res.data.message);
    resetForm(formData);
    getAllApp();
    setShow(false);
   }
  });
 };

 const deleteItem = () => {
  new Promise((resolve) => resolve(PostApi(API_PATH.deleteApp, { _id: id, delArr: arr }))).then((res) => {
   if (res.status === 200) {
    toast.success(res.data.message);
    getAllApp();
    setDeleteConfirm(false);
    arr = [];
   }
  });
 };

 const updateApp = (formData, resetForm) => {
  new Promise((resolve) => resolve(PostApi(API_PATH.updateApp, formData))).then((res) => {
   if (res.status === 200) {
    setShow(false);
    getAllApp();
    resetForm && resetForm(formData);
    toast.success(res.data.message);
   }
  });
 };

 const moveFirst = (itemId) => {
  const index = data.findIndex((item) => item._id === itemId);
  if (index > 0) {
   const newItem = [...data];
   newItem[index].position = newItem[0].position;
   const item = newItem.splice(index, 1)[0];
   newItem.unshift(item);
   newItem.forEach((item, i) => {
    if (item._id !== itemId && i <= index) {
     item.position = item.position + 1;
    }
   });
   newItem.sort((a, b) => a.position - b.position);
   setData(newItem);
   updatePosition(newItem);
  }
 };

 const moveLast = (itemId) => {
  const index = data.findIndex((item) => item._id === itemId);
  if (index < data?.length - 1) {
   const newItem = [...data];
   newItem[index].position = newItem[newItem?.length - 1]?.position;
   const item = newItem.splice(index, 1)[0];
   let updatedItems = [...newItem, item];
   setData([...newItem, item]);
   updatedItems.forEach((item, i) => {
    if (item._id !== itemId && i >= index) {
     item.position = item.position - 1;
    }
   });
   updatedItems.sort((a, b) => a.position - b.position);
   setData(updatedItems);
   updatePosition(updatedItems);
  }
 };

 const moveItemUp = (itemId) => {
  const itemIndex = data.findIndex((item) => item._id === itemId);
  if (itemIndex > 0) {
   const updatedItems = [...data];
   updatedItems[itemIndex].position--;
   updatedItems[itemIndex - 1].position++;
   updatedItems.splice(itemIndex - 1, 0, updatedItems.splice(itemIndex, 1)[0]);
   setData(updatedItems);
   updatePosition(updatedItems);
  }
 };

 const moveItemDown = (itemId) => {
  const itemIndex = data.findIndex((item) => item._id === itemId);
  if (itemIndex < data.length - 1) {
   const updatedItems = [...data];
   updatedItems[itemIndex].position++;
   updatedItems[itemIndex + 1].position--;
   updatedItems.splice(itemIndex + 1, 0, updatedItems.splice(itemIndex, 1)[0]);
   setData(updatedItems);
   updatePosition(updatedItems);
  }
 };

 const handleSelect = (status) => {
  setSelectedItem(status);
  let enable = status === "Offline" ? 0 : status === "Online" && 1;
  getAllApp(enable);
 };

 const tableCallBack = (option) => {
  set_option(option);
  getAllApp("", option.search);
 };

 const appModalClose = () => {
  setShow(false);
  setTitle(false);
  setUpdate(false);
 };

 const checkboxCallback = (data) => {
  arr = data?.filter((item) => item?.checked)?.map((item) => item?._id);
 };

 const deleteMultiItem = () => {
  arr.length > 0 && setDeleteConfirm(true);
  setData(data?.map((item) => (arr.includes(item._id) ? { ...item, checked: true } : { ...item, checked: false })));
 };

 return (
  <>
   <MainLayout>
    <div className="content-main-section">
     <div className="container-fluid">
      <div className="row">
       <div className="col-12">
        <div className="comn-inr-title d-flex align-items-center">
         <h1>Manage Admin</h1>
        </div>
       </div>
      </div>
      <div className="row">
       <div className="col-12 d-flex p-2">
        <StatusFilter selectedItem={selectedItem} handleSelect={handleSelect} />
        <div className="ms-auto">
         <button className="add-button me-2" onClick={() => setShow(true)}>
          <i className="fa fa-plus pe-1"></i>Add New
         </button>
         <button className="del-button" onClick={() => deleteMultiItem()}>
          <i className="fa fa-trash pe-1"></i>Delete Items
         </button>
        </div>
       </div>
      </div>
      {loader ? (
       <div className="preloader">
        <div className="status">
         <Loader />
        </div>
       </div>
      ) : (
       <div className="col-12">
        <div className="table-custom-info">
         <RtdDatatable data={data} columns={columns} option={option} tableCallBack={tableCallBack} checkboxCallback={checkboxCallback} />
        </div>
       </div>
      )}
     </div>
    </div>

    <Modal show={show} onHide={() => appModalClose()} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <AppModal update={update} title={title} id={id} updateApp={updateApp} submitFormData={submitFormData} appModalClose={appModalClose} />
    </Modal>

    <Modal show={deleteConfirm} onHide={() => setDeleteConfirm(false)} size="sm" className="cust-comn-modal p-5" centered>
     <DeleteConfirmModal setDelete={setDeleteConfirm} setConfirmDel={deleteItem} delChecked={arr} />
    </Modal>
   </MainLayout>
  </>
 );
};

export default ManageAdmin;
