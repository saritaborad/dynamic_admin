const express = require("express");
const path = require("path");

const app = express();
const port = 8000; // Replace with the desired port number

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, "build")));

// Handle all requests by serving the 'index.html' file
app.get("*", (req, res) => {
 res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
