module.exports = (dal) => {
    let express = require('express');
    let router = express.Router();


    router.get('/', (req, res) => {
        dal.getCategories().then(categories => res.json(categories));
    });

    router.get('/:id', (req, res) => {
        let id = req.params.id;
        dal.getCategory(id).then(category => res.json(category));
    });


    /**** Post new Category ****/
    router.post('/', (req, res) => {
        let newCategory = {
            categoryName : req.body.categoryName,
            books : []
        };
        dal.createCategory(newCategory).then(newCategory => res.json(newCategory));
    });

    /**** Delete Category ****/
    router.delete('/category/:id', (req, res) => {
        let id = req.params.id;
        dal.deleteCategory(id).then(e => res.json(e));
    });

    return router;
};