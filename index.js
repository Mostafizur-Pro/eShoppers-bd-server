const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5xecsyp.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://eShoppers:0ZdaIElG5WvAo3qZ@cluster0.5xecsyp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const productsCategories = client.db("eShoppers").collection("Category");
    const userCollection = client.db("eShoppers").collection("userCollection");
    const productCategory = client
      .db("eShoppers")
      .collection("productCategory");

    // Product Categories name list
    app.get("/categories", async (req, res) => {
      const query = {};
      const categories = await productsCategories.find(query).toArray();
      // const services = await cursor.toArray();
      res.send(categories);
    });

    //    User --------------------------------------------
    //    User --------------------------------------------
    //    User --------------------------------------------
    app.get("/users", async (req, res) => {
      const query = {};
      const users = await userCollection.find(query).toArray();
      res.send(users);
    });
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await userCollection.findOne(query);
      res.send(user);
    });
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await userCollection.findOne(query);
      res.send({ isAdmin: user?.userType === "admin" });
    });

    // Product --------------------------------------------
    // Product --------------------------------------------
    // Product --------------------------------------------
    app.get("/products", async (req, res) => {
      const category = req.query.category;
      const query = { category: category };
      const services = await productCategory.find(query).toArray();
      // const services = await cursor.toArray();
      res.send(services);
    });
    app.post("/addProduct", async (req, res) => {
      const user = req.body;
      const result = await productCategory.insertOne(user);
      res.send(result);
    });
    app.get("/productAll", async (req, res) => {
      const query = {};
      const services = await productCategory.find(query).toArray();
      // const services = await cursor.toArray();
      res.send(services);
    });
    app.get("/productAll/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const services = await productCategory.find(query).toArray();
      // const services = await cursor.toArray();
      res.send(services);
    });
    app.delete("/productAll/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCategory.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("eShopper server is running");
});

app.listen(port, () => {
  console.log(`eShopper server running on ${port}`);
});
