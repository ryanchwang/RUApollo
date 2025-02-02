require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to get the collection name and course titles from each collection
async function getCourseTitlesFromCollections() {
  try {
    // Get all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    //console.log("Collections:", collections);
    collections.sort((a, b) => a.name.localeCompare(b.name));

    const result = [];

    // Iterate through each collection
    for (const collection of collections) {
      // Fetch only the course titles from each collection (modify field name if needed)
      const courseTitles = await mongoose
        .connection.db.collection(collection.name)
        .find({}, { projection: { courseTitle: 1 , _id: 1} }) // Only fetch courseTitle field
        .toArray();

      // If there are any course titles in this collection, add to result
      if (courseTitles.length > 0) {
        result.push({
          collectionName: collection.name,
          courses: courseTitles.map((course) => ({
            label: course.courseTitle,
            value: course._id,
          })), // Extract only courseTitle
        });
      }
    }

    return result; // Return the list of collection names with course titles
  } catch (err) {
    console.error("Error fetching course titles from collections:", err);
    return [];
  }
}



// Route to fetch collection names and course titles
app.get("/api/course-titles", async (req, res) => {
  const data = await getCourseTitlesFromCollections();
  res.json(data); // Return the collection names and course titles
});

app.get("/get-content/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const db = mongoose.connection.db;
  
      // Get all collections in the database
      const collections = await db.listCollections().toArray();
  
      for (const collection of collections) {
        const col = db.collection(collection.name);
        
        // Search for the document in the current collection
        const document = await col.findOne({ _id: new mongoose.Types.ObjectId(id) });
        //console.log(document);
  
        if (document) {
          return res.json(document); // Return the found document immediately
        }
      }
  
      return res.status(404).json({ error: "Document not found in any collection" });
    } catch (error) {
      console.error("Error searching database:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
