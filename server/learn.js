// to create API without creating model
const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb://localhost:27017";

// MongoDB client
const client = new MongoClient(uri);

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
