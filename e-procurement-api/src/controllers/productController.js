class ProductController {
  constructor(Product) {
    this.Product = Product;
  }

  async createProduct(req, res) {
    try {
      const product = new this.Product(req.body);
      await product.save();
      res
        .status(201)
        .json({ message: "Product created successfully", product });
    } catch (error) {
      res.status(400).json({ message: "Error creating product", error });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving products", error });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await this.Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving product", error });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await this.Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res
        .status(200)
        .json({ message: "Product updated successfully", product });
    } catch (error) {
      res.status(400).json({ message: "Error updating product", error });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await this.Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting product", error });
    }
  }
}

export default ProductController;
