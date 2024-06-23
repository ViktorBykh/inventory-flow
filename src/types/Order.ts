import { Product } from "./Product";

export type Order = {
  _id: string;
  orderNumber: string;
  customerName: string;
  orderDate: Date;
  totalCost: number;
  products: Product[];
};
