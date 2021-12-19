import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { mockSurveyResultModel } from '@/data/test/mock-db-survey-result'
import { SurveyResultModel } from '../models/survey-result'
import { SaveSurveyResultParams } from '../usecases/survey-result/save-survey-result'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(mockSurveyResultModel()))
    }
  }

  return new SaveSurveyResultRepositoryStub()
}
