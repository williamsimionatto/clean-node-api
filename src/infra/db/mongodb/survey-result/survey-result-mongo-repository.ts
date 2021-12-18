import { SaveSurveyResultRepository } from '@/data/usecases/save-survey-result/db-save-survey-result-protocols'
import { SaveSurveyResultModel } from '@/domain/usecases/save-survey'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyResultModel } from '@/domain/models/survey-result'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
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
