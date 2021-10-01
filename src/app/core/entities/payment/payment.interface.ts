export interface Payment {
  id: number
  name: string
  username: string
  title: string
  date: string
  value: number
  image: string
  isPayed: boolean
}

export type CreatePayment = Omit<Payment, 'id' | 'image'>
