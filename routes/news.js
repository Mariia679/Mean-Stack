var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var news = require('../models/news.js');

/* GET ALL NEWS */
router.get('/', function (req, res, next) {
  news.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE NEWS BY ID */
router.get('/:id', function (req, res, next) {
  news.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE NEWS */
router.post('/', function (req, res, next) {
  news.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE NEWS */
router.put('/:id', function (req, res, next) {
  news.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE NEWS */
router.delete('/:id', function (req, res, next) {
  news.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
