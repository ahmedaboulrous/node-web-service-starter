const { assert } = require('chai').assert;
const ItemModel = require('../../models/item');


describe('CRUD operations on items', () => {
  let myItem;

  beforeEach('add a new item to the database', (done) => {
    myItem = new ItemModel({
      title: 'item99',
      price: 99.99,
      quantity: 99,
    });

    myItem.save().then((returnedItem) => {
      assert(myItem.isNew === false);
      myItem = returnedItem;
      done();
    });
  });

  afterEach('remove the item from the database', (done) => {
    ItemModel.findByIdAndRemove(myItem._id).then((returnedItem) => {
      assert(returnedItem._id.toString() === myItem._id.toString());
      done();
    });
  });


  it('should find item by name', () => {
    assert(true);
  });
});
