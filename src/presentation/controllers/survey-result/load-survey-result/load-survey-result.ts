import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadSurveyById } from '../save-survey-result/save-survey-result-controller-protocols'
import { Controller, HttpRequest, HttpResponse, LoadSurveyResult } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params.surveyId
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const surveyResult = await this.loadSurveyResult.load(surveyId)
      return ok(surveyResult)
    } catch (error) {
      return await new Promise(resolve => resolve(serverError(error)))
    }
  }
}
