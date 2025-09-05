const Order = require("../models/order.model");

exports.getSalesReport = async (req, res) => {
  const { startDate, endDate } = req.query;
  const matchStage = {};

  if (startDate && endDate) {
    matchStage.createdAt = {};
    matchStage.createdAt.$gte = new Date(startDate);
    matchStage.createdAt.$lte = new Date(endDate);
  }

  try {
    const report = await Order.aggregate([
      { $match: matchStage },

      // Join user
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },

      // Unwind items array
      { $unwind: "$items" },

      // Join product from items.product
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },

      {
        $facet: {
          Total: [
            {
              $group: {
                _id: null,
                totalSaledAmount: {
                  $sum: { $multiply: ["$items.priceAtTimeOfOrder", "$items.quantity"] }
                },
                totalQuantitySold: { $sum: "$items.quantity" },
                numberofOrders: { $addToSet: "$_id" } // collect unique orders
              }
            },
            {
              $project: {
                totalSaledAmount: 1,
                totalQuantitySold: 1,
                numberofOrders: { $size: "$numberofOrders" }
              }
            }
          ],
          TopProducts: [
            {
              $group: {
                _id: "$product._id",
                name: { $first: "$product.title" },
                revenue: {
                  $sum: { $multiply: ["$items.priceAtTimeOfOrder", "$items.quantity"] }
                },
                quantitySold: { $sum: "$items.quantity" },
                imageURL: { $first: "$product.imgURL" }
              }
            },
            { $sort: { revenue: -1 } },
            { $limit: 5 }
          ],
          salesByUsers: [
            {
              $group: {
                _id: "$user._id",
                name: { $first: "$user.name" },
                totalSpent: {
                  $sum: { $multiply: ["$items.priceAtTimeOfOrder", "$items.quantity"] }
                },
                totalOrders: { $addToSet: "$_id" }, // collect unique orders
                totalUnits: { $sum: "$items.quantity" }
              }
            },
            {
              $project: {
                name: 1,
                totalSpent: 1,
                totalUnits: 1,
                totalOrders: { $size: "$totalOrders" }
              }
            },
            { $sort: { totalSpent: -1 } },
            { $limit: 5 }
          ],
          monthlySales: [
            {
              $group: {
                _id: {
                  year: { $year: "$createdAt" },
                  month: { $month: "$createdAt" }
                },
                totalRevenue: {
                  $sum: { $multiply: ["$items.priceAtTimeOfOrder", "$items.quantity"] }
                },
                totalQuantitySold: { $sum: "$items.quantity" }
              }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
          ]
        }
      }
    ]);

    res.status(200).json({ message: "Orders report", data: report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating report", error: err.message });
  }
};
