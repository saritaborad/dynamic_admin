const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const give_response = require("../middleware/help");
const errorResponse = require("../middleware/errorResponse");

const connectDB = () => {
 mongoose
  .connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
  })
  .then(() => {
   console.log("database connected");
  });
};

const connClientDB = () => {
 const client = new MongoClient(process.env.MONGO_URI);
 client.connect();
 const db = client.db("demo1");
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
