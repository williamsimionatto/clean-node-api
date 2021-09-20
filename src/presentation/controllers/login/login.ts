import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidtor: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidtor = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
      }

      if (!password) {
        return await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
      }

      const isValid = this.emailValidtor.isValid(email)
      if (!isValid) {
        return await new Promise(resolve => resolve(badRequest(new InvalidParamError('password'))))
      }

      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
