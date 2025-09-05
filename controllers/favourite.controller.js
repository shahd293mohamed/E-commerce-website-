const FavouriteSchema = require("../models/favourite");

exports.addtoFavourite = async (req, res) => {
    try {
        const { user, items } = req.body;
        const favourite = await FavouriteSchema.create({ user, items });
        res.status(201).json({ message: "Favourite created", favourite });
    } catch (error) {
        res.status(500).json({ message: "Error creating favourite", error: error.message });
    }
};

exports.getFavouriteByUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const favourite = await FavouriteSchema.findOne({ user: userId }).populate("items.product");
        if (!favourite) return res.status(404).json({ message: "Favourite not found" });
        res.status(200).json(favourite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFromFavourite = async (req, res) => {
  try {
    const userId = req.user.id; // or req.params.userId if you're passing it in URL
    const productId = req.params.productId;

    const favourite = await FavouriteSchema.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true }
    ).populate("items.product");

    if (!favourite) return res.status(404).json({ message: "Favourite not found" });

    res.status(200).json({ message: "Product removed from favourites", favourite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




