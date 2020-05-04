const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get((req, res, next) => {
        Dishes.find({})
        .then((dishes) => {
            res.statusCode = 200;
            res.setHeader = 'Content-Type', 'application/json';
            res.json(dishes);
        }, (err) => next(err))
        .catch((err) => next(err));
})
    .post((req, res, next) => {
        Dishes.create(req.body)
        .then((dish) => {
            console.log('Dishes Created');
            res.statusCode = 200;
            res.setHeader = 'Content-Type', 'application/json';
            res.json(dishe);
        }, (err) => next(err))
        .catch((err) => next(err));
})
    .put((req, res, next) => {
        res.end("Operation not supported");
})
    .delete((req, res, next) => {
        console.log('Deleting all dishes');
        Dishes.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader = 'Content-Type', 'application/json';
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err))
});

dishRouter.route('/:dishId')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
        .then((dishes) => {
            res.statusCode = 200;
            res.setHeader = 'Content-Type', 'application/json';
            res.json(dishes);
        }, (err) => next(err))
        .catch((err) => next(err));
})
    .post((req, res, next) => {
        res.end("POST operation not supported on dishId's: " + req.params.dishId);
})
    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, { $set: req.body }, { new: true })
        .then((dishes) => {
            res.statusCode = 200;
            res.setHeader = 'Content-Type', 'application/json';
            res.json(dishes);
        }, (err) => next(err))
        .catch((err) => next(err));
})
    .delete((req, res, next) => {
        console.log("Deleting all Dishes");
        Dishes.findByIdAndRemove(req.params.dishId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader = 'Content-Type', 'application/json';
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err))
})

module.exports = dishRouter;
