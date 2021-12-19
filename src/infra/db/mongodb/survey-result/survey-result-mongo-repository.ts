import { SaveSurveyResultRepository } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyResultModel } from '@/domain/models/survey-result'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const res = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnOriginal: false
    })

    return res.value && MongoHelper.map(res.value)
  }
}
