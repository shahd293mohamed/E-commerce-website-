const Category = require("../models/catagory.model");

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate("parent").populate("name");
        res.status(200).json({ message: "all categories", categories });
    } catch (error) {
        res.status(500).json({ message: "error in getting categories", error });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategoriesTree = async (req, res) => {
  try {
    const categories = await Category.find();
    const map = {};
    categories.forEach(cat => map[cat._id] = { ...cat.toObject(), children: [] });

    const tree = [];
    categories.forEach(cat => {
      if (cat.parent) {
        map[cat.parent]?.children.push(map[cat._id]);
      } else {
        tree.push(map[cat._id]);
      }
    });

    res.status(200).json({ success: true, data: tree });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// exports.createCategory = async (req, res) => {
//   try {
//     const { name, parent } = req.body;

//     const category = new Category({ name, parent : parent || null });

//     await category.save();
//     res.status(201).json({ success: true, data: category });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

exports.createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;

    let parentId = null;

    if (parent) {
      // check if parent was sent as a name
      const parentCategory = await Category.findOne({ name: parent });
      if (!parentCategory) {
        return res.status(404).json({ success: false, message: "Parent category not found" });
      }
      parentId = parentCategory._id;
    }

    const category = new Category({ name, parent: parentId });
    await category.save();

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id,{ isDeleted: true },
      { new: true }
    );

    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, message: "Category deleted", data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};