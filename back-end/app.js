const express = require("express");
const { MongoClient } = require("mongodb");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 4000;

// Connection URL and database name

const dbName = "sagar_db";

const uri = `mongodb://root:root@localhost:27017`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect();

const db = client.db(dbName);
const collection = db.collection("posts");

app.get("/posts", async (req, res) => {
  try {
    // Fetch posts from the collection
    const posts = await collection.aggregate([]).toArray();
    res.json(posts);
  } catch (error) {
    console.error("An error occurred while fetching posts:", error);
    res.status(500).send("An error occurred while fetching posts.");
  } finally {
    // client.close();
  }
});

app.get("/post/:id", async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const result = await collection
      .aggregate([{ $match: { id: postId } }])
      .toArray();
    res.json(result);
  } catch (error) {
    console.error("An error occurred while fetching posts:", error);
    res.status(500).send("An error occurred while fetching posts.");
  } finally {
    // client.close();
  }
});

app.delete("/post/:id", async (req, res) => {
  try {
    const postId = Number(req.params.id);

    // Delete the post with the specified ID
    const result = await collection.deleteOne({ id: postId });
    console.log(result);

    if (result.deletedCount === 1) {
      res.send({ok:true,msg:"Post has been deleted"}); // Post deleted successfully
    } else {
      res.send({ok:false,msg:"Post not found"}); // Post not found
    }
  } catch (error) {
    console.error("An error occurred while deleting the post:", error);
    res.send({ok:false,msg:"An error occurred while deleting the post"});
  } finally {
    // client.close();
  }
});

app.get("/", async (req, res) => {
  res.send("Server is running 5");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
