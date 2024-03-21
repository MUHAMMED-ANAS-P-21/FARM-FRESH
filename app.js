const express = require('express')
const ejs = require('ejs')
const fs = require('fs')
const multer = require('multer')
const{ MongoClient, ObjectId } = require('mongodb')


const app = express();
const port = 3000;

// new
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
// new

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/adminp/images/products/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});


app.set('view engine','ejs');
app.use(express.static('public'));


const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');


app.use('/',userRoutes);
app.use('/admi',adminRoutes);


const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


app.get('/admcust', async (req, res) => {
  try {
      await client.connect();
      const db = client.db('FARM-FRESH');
      const collection = db.collection('user');

      const usr = await collection.find().toArray();
      res.render('./admin/admin-customer', { usr });
  } finally {
      await client.close();
  }
});

//  admin-product start ->
app.get('/admprod', async (req, res) => {
  try {
      await client.connect();
      const db = client.db('FARM-FRESH');
      const collection = db.collection('product');

      const prod = await collection.find().toArray();
      res.render('./admin/admin-product', { prod });
  } finally {
      await client.close();
  }
});

const upload = multer({ storage: storage });

app.post('/admprod',upload.single('pimage'), async (req, res) => {

    try {
        await client.connect();
        const db = client.db('FARM-FRESH');
        const collection = db.collection('product');

        const { pname, pcategory, pquantity, pprice, pdescription } = req.body;

         // Save the filename in the database
         const pimage = req.file.filename;

        const myobj = { pname, pcategory, pquantity, pprice, pdescription, pimage };
        await collection.insertOne(myobj);

        console.log("1 document inserted");
        res.redirect('/admprod'); // Redirect after successful insertion
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
});



app.post('/updatepro',upload.single('pimage'), async (req, res) => {
    try {
        // Connect to the MongoDB database
        const client = await MongoClient.connect('mongodb://localhost:27017/');
        const db = client.db('FARM-FRESH');
        const collection = db.collection('product');

        const { pname, pcategory, pquantity, pprice, pdescription } = req.body;

            // Save the filename in the database
            const pimage = req.file.filename;

        console.log(productId);
        // Update the product record with the specified productId
        const result = await collection.updateOne({ _id: new ObjectId(productId) }, { $set: {  pname, pcategory, pquantity, pprice, pdescription, pimage} });

        // Check if the product record was updated successfully
        if (result.modifiedCount === 1) {
            console.log(`product with ID ${productId} updated successfully.`);
            return res.redirect('/admprod');
        } else {
            console.log(`product with ID ${productId} not found.`);
        }

        // Redirect after successful updation
    } catch (e) {
        console.error(`Error: ${e}`);
        return "An error occurred while updating the product record.";
    }
});


app.post('/deletepro', async (req, res) => {
    try {
        // Get the productId from the form data
        const productId = req.body.productId;

        // Connect to the MongoDB database
        const client = await MongoClient.connect('mongodb://localhost:27017');
        
        const db = client.db('FARM-FRESH');
        const collection = db.collection('product');

        const product = await collection.findOne({ _id: new ObjectId(productId) });


        // Delete the product record with the specified productId
        const result = await collection.deleteOne({ _id: new ObjectId(productId) });

        if (result.deletedCount === 1) {
            console.log(`product with ID ${productId} deleted successfully.`);
            fs.unlinkSync('public/adminp/images/products/' + product.pimage);
            console.log('image deleted successfully');
        } else {
            console.log(`product with ID ${productId} not found.`);
        }

        // Redirect after successful deletion
        return res.redirect('/admprod');
    } catch (e) {
        console.error(`Error: ${e}`);
        return "An error occurred while deleting the product record.";
    }
});

// admin-product end ->



// route

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});