export interface User {
  id: string
  name: string
  email: string
  password: string
  image: string
}

export type UserLogin = Pick<User, 'email' | 'password'>
