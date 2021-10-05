import { Payment } from "../_models/payment/payment";

export interface PaymentResponse {
  payments: Payment[];
  totalPayments: number;
}
