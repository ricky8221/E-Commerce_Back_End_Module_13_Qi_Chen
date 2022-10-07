const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try{
    const productsData = await Product.findAll({
      include: [{ model: Category}],
    });
    res.status(200).json(productsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try{
    const productsData = await Product.findByPk(req.params.id, {
      include: [{ model: Category}],
    })
    if (!productsData){
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    
    res.status(200).json(productsData);
  }catch (err){
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  const productData = await Product.create(
    {
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id:req.body.category_id,
    },{
      where:{
       id: req.body.id,
      }
    }
  )
  return res.json(productData);
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  const productData = await Product.update(
    {
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.price,
      category_id: req.body.category_id
    },{
      where:{
        id: req.params.id,
      },
    }
  )
    return res.json(productData);
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
