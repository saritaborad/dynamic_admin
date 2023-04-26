// to create API without creating model
const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb://localhost:27017";

// MongoDB client
const client = new MongoClient(uri);

// to serve static files at /uploads route from uploads folder when req from frontend at /uploads
app.use("/uploads", express.static("uploads"));

// use app.post('/upload', upload.single('image')) => to upload single field
// upload.fields([{ name: 'image' }, { name: 'name' }]) => to upload multiple field
// to get req.body from post pass file field at last and other field above the file field
router.post("/upload", upload.single("image"), (req, res) => {});
router.post("/upload", upload.fields([{ name: "image" }, { name: "name" }]), (req, res) => {
 const { image, name } = req.file;
 const { title } = req.body;
});

// Insert data into the new collection
async function insertData() {
 try {
  // Connect to MongoDB server
  await client.connect();
  console.log("Connected to MongoDB server");

  // Create the new collection
  const db = client.db("mydatabase");
  await db.createCollection("collectionName");

  // Insert data into the new collection
  const collection = db.collection("collectionName");
  await collection.insertOne({ name: "John Doe", age: 30 });
  console.log("Inserted data into new collection");

  // Close the MongoDB client
  await client.close();
  console.log("Disconnected from MongoDB server");
 } catch (err) {
  console.error(err);
 }
}

// Call the insertData() function to insert data into the new collection
insertData();

exports.addApp = asyncHandler(async (req, res, next) => {
 const addApp = Application({ title, table_prefix: table_prefix });
 addApp.save();
 privacyTable(`${addApp.table_prefix}_privacypolicy`);
 verionTable(`${addApp.table_prefix}_version_table`);

 mongoose.model(`${addApp.table_prefix}_privacypolicy`, privacySchema);
 mongoose.model(`${addApp.table_prefix}_version_table`, versionSchema);

 createCollection(res, DB, `${addApp.table_prefix}_privacypolicy`);
 createCollection(res, DB, `${addApp.table_prefix}_version_table`);

 return give_response(res, 200, true, "Application added!");
});
