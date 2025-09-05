const e = require("express");
const Product = require("../models/products.model");
const Category = require("../models/catagory.model");

// exports.getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json({ message: "All products", products });
//     } catch (error) {
//         res.status(500).json({ message: "error in getting products", error });
//     }
// };

exports.getAllProducts = async (req, res) => {
  try {
    const { sortBy = 'createdAt', order = 'desc' } = req.query;

    // Validate sort field
    const allowedFields = ['price', 'title', 'createdAt'];
    if (!allowedFields.includes(sortBy)) {
      return res.status(400).json({ message: `Invalid sort field: ${sortBy}` });
    }

    // Build sort object
    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    const products = await Product.find().sort(sortOptions);

    res.status(200).json({ message: "All products", products });
  } catch (error) {
    res.status(500).json({ message: "Error in getting products", error });
  }
};
exports.getProductByRoute = async (req, res) => {
    try {
        const product = await Product.findOne({ route: req.params.route });
        res.status(200).json({ message: "product", product});
    } catch (error) {
        res.status(500).json({ message: "error in getting product", error });
    }
};

exports.addProduct = async (req, res) => {
  try {
    const { title, description, price, stock, route, category } = req.body;
    
    const img= req.file ? req.file.path : ' '   

    // 1. Find the main category
    let mainCategory = await Category.findOne({ name: category.main, parent: null });
    if (!mainCategory) {
      return res.status(400).json({ error: `Main category '${category.main}' not found` });
    }

    // 2. Find the sub category
    let subCategory = await Category.findOne({ name: category.sub, parent: mainCategory._id });
    if (!subCategory) {
      return res.status(400).json({ error: `Sub category '${category.sub}' under '${category.main}' not found` });
    }
        const product = await Product.create({
            title,
            description,
            price,
            stock,
            img,
            route,
            category: subCategory._id
        });     
        res.status(201).json({ message: "product created", product });
    } catch (error) {
        res.status(500).json({ message: "error in creating product", error });
    }
};

exports.getRelatedProducts = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.status(200).json({ message: "related products", products });
    } catch (error) {
        res.status(500).json({ message: "error in getting related products", error });
    }
};

// exports.getproductByCategoryId = async (req, res)=>{
//     try{
//     products = await Product.find({category: req.params.id});
//     res.status(200).json({message:"products",products});
//     }catch(error){
//         res.status(500).json({message:"error in getting products",error});
//     }
// }

exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryName, subCategory } = req.query;

    const mainCategory = await Category.findOne({ name: categoryName, parent: null });
    if (!mainCategory) {
      return res.status(404).json({ message: "Main category not found" });
    }

    if (subCategory) {
      const subCat = await Category.findOne({ name: subCategory, parent: mainCategory._id });
      if (!subCat) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
      const products = await Product.find({ category: subCat._id });
      return res.status(200).json({message: "products", products});
    }
    const subCategories = await Category.find({ parent: mainCategory._id });
    const allCategoryIds = [mainCategory._id, ...subCategories.map(sc => sc._id)];

    const products = await Product.find({ category: { $in: allCategoryIds } });
    res.status(200).json({message: "products", products});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" , error: err.message});
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      title,
      description,
      price,
      stock,
      route,
      category
    } = req.body;

    const img = req.file ? req.file.path : '';

    // Optional: validate category structure
    let categoryId = category;
    if (typeof category === 'object' && category.main && category.sub) {
      const mainCat = await Category.findOne({ name: category.main, parent: null });
      if (!mainCat) return res.status(400).json({ error: "Main category not found" });

      const subCat = await Category.findOne({ name: category.sub, parent: mainCat._id });
      if (!subCat) return res.status(400).json({ error: "Sub category not found" });

      categoryId = subCat._id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title,
        description,
        price,
        img,
        stock,
        route,
        category: categoryId
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};







