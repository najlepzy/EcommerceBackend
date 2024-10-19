import { CartProduct } from "@interfaces/cartInterfaces";

export class CartDTO {
  id: string;
  products: CartProduct[];

  constructor(cart: any) {
    this.id = cart._id;
    this.products = cart.products.map((product: any) => ({
      product: product.product,
      quantity: product.quantity,
    }));
  }
}
