const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const CategoryScheme = require("../model/category-model")

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

    // Create new Category
    let categoryScheme = new CategoryScheme({
      categoryName: req.body.categoryName,
      avatar: result?.secure_url || null,
      cloudinary_id: result?.public_id || null,
      description: req.body.description
    });
    // Save Category
    await categoryScheme.save()
      .then(() => res.json(categoryScheme))
      .catch(err => res.status(400).json('Error: ' + err));
  } catch (err) {
    console.log(err);
  }
});

//View Categories
router.get("/viewCategories", async (req, res) => {
  try {
    await CategoryScheme.find()
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

//View Categories by ID
router.get("/viewCategories/:id", async (req, res) => {
  try {
    await CategoryScheme.findById(req.params.id)
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

//Update Category details
router.put("/update/:id", upload.single("file"), async (req, res) => {
  let fileName = req.body.fileName
  let folder = "Eco First"

  try {
    let Category = await CategoryScheme.findById(req.params.id);
    // Delete file from cloudinary

    // Upload file to cloudinary
    let result;
    if (req.file) {
      if (Category.cloudinary_id) {
        await cloudinary.uploader.destroy(Category.cloudinary_id);
      }
      result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
    }
    let data = {
      categoryName: req.body.categoryName || Category.categoryName,
      avatar: result?.secure_url || Category.avatar,
      cloudinary_id: result?.public_id || Category.cloudinary_id,
      description: req.body.description || Category.description,
    };
    Category = await CategoryScheme.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(Category);
  } catch (err) {
    console.log(err);
  }
});

//Delete Category
router.delete("/delete/:id", async (req, res) => {
  if (req.params.id) {
    //delete proposal data
    await CategoryScheme.findByIdAndDelete(req.params.id).then((data) => { res.status(200).send(data) })
      .catch((err) => { res.status(500).send(err) })
  }
});

module.exports = router;