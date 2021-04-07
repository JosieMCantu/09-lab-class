//CONTROLLER

const { Router } =require('express');
const Artwork = require('../models/Artwork');

module.exports = Router()

//POST one piece
.post('/', (req, res, next) => {
    Artwork
    .insert(req.body)
    .then(artwork => res.send(artwork))
    .catch(next);
})


// GET all route
.get('/', (req, res, next) => {
    Artwork
    .select()
    .then((artwork) => res.send(artwork))
    .catch(next);
})

//GET by id
.get('/:id', (req, res, next) => {
    Artwork
    .selectId(req.params.id)
    .then((artwork) => res.send(artwork))
    .catch(next);
})

//PUT update by id
.put('/:id', (req, res, next) => {
    Artwork
    .updateId(req.params.id, req.body)
    .then(artwork => res.send(artwork))
    .catch(next);
})

//DELETE by id
.delete('/:id', (req, res, next) => {
    Artwork
    .deleteId(req.params.id)
    .then(artwork => res.send(artwork))
    .catch(next);
})
