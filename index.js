const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5xecsyp.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        const productsCategories = client.db("eShoppers").collection("Category");
        const userCollection = client
        .db("eShoppers")
        .collection("userCollection");

        // Product Categories name list
        app.get("/categories", async (req, res) => {
            const query = {};
            const categories = await productsCategories.find(query).toArray();
            // const services = await cursor.toArray();
            res.send(categories);
          });

        //   Login User
        app.get("/users", async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
          });
          app.post("/users", async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
          });


    } finally {
      
    }
  }
  run().catch(console.log);


app.get('/', (req, res)=>{
    res.send('eShopper server is running')
})

app.listen(port, ()=>{
    console.log(`eShopper server running on ${port}`);
})