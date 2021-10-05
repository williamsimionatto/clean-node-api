import { AccountModel } from '../../usecases/addaccount/db-add-account-protocols'

export interface LoadAccountByEmailRepository {
  load: (email: string) => Promise<AccountModel>
}
