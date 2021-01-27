const mongoose = require ("mongoose");

const orderSchema = new mongoose.Schema({
    toppings: {
        type: String,
    },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = {
    Order,
};