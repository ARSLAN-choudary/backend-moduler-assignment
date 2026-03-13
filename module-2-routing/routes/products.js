const express = require("express");
const router = express.Router();

let products = [
  { id: 1, name: "Laptop", category: "electronics", price: 1000 },
  { id: 2, name: "Phone", category: "electronics", price: 500 },
  { id: 3, name: "Shirt", category: "clothing", price: 20 },
];

// 1. GET ALL
router.get("/", (req, res) => {
  let results = [...products];
  const { category, sort } = req.query;

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  if (sort === "price") {
    results.sort((a, b) => a.price - b.price);
  }
  res.json(results);
});

// 2. FIXED WILDCARD FOR EXPRESS 5
router.get(/^\/search\/(.*)/, (req, res) => {
    const query = req.params[0];
    res.json({ 
        message: `Searching for: ${query}`, 
        path: query 
    });
});

// 3. GET SINGLE
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// 4. POST
router.post("/", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name || "New Product",
    category: req.body.category || "general",
    price: req.body.price || 0,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// 5. PUT
router.put("/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  products[index] = { id: parseInt(req.params.id), ...req.body };
  res.json(products[index]);
});

// 6. DELETE
router.delete("/:id", (req, res) => {
  products = products.filter((p) => p.id !== parseInt(req.params.id));
  res.status(204).send(); 
});

module.exports = router;