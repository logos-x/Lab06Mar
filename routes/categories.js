var express = require('express');
var router = express.Router();
let categoryModel = require('../schema/category')

/* GET users listing. */

function buildQuery(obj) {
    // console.log(obj);
    let result = {isDelete: false};
    if (obj.name) {
        result.name = new RegExp(obj.name, "i");
    }

    return result;
}
router.get('/', async function(req, res, next) {
      let categories = await categoryModel.find(buildQuery(req.query));
      res.status(200).send({
          success: true,
          data: categories
      });
});

router.get('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let category = await categoryModel.findById(id);

        if (category) {
            res.status(200).send({
                success: true,
                data: category
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Category is not exist"
            });
        }
    }
    catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });
    }
    
});

router.post('/', async function(req, res, next) {
    try {
        let newCategory = new categoryModel(req.body);

        await newCategory.save()

        res.status(200).send({
            success: true,
            data: newCategory
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });  
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let category = await categoryModel.findById(id);
        if (category) {
            for (const key of Object.keys(req.body)) {
                category[key] = req.body[key]
            }
            await category.save()
            res.status(200).send({
                success: true,
                data: category
            })
        } else {
            res.status(404).send({
                success: false,
                message: "Category is not exist"
            })
        }
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });
    }

});

router.delete('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let category = await categoryModel.findById(id);
        if (category) {
            category.isDelete = true
            await category.save()
            res.status(200).send({
                success: true,
                data: category
            })
        } else {
            res.status(404).send({
                success: false,
                message: "Category is not exist"
            })
        }
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
