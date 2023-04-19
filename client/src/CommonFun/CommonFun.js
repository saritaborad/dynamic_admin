import { updatePosition } from "../CommonApi/Api";

export const errorContainer = (form, field) => {
 return form.touched[field] && form.errors[field] ? <span className="error text-danger">{form.errors[field]}</span> : null;
};

export const formAttr = (form, field) => ({
 onBlur: form.handleBlur,
 onChange: form.handleChange,
 value: form.values[field],
});

export const moveItemUp = (itemId, Data, setData, path, getAPI, table_prefix) => {
 const itemIndex = Data.findIndex((item) => item._id === itemId);

 if (itemIndex > 0) {
  const updatedItems = [...Data];
  updatedItems[itemIndex].position--;
  updatedItems[itemIndex - 1].position++;
  updatedItems.splice(itemIndex - 1, 0, updatedItems.splice(itemIndex, 1)[0]);
  setData(updatedItems);
  updatePosition(updatedItems, path, getAPI, table_prefix);
 }
};

export const moveItemDown = (itemId, Data, setData, path, getAPI, table_prefix) => {
 const itemIndex = Data.findIndex((item) => item._id === itemId);

 if (itemIndex < Data.length - 1) {
  const updatedItems = [...Data];
  updatedItems[itemIndex].position++;
  updatedItems[itemIndex + 1].position--;
  updatedItems.splice(itemIndex + 1, 0, updatedItems.splice(itemIndex, 1)[0]);
  setData(updatedItems);
  updatePosition(updatedItems, path, getAPI, table_prefix);
 }
};
