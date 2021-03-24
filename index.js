const express = require('express');
const MongoClient = require('mongodb').MongoClient;


const uri = "mongodb+srv://organicUser:DXJU2u3UR5.JEvp@cluster0.k0zxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express();


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



app.get('/', (req, res) => {
    res.send ("aaa")
})

app.listen(3000);