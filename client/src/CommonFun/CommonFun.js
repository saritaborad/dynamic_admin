import { updatePosition } from "../CommonApi/Api";

export const errorContainer = (form, field) => {
 return form.touched[field] && form.errors[field] ? <span className="error text-danger">{form.errors[field]}</span> : null;
};

export const formAttr = (form, field) => ({
 onBlur: form.handleBlur,
 onChange: form.handleChange,
 value: form.values[field],
});

export const moveItemUp = (itemId, itemindex, data, setData, path, getAPI, table_prefix) => {
 let updatedItems = data?.map((obj) => JSON.parse(JSON.stringify(obj)));
 const itemIndex = data.findIndex((item) => item._id === itemId);

 if (itemindex > 0 && updatedItems[itemindex]) {
  updatedItems[itemindex].position--;
  updatedItems[itemindex - 1].position++;
  updatedItems.splice(itemindex - 1, 0, updatedItems.splice(itemindex, 1)[0]);
  setData(updatedItems);
  updatePosition(updatedItems);
 }
};

export const moveItemDown = (itemId, index, data, setData, path, getAPI, table_prefix) => {
 let updatedItems = data?.map((obj) => JSON.parse(JSON.stringify(obj)));

 if (index < data.length - 1 && updatedItems[index]) {
  updatedItems[index].position++;
  updatedItems[index + 1].position--;
  updatedItems.splice(index + 1, 0, updatedItems.splice(index, 1)[0]);
  setData(updatedItems);
  updatePosition(updatedItems);
 }
};

export const moveFirst = (itemId, index, data, setData, updatePosition) => {
 const itemindex = data.findIndex((item) => item._id === itemId);
 if (itemindex > 0) {
  const newItem = [...data];
  newItem[itemindex].position = newItem[0].position;
  const item = newItem.splice(itemindex, 1)[0];
  newItem.unshift(item);
  newItem.forEach((item, i) => {
   if (item._id !== itemId && i <= itemindex) {
    item.position = item.position + 1;
   }
  });
  newItem.sort((a, b) => a.position - b.position);
  setData(newItem);
  updatePosition(newItem);
 }
};

export const moveLast = (itemId, index, data, setData, updatePosition) => {
 const itemindex = data.findIndex((item) => item._id === itemId);
 if (itemindex < data?.length - 1) {
  const newItem = [...data];
  newItem[itemindex].position = newItem[newItem?.length - 1]?.position;
  const item = newItem.splice(itemindex, 1)[0];
  let updatedItems = [...newItem, item];
  setData([...newItem, item]);
  updatedItems.forEach((item, i) => {
   if (item._id !== itemId && i >= itemindex) {
    item.position = item.position - 1;
   }
  });
  updatedItems.sort((a, b) => a.position - b.position);
  setData(updatedItems);
  updatePosition(updatedItems);
 }
};
