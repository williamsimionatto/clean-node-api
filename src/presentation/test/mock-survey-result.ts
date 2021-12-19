import { mockSurveyModel } from '@/domain/test'
import { LoadSurveyById, SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from '../controllers/survey-result/save-survey-result/save-survey-result-controller-protocols'
import { SurveyModel } from '@/domain/models/survey'

export const mockSurveyModelResult = (): SurveyResultModel => ({
  id: 'valid_id',
  surveyId: 'valid_survey_id',
  accountId: 'valid_account_id',
  answer: 'valid_answer',
  date: new Date()
})

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => resolve(mockSurveyModel()))
    }
  }

  return new LoadSurveyByIdStub()
}

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (survey: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(mockSurveyModelResult()))
    }
  }

  return new SaveSurveyResultStub()
}
