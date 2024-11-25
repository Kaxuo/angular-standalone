import { Customer } from './Customer';

export type Order =  {
  orderId: number;
  customerId: number;
  orderDate: Date;
  customer?: Customer; // Optional to avoid circular reference issues
}
