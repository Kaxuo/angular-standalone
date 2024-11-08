import {Order} from './Order';

export type Customer = {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  orders: Order[];
};
