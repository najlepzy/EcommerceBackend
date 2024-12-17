import { ProductDAO } from "@dao/productDao";

export class Helper {
  static async updateProductStock(products: any[], productDAO: ProductDAO) {
    const updatedProducts = [];
    const failedProducts: string[] = [];
    let totalAmount = 0;

    for (const item of products) {
      let productId: string | null = null;

      if (item?.product?._id) {
        productId = item.product._id.toString();
      } else if (typeof item.product === "string") {
        productId = item.product;
      }

      if (!productId) {
        failedProducts.push("Producto sin ID");
        continue;
      }

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
