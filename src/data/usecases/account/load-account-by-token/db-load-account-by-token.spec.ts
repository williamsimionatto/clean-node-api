import { DbLoadAccountByToken } from './db-load-account-by-token'
import { Decrypter, LoadAccountByTokenRepository, AccountModel } from './db-load-account-by-token-protocols'
import { throwError, mockAccountModel } from '@/domain/test'
import { mockDecrypter } from '@/data/test'

type SutTypes = {
  sut: DbLoadAccountByToken
  decryptStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (accessToken: string, role?: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(mockAccountModel()))
    }
  }

  return new LoadAccountByTokenRepositoryStub()
}

const makeSut = (): SutTypes => {
  const decryptStub = mockDecrypter()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decryptStub, loadAccountByTokenRepositoryStub)
  return {
    sut,
    decryptStub,
    loadAccountByTokenRepositoryStub
  }
}

describe('DBLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decryptStub } = makeSut()
    const decrypterSpy = jest.spyOn(decryptStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decrypterSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', () => {
    const { sut, decryptStub } = makeSut()
    jest.spyOn(decryptStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null as any)))
    const account = sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should return null if LoadAccountByTokenRepository returns null', () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise(resolve => resolve(null as any)))
    const account = sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should return an account on success', () => {
    const { sut } = makeSut()
    const account = sut.load('any_token', 'any_role')
    expect(account).toEqual(mockAccountModel())
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decryptStub } = makeSut()
    jest.spyOn(decryptStub, 'decrypt').mockImplementationOnce(throwError)
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockImplementationOnce(throwError)
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
})
