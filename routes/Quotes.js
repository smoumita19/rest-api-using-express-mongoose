const express = require('express');
const router = express.Router();
const Quote = require('../models/Quotes');

//Get all routes
router.get('/', async (req, res) => {
    const allQuotes = await Quote.find();

    res.json(allQuotes);
});

//Get a specific quote
router.get('/get/:id', async (req, res) => {
    const q = await Quote.findById({ _id : req.params.id });

    res.json(q);
})

//Create new
router.post('/new', async (req, res) => {
    const newQuote = new Quote(req.body);

    const saveQuote = await newQuote.save();

    res.json(newQuote);
});

//Delete a quote
router.delete('/delete/:id', async(req, res) => {
    const deleteQuote = await Quote.findByIdAndDelete({ _id : req.params.id });

    res.json(deleteQuote);
})

//Update a quote
router.put('/update/:id', async(req, res) => {
    // const updateQuote = await Quote.findByIdAndUpdate({
    //     _id : req.params.id,
    //     content : req.params.content,
    //     author : req.params.author
    // });
    const updateQuote = await Quote.updateOne({_id : req.params.id}, {$set: req.body});

    res.json(updateQuote);
})


//Get a random quote
router.get('/random', async (req, res) => {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const q = await Quote.findOne().skip(random);

    res.json(q);
});


module.exports = router;