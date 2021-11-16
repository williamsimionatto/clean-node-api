import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey/add-surver-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeBdAddSurvey } from '../../../usecases/survey/add-survey/db-add-survey-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeBdAddSurvey())
  return makeLogControllerDecorator(controller)
}
