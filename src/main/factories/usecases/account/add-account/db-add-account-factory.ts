import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { AddAccount } from '@/domain/usecases/account/add-account'

export const makeBdAddAccount = (): AddAccount => {
  const bcryptAdapter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
