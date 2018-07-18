const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title field is required'],
  },
  price: {
    type: Number,
    required: [true, 'price field is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity field is required'],
  },
});

module.exports = mongoose.model('Item', ItemSchema);

// const Item = mongoose.model('Item', ItemSchema);
// module.exports.getItemByID(id) { ... }
// module.exports.getItemByTitle(title) { ... }
// module.exports.getItemWithQuantityLessThan(amount) { ... }
// you should never expose direct access to the DB model
