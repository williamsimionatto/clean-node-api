import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
