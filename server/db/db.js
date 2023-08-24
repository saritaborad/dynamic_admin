const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const give_response = require("../middleware/help");

// let MONGO_URI = "mongodb://mongo:27017/demo1";
let MONGO_URI = "mongodb://127.0.0.1:27017/demo1";
let DB_NAME = "demo1";
const connectDB = () => {
 mongoose
  .connect(MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   family: 4,
  })
  .then(() => {
   console.log("database connected");
  })
  .catch((err) => {
   console.log(err);
  });
};

const connClientDB = () => {
 const client = new MongoClient(MONGO_URI, {
  family: 4,
 });
 client
  .connect()
  .then(() => {
   //  console.log("clientdb connected");
  })
  .catch((err) => {
   console.log(err);
  });

 const db = client.db(DB_NAME);
 return db;
};

const getCollection = (name) => {
 const DB = connClientDB();
 const Collection = DB.collection(name);
 return Collection;
};

const addCollection = async (res, db, name) => {
 try {
  await db.createCollection(name);
 } catch (error) {
  return give_response(res, 500, false, error.message);
 }
};

const delCollection = async (res, db, name) => {
 try {
  await db.dropCollection(name);
 } catch (error) {
  return give_response(res, 500, false, error.message);
 }
};

const renameCollection = async (res, db, oldName, newName) => {
 try {
  await db.renameCollection(oldName, newName);
 } catch (error) {
  return give_response(res, 500, false, error.message);
 }
};

const DB = connClientDB();
module.exports = {
 connectDB,
 DB,
 addCollection,
 delCollection,
 renameCollection,
 getCollection,
};
