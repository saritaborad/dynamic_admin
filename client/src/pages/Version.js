import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Dropdown, Modal } from "react-bootstrap";
import { PostApi } from "../Api/apiServices";
import { API_PATH } from "../const";
import RtdDatatable from "./Common/DataTable/DataTable";
import { ReactComponent as Loader } from "../Images/loader.svg";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AdTitleModal, AdTypeModal, ModeModal, NoteModal, VersionModal } from "../Modals/VersionModal";
import { DeleteConfirmModal } from "../Modals/DeleteConfirmModal";

const Version = () => {
 const [versionData, setVersionData] = useState([]);
 const [adTitleData, setAdTitleData] = useState([]);
 const [adModeData, setAdModeData] = useState([]);
 const [uniqueVersion, setUniqueVersion] = useState([]);
 const [uniqueAdMode, setUniqueAdMode] = useState([]);
 const [uniqueTitle, setUniqueTitle] = useState([]);
 const [tableData, setTableData] = useState([]);
 const [verFilter, setVerFilter] = useState([]);
 const [titleFilter, setTitleFilter] = useState([]);
 const [modeFilter, setModeFilter] = useState([]);
 const [version, setVersion] = useState("");
 const [adTitle, setAdTitle] = useState("");
 const [adMode, setAdMode] = useState("");
 const [latestVersion, setLatestVersion] = useState("");
 const [verToggle, setVerToggle] = useState(false);
 const [titleToggle, setTitleToggle] = useState(false);
 const [modeToggle, setModeToggle] = useState(false);
 const [isUpdate, setIsUpdate] = useState(false);
 const [versShow, setVersShow] = useState(false);
 const [adShow, setAdShow] = useState(false);
 const [adTitleShow, setAdTitleShow] = useState(false);
 const [modeShow, setModeShow] = useState(false);
 const [noteShow, setNoteShow] = useState(false);
 const [deleteConfirm, setDeleteConfirm] = useState(false);
 const [refresh, setRefresh] = useState(false);
 const [active, setActive] = useState(1);
 const [loader, setLoader] = useState(false);
 const [allChecked, setAllChecked] = useState(false);

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
   value: "No",
   label: "No",
   options: {
    filter: false,
    sort: false,
    customBodyRender: (data, i) => {
     return <span>{i + 1}</span>;
    },
   },
  },
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
   value: "users",
   label: "Version vise user",
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
       <span
        style={{ color: "red", cursor: "pointer", fontSize: "20px" }}
        onClick={() => {
         setVersion(data[i]);
         setDeleteConfirm(true);
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
   value: "visibility",
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
       <div>
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
       </div>
       <div className="form-check form-switch pb-1">
        <input
         className="form-check-input"
         type="checkbox"
         id="offer-status"
         defaultChecked={data[i]?.enable === 1 ? true : false}
         onChange={(e) => {
          updateStatus(false, { _id: data[i]?._id, status: true, enable: e.target.checked ? 1 : 0, version_Id: data[i]?.version_Id, table_prefix: table_prefix }, 2);
         }}
        />
       </div>
       <div>
        <span
         style={{ color: "red", cursor: "pointer", fontSize: "20px" }}
         onClick={() => {
          setAdTitle(data[i]);
          setDeleteConfirm(true);
         }}
        >
         <i className="fa fa-trash"></i>
        </span>
       </div>
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
     return <span className={data[i]?.enable === 1 ? "online" : data[i]?.enable === 2 ? "block" : "offline"}>{data[i]?.enable === 1 ? "Online" : data[i]?.enable === 2 ? "Block" : "Offline"}</span>;
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
      <div className="action-icons" key={data[i]?._id}>
       <div>
        {i !== 0 ? (
         <span style={{ color: "#93a2dd", cursor: "pointer", fontSize: "18px" }} onClick={() => moveItemUp(data[i]._id, i)}>
          <i className="fa fa-arrow-up"></i>
         </span>
        ) : (
         <span className="ms-3"></span>
        )}
       </div>
       <div>
        {i !== data?.length - 1 ? (
         <span style={{ color: "#93a2dd", cursor: "pointer", fontSize: "18px" }} onClick={() => moveItemDown(data[i]._id, i)}>
          <i className="fa fa-arrow-down"></i>
         </span>
        ) : (
         <span className="p-2"></span>
        )}
       </div>
       <div>
        <span
         style={{ color: "#93a2dd", cursor: "pointer", fontSize: "18px" }}
         className="pe-2"
         onClick={() => {
          setIsUpdate(true);
          setAdMode(data[i]);
          setModeShow(true);
         }}
        >
         <i className="fa fa-edit"></i>
        </span>
       </div>
       <div>
        {data[i]?.ad_keyword !== "CUSTOM" && data[i]?.ad_keyword !== "ALTERNATIVE" ? (
         <span
          style={{ color: "red", cursor: "pointer", fontSize: "18px" }}
          onClick={() => {
           setAdMode(data[i]);
           setDeleteConfirm(true);
          }}
         >
          <i className="fa fa-trash"></i>
         </span>
        ) : (
         <span className="ps-1 ms-2"></span>
        )}
       </div>

       <div className="form-check form-switch">
        <input
         className="form-check-input"
         type="checkbox"
         id={`mode${i}`}
         defaultChecked={data[i]?.enable === 1 ? true : false}
         onChange={(e) => {
          onlinePosition(data[i], i, e.target.checked ? 1 : 0, data[i]?.ad_keyword, `mode${i}`);
         }}
        />
       </div>

       <div className="custom-switch-toggle-menu mt-1">
        <label className="switch" htmlFor={`block${i}`}>
         <input
          type="checkbox"
          name="status"
          id={`block${i}`}
          defaultChecked={data[i]?.enable === 2 ? true : false}
          onChange={(e) => {
           blockPosition(data[i], i, e.target.checked ? 2 : 3, data[i]?.enable, `block${i}`);
          }}
         />
         <span className="slider round"></span>
        </label>
       </div>
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
  let data = { table_prefix: table_prefix, ...option, search: search, verFilter };
  new Promise((resolve) => resolve(PostApi(API_PATH.getAllVersion, data)))
   .then((res) => {
    setLoader(true);
    if (res.status === 200) {
     setLoader(false);
     const maxObject = res.data.data?.allVersion?.length > 0 ? res.data.data?.allVersion?.reduce((a, b) => (a?.code > b?.code ? a : b)) : null;
     setLatestVersion(maxObject);
     set_option({ ...option, totalRecord: res.data.data?.totalRecord });
     setVersionData(res.data.data?.allVersion);
     let uniqueArr = res.data.data?.allVersion?.map((item) => (res.data.data?.verFilter?.includes(item._id) ? { ...item, checked: true } : item));
     setUniqueVersion(uniqueArr?.sort((a, b) => b.code - a.code) || []);
     setVerFilter(res.data.data?.verFilter);
     setRefresh(true);
     setTableData(res.data.data?.version?.sort((a, b) => b.code - a.code));
     setActive(1);
    } else {
     setLoader(false);
     setTableData([]);
    }
   })
   .catch((err) => {
    toast.error(err.message);
    setLoader(false);
   });
 };

 const getAllAdTitle = () => {
  let data = { table_prefix: table_prefix, titleFilter };
  new Promise((resolve) => resolve(PostApi(API_PATH.getAllAdTitle, data)))
   .then((res) => {
    setLoader(true);
    if (res.status === 200) {
     setLoader(false);
     set_option({ ...option, totalRecord: res.data.data?.totalRecord });
     setAdTitleData(res.data.data?.adTitle);
     let uniqueTitle = res.data.data?.adTitleList.length > 0 && res.data.data?.adTitleList?.map((item) => (res.data.data?.titleFilter?.includes(item?.adm_name) ? { ...item, checked: true } : item));
     setUniqueTitle(uniqueTitle);
     setTitleFilter(res.data.data?.titleFilter);
     setRefresh(true);
     setTableData(res.data.data?.adTitle?.sort((a, b) => b.code - a.code));
     setActive(2);
    } else {
     setLoader(false);
     setTableData([]);
    }
   })
   .catch((err) => {
    toast.error(err.message);
    setLoader(false);
   });
 };

 const getAllAdMode = () => {
  let data = { table_prefix: table_prefix, titleFilter };
  new Promise((resolve) => resolve(PostApi(API_PATH.getAllAdMode, data)))
   .then((res) => {
    setLoader(true);
    if (res.status === 200) {
     setLoader(false);

     set_option({ ...option, totalRecord: res.data.data?.totalRecord });
     setAdModeData(res.data.data?.adMode?.sort((a, b) => a.position - b.position));
     let uniqueMode =
      res.data.data?.adModeList.length > 0 &&
      res.data.data?.adModeList?.map((item) => {
       if (res.data.data?.modeFilter?.length > 0 && Array.isArray(res.data.data?.modeFilter) && res.data.data?.modeFilter.includes(item?.ad_keyword)) {
        return { ...item, checked: true };
       } else {
        return item;
       }
      });
     setUniqueAdMode(uniqueMode);
     setModeFilter(res.data.data?.modeFilter);
     setRefresh(true);
     setTableData(res.data.data?.adMode?.sort((a, b) => a.position - b.position));
     setActive(3);
    } else {
     setLoader(false);
     setTableData([]);
    }
   })
   .catch((err) => {
    toast.error(err.message);
    setLoader(false);
   });
 };

 const updateStatus = (positionChange, data, activeType, newItems = [], block, id) => {
  if (block && block === 1) {
   setTimeout(() => {
    document.getElementById(id).checked = false;
   }, 100);
   return;
  }

  let path = activeType === 2 ? API_PATH.editTitle : activeType === 3 && API_PATH.editMode;
  new Promise((resolve) => resolve(PostApi(path, { ...data, newItems: newItems, positionChange }))).then((res) => {
   if (res.status === 200) {
    // toast.success(res.data.message);
    (data?.status === 1 || data?.status === 2) && positionChange ? changeTable(activeType, true) : changeTable(activeType, false);
   }
  });
 };

 const onlinePosition = (data, index, status, visibility, docId) => {
  let updatedItems = status === 1 ? adModeData?.map((obj) => JSON.parse(JSON.stringify(obj))) : [];
  let currentItem = updatedItems[index];
  if (status === 1 && currentItem) {
   if (index === 0) {
    updatedItems.forEach((item) => {
     if (item.version === data?.version && item.adm_name === data?.adm_name && item._id !== data?._id) {
      item.enable === 2 ? (item.enable = 2) : (item.enable = 0);
     }
    });
    updateStatus(true, { _id: data._id, status: status, version_Id: data?.version_Id, visibility: visibility, table_prefix: table_prefix }, 3, updatedItems);
    return;
   }
   const moveIndex = updatedItems.findIndex((item) => item.version === currentItem?.version && item.adm_name === currentItem?.adm_name && item._id !== data?._id);
   let positionToMove = updatedItems[moveIndex]?.position;
   currentItem.position = positionToMove;
   updatedItems.splice(index, 1);
   updatedItems.splice(moveIndex, 0, currentItem);
   for (let i = moveIndex + 1; i <= index; i++) {
    updatedItems[i].position = updatedItems[i].position + 1;
   }
   updatedItems.forEach((item) => {
    if (item.version === data?.version && item.adm_name === data?.adm_name && item._id !== data?._id) {
     item.enable === 2 ? (item.enable = 2) : (item.enable = 0);
    }
   });
  }
  if (status === 0) {
   let filterArr = updatedItems.filter((item) => item.version === data?.version && item.adm_name === data?.adm_name && item.enable === 1);
   if (filterArr.length === 0) {
    setTimeout(() => {
     if (document.getElementById(docId)) document.getElementById(docId).checked = true;
    }, 100);
    return;
   }
  }

  updateStatus(true, { _id: data._id, status: status, version_Id: data?.version_Id, visibility: visibility, table_prefix: table_prefix }, 3, updatedItems);
 };

 const blockPosition = (data, index, status, block, id) => {
  const updatedItems = status === 2 ? adModeData?.map((obj) => JSON.parse(JSON.stringify(obj))) : [];

  const currentItem = updatedItems[index];
  if (status === 2 && currentItem) {
   if (index === adModeData?.length - 1) {
    updateStatus(false, { _id: data._id, status: status, version_Id: data?.version_Id, table_prefix: table_prefix }, 3, updatedItems);
    return;
   }

    
    
   const filtered = updatedItems.filter((item, i) => item.version === data?.version && item.adm_name === data?.adm_name);
   const lastIdx = updatedItems.length - 1 - filtered.reverse().findIndex((item) => item.version === data?.version && item.adm_name === data?.adm_name);

   const positionToMove = updatedItems[lastIdx]?.position;
   currentItem.position = positionToMove;
   updatedItems.splice(index, 1);
   updatedItems.splice(lastIdx, 0, currentItem);

   for (let i = lastIdx + 1; i <= updatedItems.length - 1; i++) {
    updatedItems[i].position = updatedItems[i].position + 1;
   }
   for (let i = lastIdx - 1; i >= index; i--) {
    updatedItems[i].position = updatedItems[i].position - 1;
   }
  }

  updateStatus(true, { _id: data._id, status: status, version_Id: data?.version_Id, table_prefix: table_prefix }, 3, updatedItems, block, id);
 };

 const moveItemUp = (itemId, index) => {
  let updatedItems = adModeData?.map((obj) => JSON.parse(JSON.stringify(obj)));

  if (index > 0 && updatedItems[index]) {
   updatedItems[index].position--;
   updatedItems[index - 1].position++;
   updatedItems.splice(index - 1, 0, updatedItems.splice(index, 1)[0]);
   updatePosition(updatedItems);
  }
 };

 const moveItemDown = (itemId, index) => {
  let updatedItems = adModeData?.map((obj) => JSON.parse(JSON.stringify(obj)));

  if (index < adModeData.length - 1 && updatedItems[index]) {
   updatedItems[index].position++;
   updatedItems[index + 1].position--;
   updatedItems.splice(index + 1, 0, updatedItems.splice(index, 1)[0]);
   updatePosition(updatedItems);
  }
 };

 const delVersion = () => {
  let data = { table_prefix: table_prefix, _id: version?._id };
  new Promise((resolve, reject) => resolve(PostApi(API_PATH.delVersion, data))).then((res) => {
   if (res.status === 200) {
    toast.success(res.data.message);
    setVersion([]);
    setDeleteConfirm(false);
    getAllVersion();
   }
  });
 };

 const delTitle = () => {
  let isFilter;
  let filteredArr = adTitleData.filter((obj) => obj?.adm_name === adTitle?.adm_name);
  filteredArr.length > 1 ? (isFilter = true) : (isFilter = false);
  let data = { table_prefix: table_prefix, _id: adTitle?._id, version_Id: adTitle?.version_Id, adm_name: adTitle?.adm_name, isFilter };

  new Promise((resolve, reject) => resolve(PostApi(API_PATH.delTitle, data))).then((res) => {
   if (res.status === 200) {
    toast.success(res.data.message);
    setAdTitle([]);
    setDeleteConfirm(false);
    getAllAdTitle();
   }
  });
 };

 const delMode = () => {
  let isModeFilter;
  let modefilterArr = adModeData.filter((obj) => obj?.ad_keyword === adMode?.ad_keyword);
  modefilterArr.length > 1 ? (isModeFilter = true) : (isModeFilter = false);
  let data = { table_prefix: table_prefix, _id: adMode?._id, version_Id: adMode?.version_Id, ad_keyword: adMode?.ad_keyword, isModeFilter };
  new Promise((resolve, reject) => resolve(PostApi(API_PATH.delMode, data))).then((res) => {
   if (res.status === 200) {
    toast.success(res.data.message);
    setAdMode([]);
    setDeleteConfirm(false);
    getAllAdMode();
   }
  });
 };

 const updatePosition = (newItems) => {
  setRefresh(false);
  new Promise((resolve) => resolve(PostApi(API_PATH.modePosition, { newItems, table_prefix }))).then((res) => {
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
  if (versionData?.length === 0 || adTitleData?.length === 0 || (!isUpdate && titleFilter?.length === 0)) {
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

 const changeTable = (type, isRefresh = false) => {
  isRefresh && setRefresh(false);
  setActive(type);
  type === 1 ? getAllVersion() : type === 2 ? getAllAdTitle() : type === 3 && getAllAdMode();
 };

 const versionFilter = (isChecked, itemId) => {
  // if (isChecked) {
  //  setVerFilter((prev) => (prev ? [...prev, itemId] : [itemId]));
  // } else {
  //  setVerFilter((prev) => prev?.filter((item1) => itemId !== item1));
  // }
  const newVersion = uniqueVersion.map((item) => (item._id === itemId ? { ...item, checked: isChecked } : item));
  setUniqueVersion(newVersion);
  const allChecked = newVersion.every((item) => item.checked);
  setAllChecked(allChecked);
  setVerFilter(newVersion?.filter((item) => item?.checked)?.map((item1) => item1?._id));
 };

 const handleAdFilter = (isChecked, adm_name) => {
  // if (e.target.checked) {
  //  setTitleFilter((prev) => (prev ? [...prev, item] : [item]));
  // } else {
  //  setTitleFilter((prev) => prev?.filter((item1) => item !== item1));
  //  }
  const newAd = uniqueTitle.map((item) => (item.adm_name === adm_name ? { ...item, checked: isChecked } : item));
  setUniqueTitle(newAd);
  const allChecked = newAd.every((item) => item.checked);
  setAllChecked(allChecked);
  setTitleFilter(newAd?.filter((item) => item?.checked)?.map((item1) => item1?.adm_name));
 };

 const handleModeFilter = (isChecked, ad_keyword) => {
  // if (e.target.checked) {
  //  setModeFilter((prev) => (prev ? [...prev, item] : [item]));
  // } else {
  //  setModeFilter((prev) => prev?.filter((item1) => item !== item1));
  //  }

  const newMode = uniqueAdMode.map((item) => (item.ad_keyword === ad_keyword ? { ...item, checked: isChecked } : item));
  setUniqueAdMode(newMode);
  const allChecked = newMode.every((item) => item.checked);
  setAllChecked(allChecked);
  setModeFilter(newMode?.filter((item) => item?.checked)?.map((item1) => item1?.ad_keyword));
 };

 const addFilter = (filterData, filType, action) => {
  let data = filType === 1 ? { verFilter: filterData, filType, action } : filType === 2 ? { titleFilter: filterData, filType, action } : filType === 3 && { modeFilter: filterData, filType, action };
  new Promise((resolve) => resolve(PostApi(API_PATH.addFilter, data))).then((res) => {
   filType === 1 ? setVerToggle(!verToggle) : filType === 2 ? setTitleToggle(!titleToggle) : filType === 3 && setModeToggle(!modeToggle);
   filType === 1 ? getAllVersion() : filType === 2 ? getAllAdTitle() : filType === 3 && getAllAdMode();
  });
 };

 const handleAllCheck = (isChecked, type) => {
  setAllChecked(isChecked);
  let newVersion = type === 1 ? uniqueVersion.map((item) => ({ ...item, checked: isChecked })) : type === 2 ? uniqueTitle?.length > 0 && uniqueTitle.map((item) => ({ ...item, checked: isChecked })) : type === 3 && uniqueAdMode?.length > 0 && uniqueAdMode?.map((item) => ({ ...item, checked: isChecked }));

  type === 1 ? setUniqueVersion(newVersion?.sort((a, b) => b?.code - a?.code)) : type === 2 ? setUniqueTitle(newVersion) : type === 3 && setUniqueAdMode(newVersion);

  type === 1 ? setVerFilter(isChecked ? newVersion?.map((item) => item?._id) : []) : type === 2 ? setTitleFilter(isChecked ? newVersion?.map((item) => item?.adm_name) : []) : type === 3 && setModeFilter(isChecked ? newVersion?.map((item) => item?.ad_keyword) : []);
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
          <Dropdown drop="left-start" show={verToggle} onToggle={() => setVerToggle(!verToggle)}>
           <Dropdown.Toggle className="mytoggle" id="dropdown1">
            <span>Version</span>
           </Dropdown.Toggle>
           <Dropdown.Menu className="mymenu">
            <ul style={{ maxHeight: "230px", overflowY: "scroll" }}>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input type="checkbox" id="version0" name="version0" className="ms-2 me-2" onClick={stopPropagation} onChange={(e) => handleAllCheck(e.target.checked, 1)} checked={allChecked} />
               <label htmlFor="version0" onClick={stopPropagation}>
                All
               </label>
              </Dropdown.Item>
             </li>
             {uniqueVersion &&
              uniqueVersion?.length > 0 &&
              uniqueVersion?.map((item, i) => {
               return (
                <li key={i}>
                 <Dropdown.Item onClick={stopPropagation}>
                  <input type="checkbox" id={`v${item._id}`} name={`v${item._id}`} className="ms-2 me-2" onClick={stopPropagation} onChange={(e) => versionFilter(e.target.checked, item?._id)} checked={item.checked} />
                  <label htmlFor={`v${item._id}`} onClick={stopPropagation}>
                   {item?.code}
                  </label>
                 </Dropdown.Item>
                </li>
               );
              })}
            </ul>
            <div className="row dropdown-footer">
             <div className="col-12 d-flex">
              <div className="col-4  ms-2">
               <button className="d-flex dropdown-button align-items-center" onClick={() => setVersShow(true)}>
                <i className="fa fa-plus pe-2"></i>
                Add
               </button>
              </div>
              <div className="col-8 text-end ">
               <button className="dropdown-button2 mx-2" onClick={() => addFilter(verFilter, 1, 2)}>
                Reset
               </button>
               <button className="dropdown-button" onClick={() => addFilter(verFilter, 1, 1)}>
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
          <Dropdown drop="left-start" show={titleToggle} onToggle={() => setTitleToggle(!titleToggle)}>
           <Dropdown.Toggle className="mytoggle" id="dropdown2">
            <span>Ad Title</span>
           </Dropdown.Toggle>
           <Dropdown.Menu className="mymenu">
            <ul style={{ maxHeight: "230px", overflowY: "scroll" }}>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input
                type="checkbox"
                id="adtitle0"
                name="adtitle0"
                className="m-2"
                onClick={stopPropagation}
                onChange={(e) => {
                 handleAllCheck(e.target.checked, 2);
                }}
               />
               <label htmlFor="adtitle0" onClick={stopPropagation}>
                All
               </label>
              </Dropdown.Item>
             </li>
             {uniqueTitle?.length > 0 &&
              uniqueTitle?.map((item, i) => {
               return (
                <li key={i}>
                 <Dropdown.Item onClick={stopPropagation}>
                  <input
                   type="checkbox"
                   id={`adtitle${i + 1}`}
                   name={`adtitle${i + 1}`}
                   className="m-2"
                   onClick={stopPropagation}
                   onChange={(e) => {
                    handleAdFilter(e.target.checked, item?.adm_name);
                   }}
                   checked={item?.checked}
                  />
                  <label htmlFor={`adtitle${i + 1}`} onClick={stopPropagation}>
                   {item?.adm_name}
                  </label>
                 </Dropdown.Item>
                </li>
               );
              })}
            </ul>
            <div className="row dropdown-footer">
             <div className="col-12 d-flex">
              <div className="col-4 ms-2">
               <button className="d-flex dropdown-button align-items-center" onClick={() => setAdTitleShow(true)}>
                <i className="fa fa-plus pe-2"></i>
                Add
               </button>
              </div>
              <div className="col-8 text-end ">
               <button className="dropdown-button2 mx-2" onClick={() => addFilter(titleFilter, 2, 2)}>
                Reset
               </button>
               <button className="dropdown-button" onClick={() => addFilter(titleFilter, 2, 1)}>
                Submit
               </button>
              </div>
             </div>
            </div>
           </Dropdown.Menu>
          </Dropdown>
         </div>
         <div className="version-btn cust-drop-down mytoggle">
          <Dropdown drop="left-start" show={modeToggle} onToggle={() => setModeToggle(!modeToggle)}>
           <Dropdown.Toggle className="mytoggle" id="dropdown3">
            <span>Mode</span>
           </Dropdown.Toggle>
           <Dropdown.Menu className="mymenu">
            <ul style={{ maxHeight: "230px", overflowY: "scroll" }}>
             <li>
              <Dropdown.Item onClick={stopPropagation}>
               <input type="checkbox" id="admode0" name="admode0" className="m-2" onClick={stopPropagation} onChange={(e) => handleAllCheck(e.target.checked, 3)} />
               <label htmlFor="admode0" onClick={stopPropagation}>
                All
               </label>
              </Dropdown.Item>
             </li>
             {uniqueAdMode?.length > 0 &&
              uniqueAdMode?.map((item, i) => {
               return (
                <li key={i}>
                 <Dropdown.Item onClick={stopPropagation}>
                  <input type="checkbox" id={`admode${i + 1}`} name={`admode${i + 1}`} className="m-2" onClick={stopPropagation} onChange={(e) => handleModeFilter(e.target.checked, item?.ad_keyword)} checked={item?.checked} />
                  <label htmlFor={`admode${i + 1}`} onClick={stopPropagation}>
                   {item?.ad_keyword}
                  </label>
                 </Dropdown.Item>
                </li>
               );
              })}
            </ul>
            <div className="row dropdown-footer">
             <div className="col-12 d-flex">
              <div className="col-4  ms-2">
               <button className="d-flex dropdown-button align-items-center " onClick={() => setModeShow(true)}>
                <i className="fa fa-plus pe-2"></i>
                Add
               </button>
              </div>
              <div className="col-8 text-end ">
               <button className="dropdown-button2 mx-2" onClick={() => addFilter(modeFilter, 3, 2)}>
                Reset
               </button>
               <button className="dropdown-button" onClick={() => addFilter(modeFilter, 3, 1)}>
                Submit
               </button>
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
      {refresh && active === 1 && (
       <>
        {loader ? (
         <div className="preloader">
          <div className="status">
           <Loader />
          </div>
         </div>
        ) : (
         <div className="col-12 mt-3">
          <div className="table-custom-info">
           <RtdDatatable data={tableData} columns={columns1} option={option} tableCallBack={tableCallBack} />
          </div>
         </div>
        )}
       </>
      )}
      {refresh && active === 2 && (
       <>
        {loader ? (
         <div className="preloader">
          <div className="status">
           <Loader />
          </div>
         </div>
        ) : (
         <div className="col-12 mt-3">
          <div className="table-custom-info">
           <RtdDatatable data={tableData} columns={columns2} option={option} tableCallBack={tableCallBack} />
          </div>
         </div>
        )}
       </>
      )}
      {refresh && active === 3 && (
       <>
        {loader ? (
         <div className="preloader">
          <div className="status">
           <Loader />
          </div>
         </div>
        ) : (
         <div className="col-12 mt-3">
          <div className="table-custom-info">
           <RtdDatatable data={tableData} columns={columns3} option={option} tableCallBack={tableCallBack} />
          </div>
         </div>
        )}
       </>
      )}
     </div>
    </div>

    <Modal show={versShow} onHide={() => setVersShow(false)} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <VersionModal isUpdate={isUpdate} version={version} adTitle={uniqueTitle} adMode={uniqueAdMode} table_prefix={table_prefix} submitFormData={submitFormData} setVersShow={setVersShow} />
    </Modal>

    <Modal show={adTitleShow} onHide={() => setAdTitleShow(false)} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <AdTitleModal isUpdate={isUpdate} adTitle={adTitle} latestVersion={latestVersion} setAdTitleShow={setAdTitleShow} submitAdTitle={submitAdTitle} allversion={versionData} table_prefix={table_prefix} />
    </Modal>

    <Modal show={modeShow} onHide={() => setModeShow(false)} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <ModeModal isUpdate={isUpdate} adMode={adMode} latestVersion={latestVersion} allversion={versionData} setModeShow={setModeShow} submitAdMode={submitAdMode} table_prefix={table_prefix} titleFilter={titleFilter} />
    </Modal>

    <Modal show={noteShow} onHide={() => setNoteShow(false)} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <NoteModal version={version} setNoteShow={setNoteShow} submitFormData={submitFormData} />
    </Modal>

    <Modal show={adShow} onHide={() => setAdShow(false)} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <AdTypeModal setAdShow={setAdShow} />
    </Modal>

    <Modal show={deleteConfirm} onHide={() => setDeleteConfirm(false)} size="sm" className="cust-comn-modal p-5" centered>
     <DeleteConfirmModal setDelete={setDeleteConfirm} setConfirmDel={active === 1 ? delVersion : active === 2 ? delTitle : active === 3 && delMode} />
    </Modal>
   </MainLayout>
  </>
 );
};

export default Version;
