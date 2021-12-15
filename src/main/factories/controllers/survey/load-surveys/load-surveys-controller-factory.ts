import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeBdLoadSurveys } from '@/main/factories/usecases/survey/load-surveys/db-load-surveys-factory'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeBdLoadSurveys())
  return makeLogControllerDecorator(controller)
}
