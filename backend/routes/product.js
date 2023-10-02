const router = require('express').Router();
const Product = require('../model/product.model');
const path = require("path");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.route('/').get((req,res)=>{
    Product.find()
    .then(product => res.json(product))
    .catch(err=>res.status(400).json('error :'+err))
})

router.post("/add", upload.single("imgpath"), async (req, res) =>{
  const title = req.body.title;
  const price = req.body.price;
  const categories = req.body.categories;
  const description = req.body.description;
  const imgfile = req.file.filename;


  try {
      // Remove this response
      // await Images.create({ image: imageName });
      // res.json({ status: "ok" });

      const newproduct = new Product({
          title: title,
          price: price,
          description: description,
          imgPath: imgfile,
          categories:categories
      });

      newproduct.save()
          .then(() => res.json("Product added!"))
          .catch(err => res.status(400).json('error :' + err));
  } catch (error) {
      res.json({ status: error });
  }
})


router.route('/:id').delete((req,res)=>{
    Product.findByIdAndDelete(req.params.id)
    .then(()=>res.json("deleted"))
    .catch(err=>res.status(400).json('error :'+err))

})

router.route('/update/:id').post((req,res)=>{
    Product.findById(req.params.id)
    .then(product=>{
        const title = req.body.title;
        const price = req.body.price;
        const description = req.body.description;
        const imgpath = req.body.imgpath;  

        // product.save()
        // .then(()=>res.json("User updated"))
        // .catch(err=>res.status(400).json('error :'+err))
    })
    .catch(err=>res.status(400).json('error :'+err))
})

module.exports = router;
