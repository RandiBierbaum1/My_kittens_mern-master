module.exports = (dal) => {
    let express = require('express');
    let router = express.Router();

    router.get('/book/:id', (req, res) => {
        let id = req.params.id;
        let bookId = req.params.bookId;
        dal.getBook(id, bookId).then(book => res.json(book));
    });

    router.post('/:id/books', (req, res) => {
        dal.addBook(
            req.params.id,
            req.body.title,
            req.body.author,
            req.body.price,
            req.body.nameOfSeller,
            req.body.emailOfSeller
        )
            .then(updatedCategory => res.json(updatedCategory));
    });

    return router;
};