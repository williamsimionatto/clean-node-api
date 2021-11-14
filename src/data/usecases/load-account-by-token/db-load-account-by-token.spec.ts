import { Decrypter } from '../../protocols/criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

interface SutTypes {
  sut: DbLoadAccountByToken
  decryptStub: Decrypter
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_value'))
    }
  }

  return new DecrypterStub()
}

const makeSut = (): SutTypes => {
  const decryptStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decryptStub)
  return {
    sut,
    decryptStub
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
    jest.spyOn(decryptStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
})
