import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repositoy'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorator/log-controller-decorator'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
