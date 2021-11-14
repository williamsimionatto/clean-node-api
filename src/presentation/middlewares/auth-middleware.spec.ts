import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'

describe('Auth Middleware', () => {
  test('Should return 403 if no x-acess-token exists in headers', async () => {
    const sut = new AuthMiddleware()
    const httpResponde = await sut.handle({})
    expect(httpResponde.statusCode).toBe(forbidden(new AccessDeniedError()))
  })
})
