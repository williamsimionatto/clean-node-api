import { AccountModel } from '../../../usecases/addaccount/db-add-account-protocols'

export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<AccountModel>
}
