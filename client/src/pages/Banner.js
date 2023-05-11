import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import RtdDatatable from "./Common/DataTable/DataTable";
import { Modal } from "react-bootstrap";
import { ReactComponent as Loader } from "../Images/loader.svg";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import { BannerModal, IconModal } from "../Modals/CustomAdModal";
import { PostApi } from "../Api/apiServices";
import moment from "moment/moment";
import { DeleteConfirmModal } from "../Modals/DeleteConfirmModal";
import { useLocation } from "react-router-dom";

let arr = [];
const Banner = () => {
 let cusAdId = useLocation()?.state?.customAdData;

 const [data, setData] = useState([]);
 const [update, setUpdate] = useState(false);
 const [bannerAd, setBannerAd] = useState("");
 const [iconUrl, setIconUrl] = useState("");
 const [loader, setLoader] = useState(false);
 const [bannerModalData, setBannerModalData] = useState("");
 const [deleteConfirm, setDeleteConfirm] = useState(false);
 const [show, setShow] = useState(false);
 const [iconShow, setIconShow] = useState(false);

 const [option, set_option] = useState({
  sizePerPage: 10,
  totalRecord: 10,
  page: 1,
  sort: "createdAt",
  order: "ASC",
  entries: true,
  showSearch: false,
  checkbox: true,
 });

 const columns = [
  {
   value: "No",
   label: "No",
   options: {
    filter: false,
    sort: false,
    customBodyRender: (data, i) => <div>{i + 1}</div>,
   },
  },
  {
   value: "banner",
   label: "Banner",
   options: {
    filter: false,
    sort: false,
    customBodyRender: (data, i) => {
     return <img src={`/dynamic_admin/images/AD_${data[i]?.banner}`} style={{ height: "100px", maxHeight: "100px" }} alt="" />;
    },
   },
  },
  {
   value: "icon",
   label: "Icon",
   options: {
    filter: false,
    sort: false,
    customBodyRender: (data, i) => {
     return <img src={`/dynamic_admin/images/AD_${data[i]?.icon}`} style={{ height: "70px", maxHeight: "70px", maxWidth: "80px" }} alt="" />;
    },
   },
  },
  {
   value: "design_page",
   label: "Design Page",
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
    customBodyRender: (data, i) => <div>{data[i]?.enable === 1 ? "Online" : "Offline"}</div>,
   },
  },
  {
   value: "date",
   label: "Uploaded",
   options: {
    filter: false,
    sort: true,
    customBodyRender: (data, i) => <div>{moment(data[i]?.date).format("DD/MM/YYYY")}</div>,
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
      <div className="action-icons" key={data[i]?._id}>
       <span
        style={{ color: "#93a2dd", cursor: "pointer", fontSize: "20px" }}
        className=""
        onClick={() => {
         setBannerAd(data[i]);
         setUpdate(true);
         setShow(true);
        }}
       >
        <i className="fa fa-edit "></i>
       </span>

       <div className="form-check form-switch pb-1" key={i}>
        <input className="form-check-input" type="checkbox" id="cad-status" defaultChecked={data[i]?.enable === 1 ? true : false} onChange={(e) => editBanner({ _id: data[i]._id, enable: e.target.checked ? 1 : 0, cusAdId: cusAdId?._id })} />
       </div>

       <span
        style={{ color: "red", cursor: "pointer" }}
        className=""
        onClick={() => {
         setBannerAd(data[i]);
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

 useEffect(() => getAllBanner(), []);

 const getAllBanner = () => {
  setLoader(true);
  let data = { cusAdId: cusAdId?._id, ...option };
  new Promise((resolve) => resolve(PostApi(API_PATH.getAllBanner, data))).then((res) => {
   if (res.status === 200) {
    setLoader(false);
    setData(res.data.data?.bannerAll);
    set_option({ ...option, totalRecord: res.data.data?.totalRecord });
   } else {
    setLoader(false);
   }
  });
 };

 const submitFormData = (formData, resetForm) => {
  new Promise((resolve) => resolve(PostApi(API_PATH.addBanner, formData))).then((res) => {
   if (res.status === 200) {
    toast.success(res.data.message);
    resetForm(formData);
    getAllBanner();
    setShow(false);
    setBannerModalData("");
    setIconUrl("");
   }
  });
 };

 const deleteBanner = () => {
  new Promise((resolve) => resolve(PostApi(API_PATH.delBanner, { _id: bannerAd?._id, cusAdId: cusAdId?._id, delArr: arr }))).then((res) => {
   if (res.status === 200) {
    toast.success(res.data.message);
    setDeleteConfirm(false);
    getAllBanner();
    arr = [];
   }
  });
 };

 const editBanner = (formData, resetForm) => {
  new Promise((resolve) => resolve(PostApi(API_PATH.updateBanner, formData))).then((res) => {
   if (res.status === 200) {
    setShow(false);
    getAllBanner();
    resetForm && resetForm(formData);
    toast.success(res.data.message);
   }
  });
 };

 const tableCallBack = (option) => {
  set_option(option);
  getAllBanner();
 };

 const appModalClose = () => {
  setShow(false);
  setUpdate(false);
  setIconUrl("");
  setBannerModalData("");
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
         <h1 style={{ fontSize: "1.2rem" }}>
          Manage Multiple Banner
          <span className="ps-3" style={{ color: "#5578eb", fontSize: "1.2rem" }}>
           {cusAdId?.add_title}
          </span>
         </h1>
        </div>
       </div>
      </div>
      <div className="row">
       <div className="col-12 d-flex p-2">
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
     <BannerModal update={update} bannerAd={bannerAd} cusAdId={cusAdId} editBanner={editBanner} submitFormData={submitFormData} appModalClose={appModalClose} setShow={setShow} setIconShow={setIconShow} iconUrl={iconUrl} bmodal={bannerModalData} setbModal={setBannerModalData} />
    </Modal>

    <Modal
     show={iconShow}
     size="md"
     className="cust-comn-modal"
     aria-labelledby="contained-modal-title-vcenter"
     centered
     onHide={() => {
      setIconShow(false);
      setShow(true);
     }}
    >
     <IconModal update={update} bannerAd={bannerAd} setShow={setShow} cusAdId={cusAdId} setIconShow={setIconShow} setIconUrl={setIconUrl} />
    </Modal>

    <Modal show={deleteConfirm} onHide={() => setDeleteConfirm(false)} size="sm" className="cust-comn-modal p-5" centered>
     <DeleteConfirmModal setDelete={setDeleteConfirm} setConfirmDel={deleteBanner} delChecked={arr} />
    </Modal>
   </MainLayout>
  </>
 );
};

export default Banner;
