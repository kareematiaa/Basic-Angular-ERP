import { OrderDetail } from './OrderDetails';

export class Order {
  customerId!: number;
  discount!: number;
  orderTotal!: number;
  orderDetails!: OrderDetail[];
}
