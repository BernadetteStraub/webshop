export interface OrderItemRequest {
  productId: number;
  quantity: number;
  size: number;
}

export interface OrderRequest {
  userId: number;
  items: OrderItemRequest[];
}

export interface OrderItemResponse {
  id: number;
  productId: number;
  quantity: number;
  size: number;
}

export interface OrderResponse {
  id: number;
  userId: number;
  items: OrderItemResponse[];
  createdAt: Date;
}
