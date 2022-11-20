const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const ProductScheme = require("../model/product-model")

router.post("/create", upload.single("file"), async (req, res) => {
    let fileName = req.body.fileName
    let folder = "Eco First"
    try {
        // Upload image to cloudinary
        let result
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
        }
        console.log(result)

        // Create new Product
        let productScheme = new ProductScheme({
            productName: req.body.productName,
            categoryID: req.body.categoryID,
            brand: req.body.brand,
            avatar: result?.secure_url || null,
            cloudinary_id: result?.public_id || null,
            price: req.body.price,
            description: req.body.description
        });
        // Save Product
        await productScheme.save()
            .then(() => res.json(productScheme))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (err) {
        console.log(err);
    }
});

//View all Products
router.get("/viewProducts", async (req, res) => {
    try {
        await ProductScheme.find()
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    } catch (err) {
        console.log(err);
    }

});

//View Product by ID
router.get("/viewProducts/:id", async (req, res) => {
    try {
        await ProductScheme.findById(req.params.id)
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    } catch (err) {
        console.log(err);
    }

});

//Update Product details
router.put("/update/:id", upload.single("file"), async (req, res) => {
    let fileName = req.body.fileName
    let folder = "Eco First"

    try {
        let Product = await ProductScheme.findById(req.params.id);
        // Delete file from cloudinary

        // Upload file to cloudinary
        let result;
        if (req.file) {
            if (Product.cloudinary_id) {
                await cloudinary.uploader.destroy(Product.cloudinary_id);
            }
            result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
        }
        let data = {
            productName: req.body.productName || Product.productName,
            categoryID: req.body.categoryID || Product.categoryID,
            brand: req.body.brand || Product.brand,
            price: req.body.price || Product.price,
            avatar: result?.secure_url || Product.avatar,
            cloudinary_id: result?.public_id || Product.cloudinary_id,
            description: req.body.description || Product.description,
        };
        Product = await ProductScheme.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(Product);
    } catch (err) {
        console.log(err);
    }
});

//Delete Product
router.delete("/delete/:id", async (req, res) => {
    if (req.params.id) {
        //delete proposal data
        await ProductScheme.findByIdAndDelete(req.params.id).then((data) => { res.status(200).send(data) })
            .catch((err) => { res.status(500).send(err) })
    }
});

//Search Product
router.get("/search/:id", async (req, res) => {

    await ProductScheme.find({ 'productName': { $regex: '.*' + req.params.id + '.*' } }).then((data) => { res.status(200).send(data) })
      .catch((err) => { res.status(500).send(err) })
  });
  
 //Filter Product 
  router.get("/filter", async (req, res) => {
    const filters = req.query;
    let products = await ProductScheme.find()
    if (products) {
      products = await products.filter(product => {
        let isValid = true;
        for (key in filters) {
          console.log(key, product[key], filters[key]);
          isValid = isValid && product[key] == filters[key];
        }
        return isValid;
      })
      res.send(products);
    }
  
  
  });

module.exports = router;