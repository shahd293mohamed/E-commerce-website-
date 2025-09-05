const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db.config");
const path = require("path");
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/user", require("./routes/user.router"));
app.use("/web-sett", require("./routes/web-sett.router"));
app.use("/products", require("./routes/products.router"));
app.use("/cart", require("./routes/cart.routes"));
app.use("/order", require("./routes/order.router"));
app.use("/contactus", require("./routes/contactus.router"));
app.use("/testmoniols", require("./routes/testmoniols.router"));
app.use("/category", require("./routes/category.route"));
app.use("/favourite", require("./routes/favourite.routes"));





app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
});