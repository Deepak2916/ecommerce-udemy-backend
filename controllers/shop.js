const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.json(products)
      // render('shop/product-list', {
      //   prods: products,
      //   pageTitle: 'All Products',
      //   path: '/products'
      // });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId } })
    .then(products => {
      res.render('shop/product-detail', {
        product: products[0],
        pageTitle: products[0].title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.json(products)
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  Cart.findAll().then(
    resp=>{
      res.json(resp)
    }
  )
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById({where:{id:prodId}}).then(product => {
    Product.create({
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.description
    })
      .then(result => {
      console.log(result)
      })
      .catch(err => {
        console.log(err);
      });
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  // const prodId = req.body.productId;
  // Product.findById(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
