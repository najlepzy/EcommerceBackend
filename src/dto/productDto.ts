export interface ProductDTO {
  title: string;
  description: string;
  code: string;
  price: number;
  status?: boolean;
  stock: number;
  category: string;
  thumbnails?: string[];
}
