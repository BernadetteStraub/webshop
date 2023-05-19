export interface ProductRequest {
  title: string;
  description: string;
  price: number;
  sizes: number[];
  images: string[];
  gender: string;
}

export interface ProductResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  sizes: number[];
  images: string[];
  gender: string;
}
