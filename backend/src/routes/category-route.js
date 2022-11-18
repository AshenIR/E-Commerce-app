const express = require('express');
const router = express.Router();
const CategoryScheme = require("../model/category-model")

router.post("/create", async (req, res) => {
  
    // Create new Category
    let categoryScheme = new CategoryScheme({
      categoryName: req.body.categoryName
    });
    // Save Category
    await categoryScheme.save()
      .then(() => res.json(categoryScheme))
      .catch(err => res.status(400).json('Error: ' + err));

});

//View Categories
router.get("/viewCatogaries", async (req, res) => {
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

module.exports = router;