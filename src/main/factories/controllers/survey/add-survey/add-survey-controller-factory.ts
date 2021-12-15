import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeBdAddSurvey } from '@/main/factories/usecases/survey/add-survey/db-add-survey-factory'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-surver-controller'
import { Controller } from '@/presentation/protocols'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeBdAddSurvey())
  return makeLogControllerDecorator(controller)
}
