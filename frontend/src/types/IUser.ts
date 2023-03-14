import { IAddress } from "./IAddress"

export interface IUser {
  address: string
  email: string
  id: number
  name: IName
  phone: string
  username: string
  cpf_cnpj: number
  date_birth: string
}

export interface IName {
  firstname: string
  lastname: string
}