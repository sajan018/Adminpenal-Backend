const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Product = require('../schema/product');

const router = express.Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/'); // Upload files to 'images' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Create unique filenames
    }
});

const upload = multer({ storage: storage });

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create New Product
router.post('/', upload.single('productImageFile'), async (req, res) => {
    try {
        const data = {
            productType: req.body.productType,
            productModel: req.body.productModel,
            productImageUrl: req.file.filename, // Store filename of uploaded image
            productPrice: req.body.productPrice,
            productQuantity: req.body.productQuantity,
            productColor: req.body.productColor,
            features:req.body.features,
            condition:req.body.condition,
            fuelType:req.body.fuelType,
            productDescription: req.body.productDescription,
        };

        const productRes = await Product.create(data);
        res.status(201).json(productRes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete product
router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        // Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete the associated image file
        const imagePath = path.join(__dirname, '../images/', product.productImageUrl);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Failed to delete image file:", err);
            }
        });

        // Delete the product from the database
        await Product.findByIdAndDelete(productId);

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;
