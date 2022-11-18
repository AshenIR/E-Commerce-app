require('dotenv').config()
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const ProductAPI = require("./src/routes/product-route")
const CategoryAPI = require("./src/routes/category-route")
const connectDB = require("./src/database/database");


const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
// app.use(fileUpload({
//   useTempFiles: true
// }))
connectDB();

app.get("/", (req, res) => {
  res.send("Hello Node!");
});

app.use("/products", ProductAPI)
app.use("/categories", CategoryAPI)



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});