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

module.exports = router;