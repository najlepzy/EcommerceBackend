import { ProductDAO } from "@dao/index";

export class Helper {
  static async updateProductStock(products: any[], productDAO: ProductDAO) {
    const updatedProducts = [];
    const failedProducts = [];
    let totalAmount = 0;

    for (const item of products) {
      const productId = item.product._id
        ? item.product._id.toString()
        : item.product.toString();
      const product = await productDAO.findById(productId);

      if (!product || product.stock < item.quantity) {
        failedProducts.push(productId);
      } else {
        product.stock -= item.quantity;
        totalAmount += product.price * item.quantity;
        await product.save();
        updatedProducts.push({
          product: { ...product.toObject() },
          quantity: item.quantity,
        });
      }
    }

    return { updatedProducts, failedProducts, totalAmount };
  }
}
