import Rating from "../models/rating.js";
import Product from "../models/product.js";
import { calcAvgRating } from "../helpers/rating.js";

export const rateProduct = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const { productId } = req.params;
    const userId = req.user._id;

    if (!userId || !productId) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid user or product not found" });
    }
    if (!rating) {
      return res
        .status(400)
        .json({ success: false, message: "Rating is required" });
    }

    // Check if the user has already rated the product
    let existingRating = await Rating.findOne({
      user: userId,
      product: productId,
    });

    if (existingRating) {
      // User has already rated this product before, update the existing rating
      existingRating.rating = rating;
      existingRating.review = review;
      await existingRating.save();
      const p = await Product.findById(productId).populate("ratings");
      p.avgRating = await calcAvgRating(p);
      await p.save();
    } else {
      // User rating the product for the first time, create a new rating
      const newRating = new Rating({
        user: userId,
        product: productId,
        rating,
        review,
      });
      await newRating.save();

      // Update the product's ratings array with the new rating's ObjectId
      await Product.findByIdAndUpdate(productId, {
        $push: { ratings: newRating._id },
      });

      // Calculate the average rating for the product
      let product = await Product.findById(productId).populate("ratings");
      product.avgRating = await calcAvgRating(product);
      await product.save();
    }

    const ratedProduct = await Product.findById(productId);

    return res.status(201).json({
      success: true,
      message: "Product rated successfully",
      rating,
      avgRating: ratedProduct.avgRating,
      review,
    });
  } catch (err) {
    console.error("Error rating product:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to rate product",
      error: err.message,
    });
  }
};

export const getAllRatingsOfAProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const ratings = await Rating.find({ product: productId })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'product',
        select: 'avgRating',
      });

    const totalRatingCount = await Rating.countDocuments({ product: productId });

    const totalPages = Math.ceil(totalRatingCount / limit);

    return res.status(200).json({
      success: true,
      limit,
      totalPages,
      ratingCount: totalRatingCount,
      ratings,
    });
  } catch (error) {
    console.error("Error fetching ratings:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch ratings", error: error.message });
  }
};



export const getRatingById = async (req, res) => {
  try {
    const { ratingId } = req.params;
    
    const rating = await Rating.findById(ratingId).populate('user', 'username'); // Example: Populate user details
    
    if (!rating) {
      return res.status(404).json({ success: false, message: "Rating not found" });
    }

    return res.status(200).json({ success: true, rating });
  } catch (error) {
    console.error("Error fetching rating:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch rating", error: error.message });
  }
};



export const deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    
    const deletedRating = await Rating.findByIdAndDelete(ratingId);
    
    if (!deletedRating) {
      return res.status(404).json({ success: false, message: "Rating not found" });
    }

    return res.status(200).json({ success: true, message: `Rating ${ratingId} deleted successfully` });
  } catch (error) {
    console.error("Error deleting rating:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete rating", error: error.message });
  }
};