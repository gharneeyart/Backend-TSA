
import Order from '../models/order.js'; // Assuming orderSchema is defined in a separate file
import moment from 'moment';

// export const createOrder = async (req, res) => {
//     try {
//         const { orderId, customerInfo, paymentInfo, productDetails, shippingDetails, orderStatus, additionalInfo } = req.body;

//         // Check if all required fields are present
//         if (!orderId || !customerInfo || !paymentInfo || !productDetails || !shippingDetails || !orderStatus || !additionalInfo) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         // Check if the order with the given orderId already exists
//         const existingOrder = await Order.findOne({ orderId });
//         if (existingOrder) {
//             return res.status(400).json({ success: false, message: "Order with the same orderId already exists" });
//         }

//         // Create a new order instance
//         const order = new Order({
//             orderId,
//             customerInfo,
//             paymentInfo,
//             productDetails,
//             shippingDetails,
//             orderStatus,
//             additionalInfo
//         });

//         // Save the order to the database
//         await order.save();

//         return res.json({ success: true, message: "Order created successfully", order });
//     } catch (err) {
//         console.error("Error creating order", err);
//         return res.status(500).json({ message: "Order creation failed", error: err.message });
//     }
// };

// Function to create a new order
export const createOrder = async (
    items,
    newTransaction,
    buyerId,
    totalAmount
  ) => {
    try {
      // Create new order
      const order = new Order({
        products: items,
        payment: newTransaction,
        buyer: buyerId,
        totalAmount: totalAmount,
      });
  
      // Save the order
      await order.save();
  
      // Populate the products field with details of each product
      await order.populate("products._id").execPopulate();
  
      console.log("Order created successfully");
      return order;
    } catch (err) {
      console.error("Error creating order:", err.message);
    }
  };
  
// Controller function to update order status by orderId
export const orderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        // add "new", set it to "true", to save the order status
        const order = await Order.findByIdAndUpdate(orderId, {status}, {new: true}); 

        if(!order) {
            return res.status(404).json({success: false, message: "Order not found"});
        }

        res.status(200).json({success: true, message: `Order status updated to "${status}"`, orderStatus: order.status});
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: err.message})
    }
};

// getAllOrders
// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find();
//         return res.status(200).json({success: true, message: "Orders fetched successfully", orders})
//     } catch (err) {
//         return res.status(500).json({success: false, message: err.message})
//     }
// };

// Controller function to get all orders with pagination
export const getAllOrders = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const orders = await Order.find().skip(skip).limit(limit);
      const totalOrders = await Order.countDocuments();
  
      res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        orderCount: totalOrders,
        orders,
      });
    } catch (err) {
      console.error("Error fetching all orders:", err.message);
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to fetch orders",
          error: err.message,
        });
    }
  };
  

// getOrderById
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const oneOrder = await Order.findById( orderId );
        if(!oneOrder){
            return res.status(404).json({success: false, message: "Order not found"});
        }
        return res.status(200).json({success:true, message: "Order retrieved successfully", oneOrder})
    } catch (err) {
        return res.status(500).json({success: false, message: err.message})
    }
};
// deleteOrder by orderId
export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await Order.findByIdAndDelete( orderId );
        if(!deletedOrder){
            return res.status(404).json({success: false, message: "Order not found"});
        }
        return res.status(200).json({success:true, message: `Order ID: ${orderId} deleted successfully`})
    } catch (err) {
        return res.status(500).json({success: false, message: err.message})
    }
};

// search order by date 
// export const getOrdersByDateRange = async (req, res) => {
//     try {
        // Extract start and end date from request query parameters
        // const { startDate, endDate } = req.query;

        // Parse dates (assuming they are in ISO 8601 format YYYY-MM-DD)
        // const start = new Date(startDate);
        // const end = new Date(endDate);

        // Perform the database query to find orders within the date range
        // const orders = await Order.find({
        //     date: { $gte: start, $lte: end }
        // });

        // Send the response with the found orders
    //     return res.status(200).json({ success: true, message: "Orders fetched successfully", orders });
    // } catch (err) {
        // Handle any errors that occur during the search
//         return res.status(500).json({ success: false, message: err.message });
//     }
// };

// Controller function to search orders by date or date range with pagination
// export const searchOrdersByDate = async (req, res) => {
//     const { startDate, endDate } = req.query;
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;
  
//     try {
//       let query = {};
  
      // Check if both startDate and endDate parameters are provided
    //   if (startDate && endDate) {
    //     query.createdAt = {
    //       $gte: new Date(startDate),
    //       $lte: new Date(endDate)
    //     };
    //   } else if (startDate) {
        // If only startDate is provided, search orders created on or after startDate
    //     query.createdAt = { $gte: new Date(startDate) };
    //   } else if (endDate) {
        // If only endDate is provided, search orders created on or before endDate
    //     query.createdAt = { $lte: new Date(endDate) };
    //   }
  
      // Search orders based on the constructed query
    //   const orders = await Order.find(query).skip(skip).limit(limit);
    //   const totalOrders = await Order.countDocuments(query);
  
    //   res.json({
    //     currentPage: page,
    //     ordersFound: totalOrders,
    //     totalPages: Math.ceil(totalOrders / limit),
    //     orders,
    //   });
    // } catch (error) {
    //   console.error('Error searching orders by date:', error);
    //   res.status(500).json({ success: false, message: 'Failed to search orders', errorMsg: error.message });
//     }
//   };



export const searchOrdersByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate && !endDate) {
      return res.status(400).json({ success: false, message: 'Start date or end date is required' });
    }

    let query = {};

    // Parse start date
    if (startDate) {
      const parsedStartDate = moment(startDate);
      console.log(parsedStartDate);

      if (!parsedStartDate.isValid()) {
        return res.status(400).json({ success: false, message: 'Invalid start date format' });
      }

      query.createdAt = { $gte: parsedStartDate.toDate() };
    }

    // Parse end date
    if (endDate) {
      const parsedEndDate = moment(endDate);
      console.log(parsedEndDate);

      if (!parsedEndDate.isValid()) {
        return res.status(400).json({ success: false, message: 'Invalid end date format' });
      }
  
      // If both start date and end date are provided, add $lte condition
      if (query.createdAt) {
        query.createdAt.$lte = parsedEndDate.toDate();
      } else {
        query.createdAt = { $lte: parsedEndDate.toDate() };
      }
    }

    const orders = await Order.find(query);

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error searching orders by date:', error.message);
    res.status(500).json({ success: false, message: 'Failed to search orders', errorMsg: error.message });
  }
};
