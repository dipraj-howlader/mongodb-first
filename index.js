const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


const uri = "mongodb+srv://organicUser:DXJU2u3UR5.JEvp@cluster0.k0zxj.mongodb.net/organicdb?retryWrites=true&w=majority";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const product = {
  item: "canvas",
  qty: 100,
  tags: ["cotton"],
  size: {
    h: 28,
    w: 35.5,
    uom: "cm"
  }
}

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(err => {
  const productCollection = client.db("organicdb").collection("products");

  app.get('/products', (req, res)=> {
    productCollection.find({})
    .toArray( (err, documents) => {
      res.send(documents)
    })
  })

app.get('/product/:id', (req, res )=> {
  productCollection.find({_id: ObjectId(req.params.id)})
  .toArray( (err, documents) => {
    res.send(documents[0]);
  } )
})


app.post("/add", (req, res)=> {

  const product = req.body;
  productCollection.insertOne(product)
  .then(result => {
    console.log('data added successfully');
    res.redirect('/');
  } )
})

app.patch('/update/:id', (req, res) => {
  console.log(req.body.price);
  productCollection.updateOne({_id: ObjectId(req.params.id)},
  {
    $set: {price : req.body.price, quantity : req.body.quantity}
  }
  )
  .then(result => {
    res.send(result.modifiedCount> 0)
  })
})



app.delete('/delete/:id', (req, res) => {
  productCollection.deleteOne({_id: ObjectId(req.params.id)})
  .then ( result => {
    res.send(result.deletedCount > 0);
  } )
})

});



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.listen(3000);