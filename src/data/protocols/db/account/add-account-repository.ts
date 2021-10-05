import { AccountModel, AddAccountModel } from '../../../usecases/addaccount/db-add-account-protocols'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
