const router = require('express').Router();
const Item = require('../models/item');


// retrieve all items
router.get('/', (req, res, next) => {
  Item.find({}).then((items) => {
    res.status(200).send(items);
  }).catch((dbError) => {
    const error = new Error(dbError.message);
    error.status = 422;
    next(error);
  });
});

// retrieve item by id
router.get('/:itemId', (req, res, next) => {
  Item.findById(req.params.itemId).then((items) => {
    res.status(200).send(items);
  }).catch((dbError) => {
    const error = new Error(dbError.message);
    error.status = 422;
    next(error);
  });
});


// create and add a new item
router.post('/', (req, res, next) => {
  Item.create(req.body).then((dbSavedItem) => {
    res.status(201).send(dbSavedItem);
  }).catch((dbError) => {
    const error = new Error(dbError.message);
    error.status = 422;
    next(error);
  });
});


// update existing item
router.put('/:itemId', (req, res, next) => {
  Item.findByIdAndUpdate(req.params.itemId, req.body).then((dbFoundItem) => {
    Item.findById(dbFoundItem._id).then((dbUpdatedItem) => {
      res.status(200).send(dbUpdatedItem);
    }).catch((dbError) => {
      const error = new Error(dbError.message);
      error.status = 422;
      next(error);
    });
  }).catch((dbError) => {
    const error = new Error(dbError.message);
    error.status = 422;
    next(error);
  });
});


// find and remove all items
router.delete('/', (req, res, next) => {
  Item.find({}).then((collectionItems) => {
    Item.remove({}).then(() => {
      res.status(200).send(collectionItems);
    }).catch((dbError) => {
      const error = new Error(dbError.message);
      error.status = 422;
      next(error);
    });
  });
});

// remove an item by id
router.delete('/:itemId', (req, res, next) => {
  Item.findByIdAndRemove(req.params.itemId).then((dbDeletedItem) => {
    res.status(200).send(dbDeletedItem);
  }).catch((dbError) => {
    const error = new Error(dbError.message);
    error.status = 422;
    next(error);
  });
});


module.exports = router;
